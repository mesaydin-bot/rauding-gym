import { useState } from "react";
import type { Language, Passage } from "../types";
import { copy } from "../lib/i18n";
import { Badge, Button, Card, Field, TextArea, TextInput } from "../components/ui";
import { passagesByLanguage } from "../data/passages";
import { loadGutenbergText, loadWikipediaArticle, searchGutenberg, type GutenbergHit } from "../lib/fetchers";
import { passageFromText } from "../lib/questions";

export function Library({
  language,
  custom,
  onSaveCustom,
  onStart
}: {
  language: Language;
  custom: Passage[];
  onSaveCustom: (p: Passage) => void;
  onStart: (p: Passage) => void;
}) {
  const c = copy(language);
  const samples = passagesByLanguage([], undefined);
  const [pasteTitle, setPasteTitle] = useState("");
  const [pasteBody, setPasteBody] = useState("");
  const [pasteLang, setPasteLang] = useState<Language>(language);
  const [gQuery, setGQuery] = useState("darwin origin");
  const [gHits, setGHits] = useState<GutenbergHit[]>([]);
  const [wikiTopic, setWikiTopic] = useState("");
  const [wikiLang, setWikiLang] = useState<Language>(language);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function doUpload(): Promise<void> {
    setError(null);
    if (window.gym?.openTextFile) {
      const file = await window.gym.openTextFile();
      if (!file) return;
      const p = passageFromText({
        title: file.name.replace(/\.(txt|md)$/i, ""),
        text: file.text,
        language: pasteLang,
        source: "upload",
        license: "User-supplied file (local only)"
      });
      onSaveCustom(p);
      return;
    }
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt,.md,text/plain,text/markdown";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const text = await file.text();
      const p = passageFromText({
        title: file.name.replace(/\.(txt|md)$/i, ""),
        text,
        language: pasteLang,
        source: "upload",
        license: "User-supplied file (local only)"
      });
      onSaveCustom(p);
    };
    input.click();
  }

  return (
    <div className="space-y-8">
      <h1 className="font-read text-3xl font-semibold">{c.library.title}</h1>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-paper-fade">{c.library.samples}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {samples.map((p) => (
            <PassageCard key={p.id} passage={p} language={language} onStart={onStart} />
          ))}
        </div>
      </section>

      {custom.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-paper-fade">{c.library.yours}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {custom.map((p) => (
              <PassageCard key={p.id} passage={p} language={language} onStart={onStart} />
            ))}
          </div>
        </section>
      )}

      <Card className="space-y-3">
        <h2 className="font-semibold">{c.library.paste}</h2>
        <Field label={language === "tr" ? "Başlık" : "Title"}>
          <TextInput value={pasteTitle} onChange={(e) => setPasteTitle(e.target.value)} />
        </Field>
        <Field label={language === "tr" ? "Metin" : "Text"}>
          <TextArea rows={8} value={pasteBody} onChange={(e) => setPasteBody(e.target.value)} />
        </Field>
        <div className="flex flex-wrap gap-2">
          <Button variant={pasteLang === "en" ? "primary" : "ghost"} onClick={() => setPasteLang("en")}>
            EN
          </Button>
          <Button variant={pasteLang === "tr" ? "primary" : "ghost"} onClick={() => setPasteLang("tr")}>
            TR
          </Button>
          <Button
            onClick={() => {
              if (pasteBody.trim().length < 40) {
                setError(language === "tr" ? "Biraz daha uzun bir metin yapıştır." : "Paste a longer passage.");
                return;
              }
              const p = passageFromText({
                title: pasteTitle.trim() || (language === "tr" ? "Yapıştırılan metin" : "Pasted text"),
                text: pasteBody,
                language: pasteLang,
                source: "paste",
                license: "User-supplied text (local only)"
              });
              onSaveCustom(p);
              setPasteBody("");
            }}
          >
            {c.library.paste}
          </Button>
          <Button variant="ghost" onClick={() => void doUpload()}>
            {c.library.upload}
          </Button>
        </div>
      </Card>

      <Card className="space-y-3">
        <h2 className="font-semibold">{c.library.fetch}</h2>
        <p className="text-sm text-paper-fade">{c.library.gutenberg}</p>
        <div className="flex flex-wrap gap-2">
          <TextInput
            className="max-w-sm"
            value={gQuery}
            onChange={(e) => setGQuery(e.target.value)}
            placeholder={c.library.topic}
          />
          <Button
            variant="ghost"
            disabled={busy !== null}
            onClick={() => {
              setBusy("g");
              setError(null);
              void searchGutenberg(gQuery)
                .then(setGHits)
                .catch((err: Error) => setError(err.message))
                .finally(() => setBusy(null));
            }}
          >
            {c.library.search}
          </Button>
        </div>
        <div className="space-y-2">
          {gHits.map((hit) => (
            <div key={hit.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-paper-line px-3 py-2 text-sm dark:border-night-line">
              <div>
                <p className="font-medium">{hit.title}</p>
                <p className="text-xs text-paper-fade">
                  {hit.authors} · {hit.license}
                </p>
              </div>
              <Button
                disabled={!hit.textUrl || busy !== null}
                onClick={() => {
                  setBusy(String(hit.id));
                  setError(null);
                  void loadGutenbergText(hit)
                    .then((p) => onSaveCustom(p))
                    .catch((err: Error) => setError(err.message))
                    .finally(() => setBusy(null));
                }}
              >
                {language === "tr" ? "Çek ve sakla" : "Fetch & keep"}
              </Button>
            </div>
          ))}
        </div>
        <p className="pt-2 text-sm text-paper-fade">{c.library.wiki}</p>
        <div className="flex flex-wrap gap-2">
          <TextInput
            className="max-w-sm"
            value={wikiTopic}
            onChange={(e) => setWikiTopic(e.target.value)}
            placeholder={c.library.topic}
          />
          <Button variant={wikiLang === "en" ? "primary" : "ghost"} onClick={() => setWikiLang("en")}>
            EN
          </Button>
          <Button variant={wikiLang === "tr" ? "primary" : "ghost"} onClick={() => setWikiLang("tr")}>
            TR
          </Button>
          <Button
            disabled={busy !== null || !wikiTopic.trim()}
            onClick={() => {
              setBusy("w");
              setError(null);
              void loadWikipediaArticle(wikiTopic.trim(), wikiLang)
                .then((p) => onSaveCustom(p))
                .catch((err: Error) => setError(err.message))
                .finally(() => setBusy(null));
            }}
          >
            {c.library.fetch}
          </Button>
        </div>
        {error && <p className="text-sm text-clay">{error}</p>}
      </Card>
    </div>
  );
}

function PassageCard({
  passage,
  language,
  onStart
}: {
  passage: Passage;
  language: Language;
  onStart: (p: Passage) => void;
}) {
  const c = copy(language);
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-semibold">{passage.title}</p>
          <p className="text-xs text-paper-fade">
            {passage.language.toUpperCase()} · {passage.genre} · {passage.difficulty.words} {c.library.words}
          </p>
        </div>
        <Badge tone={passage.difficulty.label === "demanding" ? "warn" : "moss"}>
          {passage.difficulty.label}
        </Badge>
      </div>
      {passage.abstract && <p className="text-sm text-paper-fade dark:text-night-fade">{passage.abstract}</p>}
      {passage.difficulty.label === "demanding" && (
        <p className="text-xs text-clay">{c.library.hardHint}</p>
      )}
      <p className="text-[11px] text-paper-fade">
        {c.library.license}: {passage.license}
      </p>
      <Button onClick={() => onStart(passage)}>{c.home.startSession}</Button>
    </Card>
  );
}
