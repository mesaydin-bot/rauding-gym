import type { Language } from "../types";
import { citations, sciencePointsEn, sciencePointsTr } from "../data/science";
import { copy } from "../lib/i18n";
import { Card } from "../components/ui";

export function About({ language }: { language: Language }) {
  const c = copy(language);
  const points = language === "tr" ? sciencePointsTr : sciencePointsEn;
  return (
    <div className="mx-auto max-w-measure space-y-6">
      <h1 className="font-read text-3xl font-semibold">{c.about.title}</h1>
      <Card className="space-y-4 font-read text-[17px] leading-relaxed">
        {points.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Card>
      <Card className="space-y-3">
        <h2 className="font-semibold">{c.about.refuse}</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
          {(language === "tr"
            ? [
                "Varsayılan antrenman olarak RSVP / Spritz",
                "İç sesi yok etme drill'leri",
                "Çevresel tarama, tüm sayfa flaşı, zikzak",
                "PhotoReading veya saniyede sayfa emmek",
                "Geriye bakmayı zorla kilitlemek",
                "Anlama kapısız takistoskop",
                "Birincil KPI olarak RE endeksi (WPM × doğruluk)",
                "Eşit derin anlamla 2–3 kat hız vaadi"
              ]
            : [
                "RSVP / Spritz as a default training mode",
                "Eliminate-subvocalization drills",
                "Peripheral-span, whole-page flash, zigzag traces",
                "PhotoReading or absorb-a-page-in-seconds",
                "Forced regression locks",
                "Comprehension-optional tachistoscopic drills",
                "RE Index (WPM × %correct) as the primary KPI",
                "A promise of 2–3× speed with equal deep comprehension"
              ]
          ).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
      <Card className="space-y-2 text-sm leading-relaxed">
        <h2 className="font-semibold">{language === "tr" ? "Kaynaklar" : "References"}</h2>
        {citations.map((cite) => (
          <p key={cite.key}>
            <span className="font-semibold">{cite.key}. </span>
            {cite.text}
          </p>
        ))}
      </Card>
    </div>
  );
}
