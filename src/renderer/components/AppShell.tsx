import type { ReactNode } from "react";
import type { Language, Screen } from "../types";
import { copy } from "../lib/i18n";
import { cn } from "./ui";

const items: Array<{ id: Screen; key: "home" | "library" | "dashboard" | "review" | "history" | "settings" | "about" }> = [
  { id: "home", key: "home" },
  { id: "library", key: "library" },
  { id: "dashboard", key: "dashboard" },
  { id: "review", key: "review" },
  { id: "history", key: "history" },
  { id: "settings", key: "settings" },
  { id: "about", key: "about" }
];

export function AppShell({
  screen,
  language,
  onNavigate,
  children
}: {
  screen: Screen;
  language: Language;
  onNavigate: (s: Screen) => void;
  children: ReactNode;
}) {
  const c = copy(language);
  return (
    <div className="min-h-screen bg-paper text-paper-ink dark:bg-night dark:text-night-ink">
      <div className="mx-auto flex max-w-page gap-0 md:gap-8">
        <aside className="sticky top-0 hidden h-screen w-52 shrink-0 flex-col border-r border-paper-line px-4 py-6 dark:border-night-line md:flex">
          <div className="mb-8">
            <p className="font-read text-xl font-semibold tracking-tight">{c.appName}</p>
            <p className="mt-1 text-xs leading-snug text-paper-fade dark:text-night-fade">{c.tagline}</p>
          </div>
          <nav className="flex flex-1 flex-col gap-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "rounded-md px-3 py-2 text-left text-sm font-medium",
                  screen === item.id
                    ? "bg-moss/15 text-moss dark:bg-moss/20 dark:text-moss-bright"
                    : "text-paper-fade hover:bg-paper-muted dark:text-night-fade dark:hover:bg-night-raised"
                )}
              >
                {c.nav[item.key]}
              </button>
            ))}
          </nav>
          <p className="text-[11px] leading-relaxed text-paper-fade dark:text-night-fade">
            {language === "tr"
              ? "Hız, kapı yeşilken bir sonuçtur."
              : "Speed is a result when the gate is green."}
          </p>
        </aside>
        <main className="min-w-0 flex-1 px-4 py-6 md:px-6 md:py-10">
          <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold",
                  screen === item.id
                    ? "bg-moss text-white"
                    : "bg-paper-muted dark:bg-night-raised"
                )}
              >
                {c.nav[item.key]}
              </button>
            ))}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
