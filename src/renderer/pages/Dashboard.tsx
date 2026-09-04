import type { AppState, Language, ReadingMode, SessionRecord } from "../types";
import { copy, modeOrder } from "../lib/i18n";
import { Card } from "../components/ui";

export function Dashboard({ state, language }: { state: AppState; language: Language }) {
  const c = copy(language);
  const delayed = state.reviews.filter((r) => r.answeredAt && r.selfScore != null);
  const delayedAvg =
    delayed.length === 0 ? null : delayed.reduce((a, r) => a + (r.selfScore ?? 0), 0) / delayed.length;

  return (
    <div className="space-y-6">
      <header className="max-w-measure">
        <h1 className="font-read text-3xl font-semibold">{c.dash.title}</h1>
        <p className="mt-2 text-sm text-paper-fade dark:text-night-fade">{c.dash.noVanity}</p>
      </header>
      <p className="text-xs font-semibold uppercase tracking-wide text-paper-fade">{c.dash.byMode}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {modeOrder.map((mode) => (
          <ModeCard
            key={mode}
            mode={mode}
            language={language}
            sessions={state.sessions.filter((s) => s.mode === mode)}
            target={state.progress[mode].targetWpm}
            baseline={state.progress[mode].baselineWpm}
            baselineComp={state.progress[mode].baselineComp}
          />
        ))}
      </div>
      <Card>
        <p className="text-xs font-semibold uppercase tracking-wide text-paper-fade">{c.dash.delayed}</p>
        <p className="mt-2 font-read text-4xl">
          {delayedAvg === null ? "—" : `${Math.round(delayedAvg * 100)}%`}
        </p>
        <p className="mt-1 text-sm text-paper-fade">
          {delayed.length} {language === "tr" ? "puanlanmış sonda" : "scored probes"}
        </p>
      </Card>
    </div>
  );
}

function ModeCard({
  mode,
  language,
  sessions,
  target,
  baseline,
  baselineComp
}: {
  mode: ReadingMode;
  language: Language;
  sessions: SessionRecord[];
  target: number | null;
  baseline: number | null;
  baselineComp: number | null;
}) {
  const c = copy(language);
  const credited = sessions.filter(
    (s) => s.elapsedMs >= 20_000 && (mode !== "normal" || s.speedCredited)
  );
  const last = credited[credited.length - 1];
  const avgWpm =
    credited.length === 0
      ? null
      : Math.round(credited.reduce((a, s) => a + s.wpmStandard, 0) / credited.length);
  const avgComp =
    credited.length === 0
      ? null
      : credited.reduce((a, s) => a + s.comprehension, 0) / credited.length;

  return (
    <Card>
      <h2 className="font-semibold">{c.modes[mode].label}</h2>
      <p className="mt-1 text-xs leading-relaxed text-paper-fade dark:text-night-fade">
        {c.modes[mode].criterion}
      </p>
      {credited.length === 0 ? (
        <p className="mt-4 text-sm text-paper-fade">{c.dash.empty}</p>
      ) : (
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat label={c.dash.wpm} value={avgWpm ?? "—"} />
          <Stat label={c.dash.comp} value={avgComp === null ? "—" : `${Math.round(avgComp * 100)}%`} />
          <Stat label={c.dash.raw} value={last ? last.wpmRaw : "—"} />
          <Stat label={language === "tr" ? "oturum" : "sessions"} value={credited.length} />
          {mode === "normal" && (
            <>
              <Stat label={c.dash.baseline} value={baseline ?? "—"} />
              <Stat label={c.dash.target} value={target ?? "—"} />
              <Stat
                label={language === "tr" ? "taban anlama" : "baseline comp"}
                value={baselineComp === null ? "—" : `${Math.round(baselineComp * 100)}%`}
              />
            </>
          )}
        </dl>
      )}
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-xs text-paper-fade">{label}</dt>
      <dd className="font-read text-xl">{value}</dd>
    </div>
  );
}
