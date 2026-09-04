import type { Language, Passage } from "../types";
import { searchCatalog } from "../data/gutenberg-catalog";
import { passageFromText } from "./questions";
import { stripBoilerplate } from "./metrics";

export interface GutenbergHit {
  id: number;
  title: string;
  authors: string;
  textUrl: string | null;
  license: string;
}

export interface WikiHit {
  title: string;
  extract: string;
  url: string;
  language: Language;
  license: string;
}

async function fetchJson(url: string): Promise<unknown> {
  if (window.gym?.fetchJson) return window.gym.fetchJson(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

async function fetchText(url: string): Promise<string> {
  if (window.gym?.fetchText) return window.gym.fetchText(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.text();
}

export async function searchGutenberg(query: string): Promise<GutenbergHit[]> {
  try {
    const url = `https://gutendex.com/books/?search=${encodeURIComponent(query)}&languages=en`;
    const data = (await fetchJson(url)) as {
      results?: Array<{
        id: number;
        title: string;
        authors?: Array<{ name: string }>;
        copyright?: boolean;
        formats?: Record<string, string>;
      }>;
    };
    const remote = (data.results ?? []).slice(0, 12).map((book) => {
      const formats = book.formats ?? {};
      const textUrl =
        formats["text/plain; charset=utf-8"] ??
        formats["text/plain"] ??
        formats["text/plain; charset=us-ascii"] ??
        `https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.txt`;
      return {
        id: book.id,
        title: book.title,
        authors: (book.authors ?? []).map((a) => a.name).join(", ") || "Unknown",
        textUrl,
        license: book.copyright === false ? "Public domain (Project Gutenberg)" : "Check Gutenberg license"
      };
    });
    if (remote.length > 0) return remote;
  } catch {
    // Gutendex is often Cloudflare-blocked; use the local public-domain catalog.
  }
  return searchCatalog(query);
}

export async function loadGutenbergText(hit: GutenbergHit): Promise<Passage> {
  const urls = [
    hit.textUrl,
    `https://www.gutenberg.org/cache/epub/${hit.id}/pg${hit.id}.txt`
  ].filter((u, i, arr): u is string => Boolean(u) && arr.indexOf(u) === i);
  if (urls.length === 0) throw new Error("No plain-text file for this title.");
  let raw = "";
  let lastError: Error | null = null;
  for (const url of urls) {
    try {
      raw = await fetchText(url);
      if (raw.trim().length > 200) break;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }
  if (raw.trim().length < 200) {
    throw lastError ?? new Error("Could not load a plain-text file for this title.");
  }
  const cleaned = stripBoilerplate(raw);
  const excerpt = excerptAround(cleaned, 900);
  return passageFromText({
    title: hit.title,
    text: excerpt,
    language: "en",
    source: "gutenberg",
    license: hit.license,
    sourceUrl: `https://www.gutenberg.org/ebooks/${hit.id}`,
    author: hit.authors,
    genre: "other"
  });
}

function excerptAround(text: string, targetWords: number): string {
  const paras = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const start = Math.min(3, Math.max(0, paras.length - 2));
  const picked: string[] = [];
  let words = 0;
  for (let i = start; i < paras.length; i++) {
    picked.push(paras[i]);
    words += paras[i].split(/\s+/).length;
    if (words >= targetWords) break;
  }
  if (words < 200) return paras.slice(0, 12).join("\n\n");
  return picked.join("\n\n");
}

export async function searchWikipedia(topic: string, language: Language): Promise<WikiHit | null> {
  const lang = language === "tr" ? "tr" : "en";
  const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;
  try {
    const data = (await fetchJson(url)) as {
      title?: string;
      extract?: string;
      content_urls?: { desktop?: { page?: string } };
      type?: string;
    };
    if (!data.extract || data.type === "disambiguation") return null;
    return {
      title: data.title ?? topic,
      extract: data.extract,
      url: data.content_urls?.desktop?.page ?? `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(topic)}`,
      language,
      license: "CC BY-SA 4.0 (Wikipedia)"
    };
  } catch {
    return null;
  }
}

export async function loadWikipediaArticle(topic: string, language: Language): Promise<Passage> {
  const lang = language === "tr" ? "tr" : "en";
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&exlimit=1&redirects=1&format=json&origin=*&titles=${encodeURIComponent(topic)}`;
  const data = (await fetchJson(url)) as {
    query?: { pages?: Record<string, { title?: string; extract?: string; missing?: string }> };
  };
  const page = Object.values(data.query?.pages ?? {})[0];
  if (!page?.extract || "missing" in page) {
    const summary = await searchWikipedia(topic, language);
    if (!summary) throw new Error(language === "tr" ? "Madde bulunamadı." : "Article not found.");
    return passageFromText({
      title: summary.title,
      text: summary.extract,
      language,
      source: "wikipedia",
      license: summary.license,
      sourceUrl: summary.url,
      genre: "other"
    });
  }
  const trimmed = page.extract.split("\n\n").slice(0, 10).join("\n\n");
  return passageFromText({
    title: page.title ?? topic,
    text: trimmed,
    language,
    source: "wikipedia",
    license: "CC BY-SA 4.0 (Wikipedia)",
    sourceUrl: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(page.title ?? topic)}`,
    genre: "other"
  });
}

export async function lookupWord(word: string, language: Language): Promise<{ gloss: string; example: string }> {
  const cleaned = word.replace(/[^\p{L}-]+/gu, "");
  if (!cleaned) return { gloss: "", example: "" };
  if (language === "en") {
    try {
      const data = (await fetchJson(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleaned)}`
      )) as Array<{
        meanings?: Array<{ definitions?: Array<{ definition?: string; example?: string }> }>;
      }>;
      const def = data[0]?.meanings?.[0]?.definitions?.[0];
      return {
        gloss: def?.definition ?? "No glossary entry. Write the meaning from context.",
        example: def?.example ?? ""
      };
    } catch {
      return { gloss: "Lookup unavailable. Define the word from the sentence you marked.", example: "" };
    }
  }
  try {
    const data = (await fetchJson(
      `https://${language}.wiktionary.org/api/rest_v1/page/summary/${encodeURIComponent(cleaned)}`
    )) as { extract?: string };
    return {
      gloss: data.extract ?? "Sözlük kaydı yok. Anlamı bağlamdan yaz.",
      example: ""
    };
  } catch {
    return { gloss: "Sözlük yanıt vermedi. Anlamı kendi cümlelerinle yaz.", example: "" };
  }
}
