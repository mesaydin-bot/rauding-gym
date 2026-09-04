import type { AppState, Language, Screen, SessionRecord } from "../types";
import { copy } from "../lib/i18n";
import { Badge, Button, Card } from "../components/ui";

export function Home({
  state,
  language,
  onNavigate,
  dueCount
}: {
  state: AppState;
  language: Language;
  onNavigate: (s: Screen) => void;
  dueCount: number;
}) {
  const c = copy(language);
  const recent = [...state.sessions].reverse().slice(0, 4);
  return (
    <div className="space-y-8">
      <header className="max-w-measure">
        <p className="font-read text-3xl font-semibold">{c.home.greeting}</p>
        <p className="mt-2 text-paper-fade dark:text-night-fade">{c.tagline}</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-paper-fade">{c.home.dueReviews}</p>
          <p className="mt-2 font-read text-4xl">{dueCount}</p>
          <Button className="mt-4" variant="ghost" onClick={() => onNavigate("review")}>
            {c.nav.review}
          </Button>
        </Card>
        <Card className="md:col-span-2">
          <p className="font-read text-lg">
            {language === "tr"
              ? "Modu seç, iskeleti gör, tam metni oku, savı dök, kapıdan geç."
              : "Pick a mode, preview the skeleton, read the full page, dump the argument, pass the gate."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => onNavigate("library")}>{c.home.startSession}</Button>
            <Button variant="ghost" onClick={() => onNavigate("about")}>
              {c.home.continueScience}
            </Button>
          </div>
        </Card>
      </div>
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-paper-fade">{c.home.recent}</h2>
        {recent.length === 0 ? (
          <p className="text-paper-fade">{c.home.empty}</p>
        ) : (
          <div className="space-y-2">
            {recent.map((s) => (
              <SessionRow key={s.id} session={s} language={language} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export function SessionRow({ session, language }: { session: SessionRecord; language: Language }) {
  const c = copy(language);
  return (
    <Card className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div>
        <p className="font-medium">{session.passageTitle}</p>
        <p className="text-xs text-paper-fade dark:text-night-fade">
          {c.modes[session.mode].label} · {new Date(session.endedAt).toLocaleString()}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span>
          {session.wpmStandard} {c.dash.wpm}
        </span>
        <span className="text-paper-fade">{Math.round(session.comprehension * 100)}%</span>
        <Badge tone={session.speedCredited ? "good" : "warn"}>
          {session.speedCredited ? c.session.credited : c.session.noCredit}
        </Badge>
      </div>
    </Card>
  );
}
