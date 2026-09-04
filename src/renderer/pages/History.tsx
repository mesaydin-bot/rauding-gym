import type { AppState, Language } from "../types";
import { copy } from "../lib/i18n";
import { SessionRow } from "./Home";

export function History({ state, language }: { state: AppState; language: Language }) {
  const c = copy(language);
  const rows = [...state.sessions].reverse();
  return (
    <div className="space-y-4">
      <h1 className="font-read text-3xl font-semibold">{c.nav.history}</h1>
      {state.streakDays > 0 && (
        <p className="text-sm text-paper-fade">
          {language === "tr"
            ? `${state.streakDays} gün üst üste çalıştın — rozet avı değil, alışkanlık notu.`
            : `${state.streakDays} days in a row — a habit note, not a badge hunt.`}
        </p>
      )}
      {rows.length === 0 ? (
        <p className="text-paper-fade">{c.home.empty}</p>
      ) : (
        rows.map((s) => <SessionRow key={s.id} session={s} language={language} />)
      )}
    </div>
  );
}
