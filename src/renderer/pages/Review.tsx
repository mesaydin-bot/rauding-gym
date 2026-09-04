import { useState } from "react";
import type { Language, ReviewProbe } from "../types";
import { copy } from "../lib/i18n";
import { Button, Card, TextArea } from "../components/ui";

export function Review({
  language,
  due,
  onScore
}: {
  language: Language;
  due: ReviewProbe[];
  onScore: (id: string, answer: string, score: number) => void;
}) {
  const c = copy(language);
  if (due.length === 0) {
    return (
      <div className="max-w-measure space-y-3">
        <h1 className="font-read text-3xl font-semibold">{c.review.title}</h1>
        <p className="text-paper-fade">{c.review.empty}</p>
      </div>
    );
  }
  return (
    <div className="max-w-measure space-y-4">
      <h1 className="font-read text-3xl font-semibold">{c.review.title}</h1>
      <p className="text-sm text-paper-fade">
        {language === "tr"
          ? "Tam yeniden okuma değil — dünkü savdan bir sonda."
          : "Not a full reread — a probe from a prior passage."}
      </p>
      {due.slice(0, 2).map((probe) => (
        <ProbeCard key={probe.id} probe={probe} language={language} onScore={onScore} />
      ))}
    </div>
  );
}

function ProbeCard({
  probe,
  language,
  onScore
}: {
  probe: ReviewProbe;
  language: Language;
  onScore: (id: string, answer: string, score: number) => void;
}) {
  const c = copy(language);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  return (
    <Card className="space-y-3">
      <p className="text-xs uppercase tracking-wide text-paper-fade">{probe.passageTitle}</p>
      <p className="font-read text-lg">{probe.prompt}</p>
      <TextArea rows={4} value={answer} onChange={(e) => setAnswer(e.target.value)} />
      {!revealed ? (
        <Button onClick={() => setRevealed(true)} disabled={!answer.trim()}>
          {c.session.showModel}
        </Button>
      ) : (
        <div className="space-y-3">
          <p className="rounded-md bg-paper-muted p-3 text-sm dark:bg-night">{probe.expected}</p>
          <p className="text-xs font-semibold uppercase">{c.review.score}</p>
          <div className="flex gap-2">
            {[0, 0.5, 1].map((score) => (
              <Button key={score} variant="ghost" onClick={() => onScore(probe.id, answer, score)}>
                {score === 0 ? (language === "tr" ? "Kaçırdım" : "Missed") : score === 0.5 ? (language === "tr" ? "Yarım" : "Partial") : language === "tr" ? "Tuttum" : "Held"}
              </Button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
