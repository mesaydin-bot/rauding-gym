export type Language = "en" | "tr";
export type Theme = "light" | "dark";
export type Screen =
  | "onboarding"
  | "home"
  | "library"
  | "session"
  | "dashboard"
  | "history"
  | "settings"
  | "about"
  | "review";

export type ReadingMode = "study" | "normal" | "gist" | "scan";
export type Purpose = "gist" | "argument" | "details";
export type SessionStep =
  | "mode"
  | "purpose"
  | "preview"
  | "reading"
  | "recall"
  | "gate"
  | "lexical"
  | "summary";

export type PassageSource = "sample" | "paste" | "upload" | "gutenberg" | "wikipedia" | "curated";

export interface Question {
  id: string;
  kind: "literal" | "inferential";
  prompt: string;
  options: string[];
  correctIndex: number;
  paragraphIndex: number;
  explanation: string;
}

export interface Passage {
  id: string;
  title: string;
  language: Language;
  source: PassageSource;
  license: string;
  sourceUrl?: string;
  author?: string;
  genre: "essay" | "news" | "report" | "other";
  text: string;
  headings: string[];
  abstract?: string;
  questions: Question[];
  modelRecall: string[];
  difficulty: Difficulty;
  createdAt: number;
}

export interface Difficulty {
  label: "accessible" | "standard" | "demanding";
  flesch?: number;
  words: number;
  standardWords: number;
  avgSentenceWords: number;
  suggestedMode: ReadingMode;
}

export interface Highlight {
  paragraphIndex: number;
  start: number;
  end: number;
  text: string;
  confused: boolean;
}

export interface VocabItem {
  id: string;
  word: string;
  language: Language;
  gloss: string;
  example: string;
  userSentence: string;
  dueAt: number;
  passageId: string;
}

export interface ReviewProbe {
  id: string;
  passageId: string;
  passageTitle: string;
  language: Language;
  dueAt: number;
  kind: "gist" | "detail";
  prompt: string;
  expected: string;
  answeredAt?: number;
  selfScore?: number;
}

export interface ModeProgress {
  baselineWpm: number | null;
  baselineComp: number | null;
  targetWpm: number | null;
  consecutivePasses: number;
  consecutiveFails: number;
}

export interface SessionRecord {
  id: string;
  startedAt: number;
  endedAt: number;
  passageId: string;
  passageTitle: string;
  language: Language;
  mode: ReadingMode;
  purpose: Purpose;
  elapsedMs: number;
  rawWords: number;
  standardWords: number;
  wpmRaw: number;
  wpmStandard: number;
  comprehension: number;
  gated: boolean;
  speedCredited: boolean;
  recallSelfScore: number | null;
  highlights: number;
  rereads: number;
  gistNotes: string[];
  freeRecall: string;
}

export interface Settings {
  uiLanguage: Language;
  theme: Theme;
  pacerEnabled: boolean;
  promptFrequency: "rare" | "normal" | "frequent";
  fontSize: number;
  previewTimer: boolean;
}

export interface AppState {
  onboardingComplete: boolean;
  settings: Settings;
  customPassages: Passage[];
  sessions: SessionRecord[];
  reviews: ReviewProbe[];
  vocabulary: VocabItem[];
  progress: Record<ReadingMode, ModeProgress>;
  lastActiveDate: string | null;
  streakDays: number;
}

export const defaultProgress = (): ModeProgress => ({
  baselineWpm: null,
  baselineComp: null,
  targetWpm: null,
  consecutivePasses: 0,
  consecutiveFails: 0
});

export const defaultState = (): AppState => ({
  onboardingComplete: false,
  settings: {
    uiLanguage: "en",
    theme: "light",
    pacerEnabled: true,
    promptFrequency: "normal",
    fontSize: 20,
    previewTimer: true
  },
  customPassages: [],
  sessions: [],
  reviews: [],
  vocabulary: [],
  progress: {
    study: defaultProgress(),
    normal: defaultProgress(),
    gist: defaultProgress(),
    scan: defaultProgress()
  },
  lastActiveDate: null,
  streakDays: 0
});
