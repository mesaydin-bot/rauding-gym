import { useEffect, useMemo, useState } from "react";
import type { AppState, Passage, ReviewProbe, Screen, SessionRecord, VocabItem } from "./types";
import { defaultState } from "./types";
import { loadState, saveState } from "./lib/store";
import { copy } from "./lib/i18n";
import { localDateKey, uid } from "./lib/metrics";
import { AppShell } from "./components/AppShell";
import { Onboarding } from "./pages/Onboarding";
import { Home } from "./pages/Home";
import { Library } from "./pages/Library";
import { Dashboard } from "./pages/Dashboard";
import { History } from "./pages/History";
import { SettingsPage } from "./pages/Settings";
import { About } from "./pages/About";
import { Review } from "./pages/Review";
import { SessionView, createLive, type LiveSession } from "./pages/Session";

export default function App() {
  const [state, setState] = useState<AppState>(defaultState);
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState<Screen>("home");
  const [live, setLive] = useState<LiveSession | null>(null);

  useEffect(() => {
    void loadState().then((loaded) => {
      setState(loaded);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", state.settings.theme === "dark");
    void saveState(state);
  }, [state, ready]);

  const language = state.settings.uiLanguage;
  const due = useMemo(
    () => state.reviews.filter((r) => !r.answeredAt && r.dueAt <= Date.now()),
    [state.reviews]
  );

  function patch(next: AppState): void {
    setState(next);
  }

  function startPassage(passage: Passage): void {
    setLive(createLive(passage, state.settings.pacerEnabled));
    setScreen("session");
  }

  function finishSession(
    record: SessionRecord,
    vocab: VocabItem[],
    nextProgress: AppState["progress"]
  ): void {
    const today = localDateKey();
    let streak = state.streakDays;
    if (state.lastActiveDate === today) {
      // same day
    } else if (state.lastActiveDate && daysBetween(state.lastActiveDate, today) === 1) {
      streak += 1;
    } else {
      streak = 1;
    }
    const probes = makeProbes(record, live);
    patch({
      ...state,
      sessions: [...state.sessions, record],
      vocabulary: [...state.vocabulary, ...vocab],
      reviews: [...state.reviews, ...probes],
      progress: nextProgress,
      lastActiveDate: today,
      streakDays: streak
    });
    setLive(null);
    setScreen("dashboard");
  }

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-paper font-read text-paper-fade dark:bg-night">
        Rauding Gym
      </div>
    );
  }

  if (!state.onboardingComplete) {
    return (
      <div className="min-h-screen bg-paper px-4 text-paper-ink dark:bg-night dark:text-night-ink">
        <Onboarding
          language={language}
          onLanguage={(uiLanguage) => patch({ ...state, settings: { ...state.settings, uiLanguage } })}
          onDone={() => {
            patch({ ...state, onboardingComplete: true });
            setScreen("home");
          }}
        />
      </div>
    );
  }

  return (
    <AppShell screen={screen} language={language} onNavigate={(s) => setScreen(s)}>
      {screen === "home" && (
        <Home state={state} language={language} onNavigate={setScreen} dueCount={due.length} />
      )}
      {screen === "library" && (
        <Library
          language={language}
          custom={state.customPassages}
          onSaveCustom={(p) => patch({ ...state, customPassages: [...state.customPassages, p] })}
          onStart={startPassage}
        />
      )}
      {screen === "session" && live && (
        <SessionView
          live={live}
          language={language}
          settings={state.settings}
          progress={state.progress}
          onChange={setLive}
          onFinish={finishSession}
        />
      )}
      {screen === "session" && !live && (
        <p className="text-paper-fade">{copy(language).home.empty}</p>
      )}
      {screen === "dashboard" && <Dashboard state={state} language={language} />}
      {screen === "history" && <History state={state} language={language} />}
      {screen === "settings" && (
        <SettingsPage
          state={state}
          onChange={patch}
          onReset={() => {
            const keep = state.settings;
            patch({ ...defaultState(), settings: keep, onboardingComplete: true });
          }}
        />
      )}
      {screen === "about" && <About language={language} />}
      {screen === "review" && (
        <Review
          language={language}
          due={due}
          onScore={(id, _answer, score) => {
            patch({
              ...state,
              reviews: state.reviews.map((r) =>
                r.id === id ? { ...r, answeredAt: Date.now(), selfScore: score } : r
              )
            });
          }}
        />
      )}
    </AppShell>
  );
}

function daysBetween(a: string, b: string): number {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(ms / 86400000);
}

function makeProbes(record: SessionRecord, live: LiveSession | null): ReviewProbe[] {
  if (!live) return [];
  const delay = 20 * 60 * 60 * 1000;
  const points = live.passage.modelRecall.slice(0, 2);
  return points.map((point, i) => ({
    id: uid("r"),
    passageId: record.passageId,
    passageTitle: record.passageTitle,
    language: record.language,
    dueAt: Date.now() + delay + i * 3600000,
    kind: i === 0 ? "gist" : "detail",
    prompt:
      record.language === "tr"
        ? `“${record.passageTitle}” metninden: bu noktayı kendi cümlelerinle yaz.`
        : `From “${record.passageTitle}”: restate this point in your own words.`,
    expected: point
  }));
}
