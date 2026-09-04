import type { Language } from "../types";
import { copy } from "../lib/i18n";
import { Button, Card } from "../components/ui";

export function Onboarding({
  language,
  onLanguage,
  onDone
}: {
  language: Language;
  onLanguage: (l: Language) => void;
  onDone: () => void;
}) {
  const c = copy(language);
  return (
    <div className="mx-auto max-w-measure space-y-6 py-6">
      <p className="font-read text-3xl font-semibold tracking-tight">{c.appName}</p>
      <p className="text-paper-fade dark:text-night-fade">{c.tagline}</p>
      <Card className="space-y-4 font-read text-[17px] leading-relaxed">
        <h1 className="font-ui text-sm font-semibold uppercase tracking-wide text-moss">{c.onboarding.title}</h1>
        <p>{c.onboarding.p1}</p>
        <p>{c.onboarding.p2}</p>
        <p>{c.onboarding.p3}</p>
        <p>{c.onboarding.p4}</p>
      </Card>
      <FieldLang language={language} onLanguage={onLanguage} hint={c.onboarding.langHint} />
      <Button onClick={onDone}>{c.onboarding.start}</Button>
    </div>
  );
}

function FieldLang({
  language,
  onLanguage,
  hint
}: {
  language: Language;
  onLanguage: (l: Language) => void;
  hint: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-paper-fade">{hint}</p>
      <div className="flex gap-2">
        <Button variant={language === "en" ? "primary" : "ghost"} onClick={() => onLanguage("en")}>
          English
        </Button>
        <Button variant={language === "tr" ? "primary" : "ghost"} onClick={() => onLanguage("tr")}>
          Türkçe
        </Button>
      </div>
    </div>
  );
}
