import { useEffect, useMemo, useRef, useState } from "react";
import type {
  Highlight,
  Language,
  Passage,
  Purpose,
  ReadingMode,
  SessionRecord,
  Settings,
  VocabItem,
  ModeProgress
} from "../types";
import { copy, modeOrder, purposeOrder } from "../lib/i18n";
import { Badge, Button, Card, TextArea } from "../components/ui";
import {
  applyNormalProgress,
  comprehensionPassed,
  firstSentences,
  splitParagraphs,
  uid,
  wpmFrom
} from "../lib/metrics";
import { pickMissedParagraphs } from "../lib/questions";
import { lookupWord } from "../lib/fetchers";

export interface LiveSession {
  passage: Passage;
  mode: ReadingMode | null;
  purpose: Purpose | null;
  step: "mode" | "purpose" | "preview" | "reading" | "recall" | "gate" | "lexical" | "summary";
  previewQuestions: string;
  readingStarted: number | null;
  readingEnded: number | null;
  pacerOn: boolean;
  pacerPara: number;
  highlights: Highlight[];
  rereads: number;
  gistNotes: string[];
  freeRecall: string;
  recallChecks: boolean[];
  answers: number[];
  showMissed: boolean;
  lexical: Array<{ word: string; gloss: string; example: string; userSentence: string }>;
}

export function createLive(passage: Passage, pacerEnabled: boolean): LiveSession {
  return {
    passage,
    mode: passage.difficulty.suggestedMode === "study" ? "study" : null,
    purpose: null,
    step: "mode",
    previewQuestions: "",
    readingStarted: null,
    readingEnded: null,
    pacerOn: pacerEnabled,
    pacerPara: 0,
    highlights: [],
    rereads: 0,
    gistNotes: [],
    freeRecall: "",
    recallChecks: passage.modelRecall.map(() => false),
    answers: passage.questions.map(() => -1),
    showMissed: false,
    lexical: []
  };
}

