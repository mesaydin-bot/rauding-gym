import type { AppState, Language } from "../types";
import { copy } from "../lib/i18n";
import { Button, Card, Field } from "../components/ui";

export function SettingsPage({
  state,
  onChange,
  onReset
}: {
  state: AppState;
  onChange: (next: AppState) => void;
  onReset: () => void;
}) {
  const language = state.settings.uiLanguage;
  const c = copy(language);
  const s = state.settings;
  return (
    <div className="max-w-measure space-y-6">
      <h1 className="font-read text-3xl font-semibold">{c.settings.title}</h1>
      <Card className="space-y-5">
        <Field label={c.onboarding.langHint}>
          <div className="flex gap-2">
            <Button
              variant={s.uiLanguage === "en" ? "primary" : "ghost"}
              onClick={() => onChange({ ...state, settings: { ...s, uiLanguage: "en" } })}
            >
              English
            </Button>
            <Button
              variant={s.uiLanguage === "tr" ? "primary" : "ghost"}
              onClick={() => onChange({ ...state, settings: { ...s, uiLanguage: "tr" } })}
            >
              Türkçe
            </Button>
          </div>
        </Field>
        <Field label={c.settings.theme}>
          <div className="flex gap-2">
            <Button
              variant={s.theme === "light" ? "primary" : "ghost"}
              onClick={() => onChange({ ...state, settings: { ...s, theme: "light" } })}
            >
              {c.settings.light}
            </Button>
            <Button
              variant={s.theme === "dark" ? "primary" : "ghost"}
              onClick={() => onChange({ ...state, settings: { ...s, theme: "dark" } })}
            >
              {c.settings.dark}
            </Button>
          </div>
        </Field>
        <Field label={`${c.settings.font}: ${s.fontSize}px`}>
          <input
            type="range"
            min={16}
            max={28}
            value={s.fontSize}
            onChange={(e) =>
              onChange({ ...state, settings: { ...s, fontSize: Number(e.target.value) } })
            }
            className="w-full"
          />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={s.pacerEnabled}
            onChange={(e) => onChange({ ...state, settings: { ...s, pacerEnabled: e.target.checked } })}
          />
          {c.settings.pacer}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={s.previewTimer}
            onChange={(e) => onChange({ ...state, settings: { ...s, previewTimer: e.target.checked } })}
          />
          {c.settings.previewTimer}
        </label>
        <Field label={c.settings.prompts}>
          <div className="flex flex-wrap gap-2">
            {(["rare", "normal", "frequent"] as const).map((freq) => (
              <Button
                key={freq}
                variant={s.promptFrequency === freq ? "primary" : "ghost"}
                onClick={() => onChange({ ...state, settings: { ...s, promptFrequency: freq } })}
              >
                {c.settings[freq]}
              </Button>
            ))}
          </div>
        </Field>
        <Button variant="danger" onClick={onReset}>
          {c.settings.reset}
        </Button>
      </Card>
    </div>
  );
}
