import type { Language, Passage } from "../types";
import { englishPassages } from "./passages-en";
import { turkishPassages } from "./passages-tr";

export const samplePassages: Passage[] = [...englishPassages, ...turkishPassages];

export function allPassages(custom: Passage[]): Passage[] {
  return [...samplePassages, ...custom];
}

export function passagesByLanguage(custom: Passage[], language?: Language): Passage[] {
  const all = allPassages(custom);
  return language ? all.filter((p) => p.language === language) : all;
}

export function findPassage(custom: Passage[], id: string): Passage | undefined {
  return allPassages(custom).find((p) => p.id === id);
}