export function SessionView({
  live,
  language,
  settings,
  progress,
  onChange,
  onFinish
}: {
  live: LiveSession;
  language: Language;
  settings: Settings;
  progress: Record<ReadingMode, ModeProgress>;
  onChange: (next: LiveSession | ((prev: LiveSession) => LiveSession)) => void;
  onFinish: (record: SessionRecord, vocab: VocabItem[], nextProgress: Record<ReadingMode, ModeProgress>) => void;
}) {
  const c = copy(language);
  const p = live.passage;

  if (live.step === "mode") {
    return (
      <div className="max-w-measure space-y-4">
        <h1 className="font-read text-3xl font-semibold">{c.session.pickMode}</h1>
        <p className="text-sm text-paper-fade">{p.title}</p>
        {p.difficulty.label === "demanding" && <p className="text-sm text-clay">{c.library.hardHint}</p>}
        <div className="space-y-3">
          {modeOrder.map((mode) => (
            <button
              key={mode}
              onClick={() => onChange({ ...live, mode, step: "purpose" })}
              className="w-full rounded-xl border border-paper-line bg-white/70 p-4 text-left hover:border-moss dark:border-night-line dark:bg-night-raised"
            >
              <p className="font-semibold">{c.modes[mode].label}</p>
              <p className="mt-1 text-sm text-paper-fade">{c.modes[mode].criterion}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (live.step === "purpose") {
    return (
      <div className="max-w-measure space-y-4">
        <h1 className="font-read text-3xl font-semibold">{c.session.pickPurpose}</h1>
        {purposeOrder.map((purpose) => (
          <button
            key={purpose}
            onClick={() => onChange({ ...live, purpose, step: "preview" })}
            className="w-full rounded-xl border border-paper-line bg-white/70 p-4 text-left hover:border-moss dark:border-night-line dark:bg-night-raised"
          >
            <p className="font-semibold">{c.purposes[purpose].label}</p>
            <p className="mt-1 text-sm text-paper-fade">{c.purposes[purpose].detail}</p>
          </button>
        ))}
      </div>
    );
  }

  if (live.step === "preview") {
    return (
      <PreviewStep live={live} language={language} settings={settings} onChange={onChange} />
    );
  }

  if (live.step === "reading") {
    return <ReadingStep live={live} language={language} settings={settings} onChange={onChange} />;
  }

  if (live.step === "recall") {
    return <RecallStep live={live} language={language} onChange={onChange} />;
  }

  if (live.step === "gate") {
    return <GateStep live={live} language={language} onChange={onChange} />;
  }

  if (live.step === "lexical") {
    return <LexicalStep live={live} language={language} onChange={onChange} />;
  }

  return (
    <SummaryStep
      live={live}
      language={language}
      progress={progress}
      onFinish={onFinish}
    />
  );
}

function PreviewStep({
  live,
  language,
  settings,
  onChange
}: {
  live: LiveSession;
  language: Language;
  settings: Settings;
  onChange: (n: LiveSession | ((prev: LiveSession) => LiveSession)) => void;
}) {
  const c = copy(language);
  const [left, setLeft] = useState(settings.previewTimer ? 75 : 0);
  const [running, setRunning] = useState(false);
  const firsts = useMemo(() => firstSentences(live.passage.text, 10), [live.passage.text]);

  useEffect(() => {
    if (!running || left <= 0) return;
    const id = window.setInterval(() => setLeft((n) => n - 1), 1000);
    return () => window.clearInterval(id);
  }, [running, left]);

  return (
    <div className="max-w-measure space-y-4">
      <div className="flex items-start justify-between gap-3">
        <h1 className="font-read text-3xl font-semibold">{c.session.preview}</h1>
        {running && <Badge tone="moss">{left}s</Badge>}
      </div>
      <p className="text-sm text-paper-fade">{c.session.previewHint}</p>
      {live.passage.abstract && (
        <Card>
          <p className="text-xs uppercase text-paper-fade">Abstract</p>
          <p className="mt-2 font-read">{live.passage.abstract}</p>
        </Card>
      )}
      {live.passage.headings.length > 0 && (
        <Card>
          <p className="text-xs uppercase text-paper-fade">Headings</p>
          <ul className="mt-2 list-disc pl-5 font-read">
            {live.passage.headings.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </Card>
      )}
      <Card>
        <p className="text-xs uppercase text-paper-fade">
          {language === "tr" ? "Paragraf ilk cümleleri" : "First sentences"}
        </p>
        <ol className="mt-2 list-decimal space-y-2 pl-5 font-read text-[17px] leading-relaxed">
          {firsts.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </Card>
      <TextArea
        rows={3}
        placeholder={c.session.yourQuestions}
        value={live.previewQuestions}
        onChange={(e) => onChange({ ...live, previewQuestions: e.target.value })}
      />
      <div className="flex flex-wrap gap-2">
        {settings.previewTimer && !running && left > 0 && (
          <Button variant="ghost" onClick={() => setRunning(true)}>
            {c.session.startTimer}
          </Button>
        )}
        <Button
          onClick={() =>
            onChange({ ...live, step: "reading", readingStarted: Date.now() })
          }
        >
          {c.session.beginRead}
        </Button>
      </div>
    </div>
  );
}

function ReadingStep({
  live,
  language,
  settings,
  onChange
}: {
  live: LiveSession;
  language: Language;
  settings: Settings;
  onChange: (n: LiveSession | ((prev: LiveSession) => LiveSession)) => void;
}) {
  const c = copy(language);
  const paras = useMemo(() => splitParagraphs(live.passage.text), [live.passage.text]);
  const [prompt, setPrompt] = useState<"none" | "wander" | "gist">("none");
  const [gist, setGist] = useState("");
  const [selectConfused, setSelectConfused] = useState(false);
  const liveRef = useRef(live);
  liveRef.current = live;

  const intervalMs =
    settings.promptFrequency === "rare" ? 90000 : settings.promptFrequency === "frequent" ? 28000 : 50000;

  useEffect(() => {
    const id = window.setInterval(() => {
      setPrompt((cur) => (cur === "none" ? "wander" : cur));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  useEffect(() => {
    if (!live.pacerOn || !live.readingStarted) return;
    const wpm = 220;
    const index = live.pacerPara;
    const words = paras[index]?.split(/\s+/).length ?? 20;
    const ms = Math.max(2500, (words / wpm) * 60000);
    const id = window.setTimeout(() => {
      const current = liveRef.current;
      onChange({
        ...current,
        pacerPara: Math.min(paras.length - 1, index + 1)
      });
    }, ms);
    return () => window.clearTimeout(id);
    // Advance only when the pacer itself moves — not on highlight/gist edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live.pacerOn, live.pacerPara, live.readingStarted, paras]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPrompt("none");
      if (e.key === "p" || e.key === "P") onChange({ ...live, pacerOn: !live.pacerOn });
      if (e.key === "h" || e.key === "H") highlightSelection(false);
      if (e.key === "c" || e.key === "C") highlightSelection(true);
      if (e.key === "e" || e.key === "E") endRead();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function highlightSelection(confused: boolean): void {
    const sel = window.getSelection();
    const text = sel?.toString().trim() ?? "";
    if (!text) {
      setSelectConfused(confused);
      return;
    }
    const para = paras.findIndex((p) => p.includes(text));
    onChange({
      ...live,
      highlights: [
        ...live.highlights,
        {
          paragraphIndex: para < 0 ? live.pacerPara : para,
          start: 0,
          end: text.length,
          text,
          confused
        }
      ]
    });
    sel?.removeAllRanges();
  }

  function endRead(): void {
    const next: LiveSession = { ...live, readingEnded: Date.now(), step: "recall" };
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="font-read text-2xl font-semibold">{c.session.reading}</h1>
          <p className="text-xs text-paper-fade">{c.keys}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={() => onChange({ ...live, pacerOn: !live.pacerOn })}>
            {live.pacerOn ? c.session.pacerOn : c.session.pacerOff}
          </Button>
          <Button variant="ghost" onClick={() => highlightSelection(true)}>
            {c.session.markConfused}
          </Button>
          <Button onClick={endRead}>{c.session.endReading}</Button>
        </div>
      </div>
      <article
        className="reader mx-auto max-w-measure font-read leading-[1.7]"
        style={{ fontSize: settings.fontSize }}
        onMouseUp={() => {
          if (selectConfused) highlightSelection(true);
        }}
      >
        {paras.map((para, i) => {
          const marks = live.highlights.filter((h) => h.paragraphIndex === i);
          return (
            <p
              key={i}
              className={live.pacerOn && live.pacerPara === i ? "pacer-line" : undefined}
              onDoubleClick={() => onChange({ ...live, rereads: live.rereads + 1, pacerPara: i })}
            >
              {renderPara(para, marks)}
            </p>
          );
        })}
      </article>
      {prompt === "wander" && (
        <div className="fixed inset-x-0 bottom-6 z-10 mx-auto max-w-measure px-4">
          <Card className="shadow-lg">
            <p className="font-semibold">{c.session.stillTracking}</p>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => setPrompt("none")}>{c.session.yes}</Button>
              <Button
                variant="ghost"
                onClick={() => {
                  onChange({
                    ...live,
                    highlights: [
                      ...live.highlights,
                      {
                        paragraphIndex: live.pacerPara,
                        start: 0,
                        end: 1,
                        text: paras[live.pacerPara] ?? "",
                        confused: true
                      }
                    ]
                  });
                  setPrompt("gist");
                }}
              >
                {c.session.lost}
              </Button>
            </div>
          </Card>
        </div>
      )}
      {prompt === "gist" && (
        <div className="fixed inset-x-0 bottom-6 z-10 mx-auto max-w-measure px-4">
          <Card className="shadow-lg">
            <p className="font-semibold">{c.session.sectionGist}</p>
            <TextArea className="mt-2" rows={2} value={gist} onChange={(e) => setGist(e.target.value)} />
            <Button
              className="mt-2"
              onClick={() => {
                onChange({ ...live, gistNotes: [...live.gistNotes, gist] });
                setGist("");
                setPrompt("none");
              }}
            >
              OK
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}

function renderPara(para: string, marks: Highlight[]) {
  if (marks.length === 0) return para;
  const confused = marks.filter((m) => m.confused && m.text && para.includes(m.text));
  if (confused.length === 0) return para;
  const mark = confused[0];
  const i = para.indexOf(mark.text);
  if (i < 0) return para;
  return (
    <>
      {para.slice(0, i)}
      <mark className="confused">{mark.text}</mark>
      {para.slice(i + mark.text.length)}
    </>
  );
}

function RecallStep({
  live,
  language,
  onChange
}: {
  live: LiveSession;
  language: Language;
  onChange: (n: LiveSession | ((prev: LiveSession) => LiveSession)) => void;
}) {
  const c = copy(language);
  const [show, setShow] = useState(false);
  return (
    <div className="max-w-measure space-y-4">
      <h1 className="font-read text-3xl font-semibold">{c.session.recallTitle}</h1>
      <p className="text-sm text-paper-fade">{c.session.recallHint}</p>
      <TextArea
        rows={8}
        value={live.freeRecall}
        onChange={(e) => onChange({ ...live, freeRecall: e.target.value })}
      />
      {!show ? (
        <Button disabled={live.freeRecall.trim().length < 12} onClick={() => setShow(true)}>
          {c.session.showModel}
        </Button>
      ) : (
        <Card className="space-y-2">
          {live.passage.modelRecall.map((point, i) => (
            <label key={point} className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={live.recallChecks[i] ?? false}
                onChange={(e) => {
                  const next = [...live.recallChecks];
                  next[i] = e.target.checked;
                  onChange({ ...live, recallChecks: next });
                }}
              />
              <span>{point}</span>
            </label>
          ))}
          <Button className="mt-3" onClick={() => onChange({ ...live, step: "gate" })}>
            {c.session.gateTitle}
          </Button>
        </Card>
      )}
    </div>
  );
}

function GateStep({
  live,
  language,
  onChange
}: {
  live: LiveSession;
  language: Language;
  onChange: (n: LiveSession | ((prev: LiveSession) => LiveSession)) => void;
}) {
  const c = copy(language);
  const qs = live.passage.questions;
  const answered = live.answers.every((a) => a >= 0);
  const correct = qs.filter((q, i) => live.answers[i] === q.correctIndex).length;
  const score = qs.length ? correct / qs.length : 0;
  const missed = pickMissedParagraphs(qs, live.answers);
  const paras = splitParagraphs(live.passage.text);

  return (
    <div className="max-w-measure space-y-4">
      <h1 className="font-read text-3xl font-semibold">{c.session.gateTitle}</h1>
      {qs.map((q, i) => (
        <Card key={q.id} className="space-y-2">
          <div className="flex gap-2">
            <Badge tone={q.kind === "inferential" ? "warn" : "neutral"}>{q.kind}</Badge>
          </div>
          <p className="font-medium">{q.prompt}</p>
          <div className="space-y-1">
            {q.options.map((opt, oi) => {
              const chosen = live.answers[i] === oi;
              const revealed = answered;
              const good = oi === q.correctIndex;
              return (
                <button
                  key={opt}
                  disabled={answered}
                  onClick={() => {
                    onChange((prev) => {
                      const next = [...prev.answers];
                      next[i] = oi;
                      return { ...prev, answers: next };
                    });
                  }}
                  className={`block w-full rounded-md border px-3 py-2 text-left text-sm ${
                    chosen ? "border-moss bg-moss/10" : "border-paper-line dark:border-night-line"
                  } ${revealed && good ? "bg-moss/15" : ""} ${revealed && chosen && !good ? "bg-clay/15" : ""}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {answered && <p className="text-xs text-paper-fade">{q.explanation}</p>}
        </Card>
      ))}
      {answered && (
        <Card className="space-y-3">
          <p className="font-read text-2xl">{Math.round(score * 100)}%</p>
          {score < 0.7 && <p className="text-sm text-clay">{c.session.failHint}</p>}
          {missed.length > 0 && (
            <Button variant="ghost" onClick={() => onChange({ ...live, showMissed: !live.showMissed })}>
              {c.session.rereadMiss}
            </Button>
          )}
          {live.showMissed &&
            missed.map((idx) => (
              <p key={idx} className="font-read text-[17px] leading-relaxed">
                {paras[idx]}
              </p>
            ))}
          <Button
            onClick={async () => {
              const words = collectLexical(live);
              const lexical = await Promise.all(
                words.slice(0, 4).map(async (word) => {
                  const looked = await lookupWord(word, live.passage.language);
                  return { word, gloss: looked.gloss, example: looked.example, userSentence: "" };
                })
              );
              onChange({ ...live, lexical, step: lexical.length ? "lexical" : "summary" });
            }}
          >
            {c.session.lexicalTitle}
          </Button>
        </Card>
      )}
    </div>
  );
}

function collectLexical(live: LiveSession): string[] {
  const fromMarks = live.highlights.filter((h) => h.confused).flatMap((h) =>
    h.text
      .split(/\s+/)
      .map((w) => w.replace(/[^\p{L}-]+/gu, ""))
      .filter((w) => w.length > 5)
  );
  const missedQs = live.passage.questions.filter((q, i) => live.answers[i] !== q.correctIndex);
  const fromQs = missedQs.flatMap((q) =>
    q.prompt
      .split(/\s+/)
      .map((w) => w.replace(/[^\p{L}-]+/gu, ""))
      .filter((w) => w.length > 6)
  );
  return [...new Set([...fromMarks, ...fromQs])].slice(0, 4);
}

function LexicalStep({
  live,
  language,
  onChange
}: {
  live: LiveSession;
  language: Language;
  onChange: (n: LiveSession | ((prev: LiveSession) => LiveSession)) => void;
}) {
  const c = copy(language);
  return (
    <div className="max-w-measure space-y-4">
      <h1 className="font-read text-3xl font-semibold">{c.session.lexicalTitle}</h1>
      <p className="text-sm text-paper-fade">{c.session.lexicalHint}</p>
      {live.lexical.map((item, i) => (
        <Card key={item.word} className="space-y-2">
          <p className="font-read text-2xl">{item.word}</p>
          <p className="text-sm">{item.gloss}</p>
          {item.example && <p className="text-xs italic text-paper-fade">{item.example}</p>}
          <TextArea
            rows={2}
            value={item.userSentence}
            onChange={(e) => {
              const lexical = live.lexical.map((row, idx) =>
                idx === i ? { ...row, userSentence: e.target.value } : row
              );
              onChange({ ...live, lexical });
            }}
            placeholder={language === "tr" ? "Yeni bir cümlede kullan" : "Use it in a new sentence"}
          />
        </Card>
      ))}
      <Button onClick={() => onChange({ ...live, step: "summary" })}>{c.session.summary}</Button>
    </div>
  );
}

function SummaryStep({
  live,
  language,
  progress,
  onFinish
}: {
  live: LiveSession;
  language: Language;
  progress: Record<ReadingMode, ModeProgress>;
  onFinish: (record: SessionRecord, vocab: VocabItem[], nextProgress: Record<ReadingMode, ModeProgress>) => void;
}) {
  const c = copy(language);
  const elapsed = Math.max(1, (live.readingEnded ?? Date.now()) - (live.readingStarted ?? Date.now()));
  const rawWords = live.passage.difficulty.words;
  const standardWords = live.passage.difficulty.standardWords;
  const wpmRaw = wpmFrom(rawWords, elapsed);
  const wpmStandard = wpmFrom(standardWords, elapsed);
  const correct = live.passage.questions.filter((q, i) => live.answers[i] === q.correctIndex).length;
  const comprehension = live.passage.questions.length ? correct / live.passage.questions.length : 0;
  const mode = live.mode ?? "normal";
  const tooShort = elapsed < 20_000;
  const gated =
    mode === "normal"
      ? comprehensionPassed(comprehension, progress.normal.baselineComp)
      : comprehension >= 0.5;
  const speedCredited = mode === "normal" && gated && !tooShort;
  const recallSelf =
    live.recallChecks.length === 0
      ? null
      : live.recallChecks.filter(Boolean).length / live.recallChecks.length;

  return (
    <div className="max-w-measure space-y-4">
      <h1 className="font-read text-3xl font-semibold">{c.session.summary}</h1>
      <Card className="space-y-2">
        <p className="font-semibold">{live.passage.title}</p>
        <p className="text-sm text-paper-fade">
          {c.modes[mode].label} · {live.purpose ? c.purposes[live.purpose].label : ""}
        </p>
        <p className="font-read text-3xl">
          {wpmStandard} <span className="text-base text-paper-fade">{c.dash.wpm}</span>
        </p>
        <p className="text-sm">
          {wpmRaw} {c.dash.raw} · {c.dash.comp} {Math.round(comprehension * 100)}%
        </p>
        {tooShort && (
          <p className="text-sm text-clay">
            {language === "tr"
              ? "Süre çok kısa: hız kredisi ve taban yok. Metni gerçek tempo ile oku."
              : "Too brief to credit a rate or set a baseline. Read the passage at your real pace."}
          </p>
        )}
        <Badge tone={speedCredited ? "good" : "warn"}>
          {speedCredited ? c.session.credited : c.session.noCredit}
        </Badge>
      </Card>
      <Button
        onClick={() => {
          const record: SessionRecord = {
            id: uid("s"),
            startedAt: live.readingStarted ?? Date.now(),
            endedAt: Date.now(),
            passageId: live.passage.id,
            passageTitle: live.passage.title,
            language: live.passage.language,
            mode,
            purpose: live.purpose ?? "gist",
            elapsedMs: elapsed,
            rawWords,
            standardWords,
            wpmRaw,
            wpmStandard,
            comprehension,
            gated,
            speedCredited,
            recallSelfScore: recallSelf,
            highlights: live.highlights.length,
            rereads: live.rereads,
            gistNotes: live.gistNotes,
            freeRecall: live.freeRecall
          };
          const nextProgress = { ...progress };
          if (!tooShort && mode === "study" && progress.study.baselineWpm === null) {
            nextProgress.study = applyNormalProgress(progress.study, wpmStandard, comprehension, true);
            nextProgress.normal = {
              ...progress.normal,
              baselineWpm: progress.normal.baselineWpm ?? wpmStandard,
              baselineComp: progress.normal.baselineComp ?? comprehension,
              targetWpm: progress.normal.targetWpm ?? Math.round(wpmStandard * 1.06)
            };
          }
          if (!tooShort && mode === "normal") {
            nextProgress.normal = applyNormalProgress(progress.normal, wpmStandard, comprehension, gated);
          }
          const vocab: VocabItem[] = live.lexical
            .filter((row) => row.word)
            .map((row) => ({
              id: uid("v"),
              word: row.word,
              language: live.passage.language,
              gloss: row.gloss,
              example: row.example,
              userSentence: row.userSentence,
              dueAt: Date.now() + 2 * 86400000,
              passageId: live.passage.id
            }));
          onFinish(record, vocab, nextProgress);
        }}
      >
        {c.session.save}
      </Button>
    </div>
  );
}
