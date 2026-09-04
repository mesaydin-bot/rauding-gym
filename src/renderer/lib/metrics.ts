import type { Difficulty, Language, ReadingMode } from "../types";

const STANDARD_CHARS = 6;

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

export function countStandardWords(text: string): number {
  const chars = text.replace(/\s+/g, " ").trim().length;
  return Math.max(1, Math.round(chars / STANDARD_CHARS));
}

export function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

export function extractHeadings(text: string): string[] {
  const md = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^#{1,3}\s+/.test(line))
    .map((line) => line.replace(/^#{1,3}\s+/, ""));
  if (md.length > 0) return md;

  const paras = splitParagraphs(text);
  const headings: string[] = [];
  for (const p of paras) {
    const first = p.split("\n")[0]?.trim() ?? "";
    if (first.length > 0 && first.length < 80 && !/[.!?]$/.test(first)) {
      headings.push(first);
    }
  }
  return headings;
}

export function firstSentences(text: string, limit = 8): string[] {
  return splitParagraphs(text)
    .map((p) => splitSentences(p)[0] ?? "")
    .filter(Boolean)
    .slice(0, limit);
}

export function fleschReadingEase(text: string): number {
  const words = countWords(text);
  const sentences = Math.max(1, splitSentences(text).length);
  const syllables = Math.max(1, estimateSyllables(text));
  const asl = words / sentences;
  const asw = syllables / words;
  return Math.round(206.835 - 1.015 * asl - 84.6 * asw);
}

function estimateSyllables(text: string): number {
  const words = text.toLowerCase().match(/[a-zà-ÿışğüçöâîû]+/gi) ?? [];
  let total = 0;
  for (const word of words) {
    const cleaned = word.replace(/e$/, "");
    const groups = cleaned.match(/[aeiouyâîûıöü]+/g);
    total += Math.max(1, groups?.length ?? 1);
  }
  return total;
}

export function estimateDifficulty(text: string, language: Language): Difficulty {
  const words = countWords(text);
  const standardWords = countStandardWords(text);
  const sentences = Math.max(1, splitSentences(text).length);
  const avgSentenceWords = words / sentences;
  const flesch = language === "en" ? fleschReadingEase(text) : undefined;

  let label: Difficulty["label"] = "standard";
  if (language === "en" && flesch !== undefined) {
    if (flesch >= 60) label = "accessible";
    else if (flesch < 45) label = "demanding";
  } else {
    if (avgSentenceWords <= 16) label = "accessible";
    else if (avgSentenceWords >= 24) label = "demanding";
  }

  const suggestedMode: ReadingMode = label === "demanding" ? "study" : "normal";
  return { label, flesch, words, standardWords, avgSentenceWords, suggestedMode };
}

export function wpmFrom(words: number, elapsedMs: number): number {
  const minutes = Math.max(elapsedMs / 60000, 1 / 60);
  return Math.round(words / minutes);
}

export function comprehensionPassed(
  score: number,
  baselineComp: number | null,
  chance = 0.25
): boolean {
  if (score >= 0.7 && score > chance + 0.2) return true;
  if (baselineComp !== null && score >= baselineComp * 0.8) return true;
  return false;
}

export function applyNormalProgress(
  current: {
    baselineWpm: number | null;
    baselineComp: number | null;
    targetWpm: number | null;
    consecutivePasses: number;
    consecutiveFails: number;
  },
  wpm: number,
  comp: number,
  gatedPass: boolean
): typeof current {
  const next = { ...current };
  if (next.baselineWpm === null) {
    next.baselineWpm = wpm;
    next.baselineComp = comp;
    next.targetWpm = Math.round(wpm * 1.06);
    next.consecutivePasses = gatedPass ? 1 : 0;
    next.consecutiveFails = gatedPass ? 0 : 1;
    return next;
  }

  if (gatedPass) {
    next.consecutivePasses += 1;
    next.consecutiveFails = 0;
    if (next.consecutivePasses >= 3 && next.targetWpm) {
      const ceiling = Math.round((next.baselineWpm ?? wpm) * 1.1);
      next.targetWpm = Math.min(ceiling, next.targetWpm + Math.round((next.baselineWpm ?? wpm) * 0.05));
      next.consecutivePasses = 0;
    }
  } else {
    next.consecutiveFails += 1;
    next.consecutivePasses = 0;
    if (next.consecutiveFails >= 2 && next.targetWpm && next.baselineWpm) {
      next.targetWpm = Math.max(next.baselineWpm, Math.round(next.targetWpm * 0.95));
      next.consecutiveFails = 0;
    }
  }
  return next;
}

export function localDateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

export function stripBoilerplate(raw: string): string {
  let text = raw.replace(/\r\n/g, "\n");
  const startMarkers = [
    /\*\*\*\s*START OF (THIS|THE) PROJECT GUTENBERG/i,
    /\*\*\*\s*START OF THE PROJECT GUTENBERG/i
  ];
  const endMarkers = [
    /\*\*\*\s*END OF (THIS|THE) PROJECT GUTENBERG/i,
    /\*\*\*\s*END OF THE PROJECT GUTENBERG/i
  ];
  for (const m of startMarkers) {
    const match = text.search(m);
    if (match >= 0) {
      const lineEnd = text.indexOf("\n", match);
      text = text.slice(lineEnd >= 0 ? lineEnd + 1 : match);
    }
  }
  for (const m of endMarkers) {
    const match = text.search(m);
    if (match >= 0) text = text.slice(0, match);
  }
  return text.replace(/\n{3,}/g, "\n\n").trim();
}
