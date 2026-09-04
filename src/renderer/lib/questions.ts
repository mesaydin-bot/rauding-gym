import type { Language, Passage, Question } from "../types";
import { countWords, estimateDifficulty, extractHeadings, splitParagraphs, splitSentences, uid } from "./metrics";

const DISTRACTORS_EN = [
  "The passage does not address this point.",
  "This is stated as the opposite of the author's claim.",
  "The author treats this as a minor aside, not the main point.",
  "This would require evidence the text does not give."
];

const DISTRACTORS_TR = [
  "Metin bu noktaya değinmez.",
  "Yazar bunun tam tersini savunur.",
  "Bu, ana sav değil, geçici bir örnektir.",
  "Metinde bu çıkarımı destekleyecek kanıt yoktur."
];

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function cleanSentence(s: string): string {
  return s.replace(/^["“”]+|["“”]+$/g, "").replace(/\s+/g, " ").trim();
}

function shorten(s: string, n = 140): string {
  const c = cleanSentence(s);
  return c.length <= n ? c : `${c.slice(0, n - 1)}…`;
}

export function generateQuestions(text: string, language: Language): Question[] {
  const paras = splitParagraphs(text);
  const sentences = paras.flatMap((p, i) =>
    splitSentences(p).map((s) => ({ s: cleanSentence(s), i }))
  );
  if (sentences.length < 3) return [];

  const questions: Question[] = [];
  const used = new Set<number>();

  const causal = sentences.filter(({ s }) =>
    language === "tr"
      ? /\b(çünkü|bu yüzden|ancak|oysa|dolayısıyla|nedeniyle)\b/i.test(s)
      : /\b(because|therefore|however|although|thus|so that)\b/i.test(s)
  );

  const numeric = sentences.filter(({ s }) => /\d/.test(s));
  const longish = sentences.filter(({ s }) => countWords(s) >= 12);

  function addLiteral(item: { s: string; i: number } | undefined): void {
    if (!item || used.has(item.i) && questions.length >= 2) return;
    used.add(item.i);
    const words = item.s.split(" ");
    const snippet = words.slice(0, Math.min(8, words.length)).join(" ");
    const prompt =
      language === "tr"
        ? `Metne göre, “${shorten(snippet, 70)}…” ile başlayan bölümde asıl söylenen nedir?`
        : `According to the passage, what is the point of the sentence beginning “${shorten(snippet, 70)}…”?`;
    const correct = shorten(item.s, 160);
    const pool = language === "tr" ? DISTRACTORS_TR : DISTRACTORS_EN;
    const options = shuffle([correct, ...shuffle(pool).slice(0, 3)]);
    questions.push({
      id: uid("q"),
      kind: "literal",
      prompt,
      options,
      correctIndex: options.indexOf(correct),
      paragraphIndex: item.i,
      explanation:
        language === "tr"
          ? "Yanıt, ilgili paragrafın açık ifadesine dayanır."
          : "The answer is stated in that paragraph."
    });
  }

  function addInference(item: { s: string; i: number } | undefined): void {
    if (!item) return;
    const prompt =
      language === "tr"
        ? "Bu cümleden makul olarak ne çıkarılabilir?"
        : "What can reasonably be inferred from this part of the text?";
    const correct =
      language === "tr"
        ? `Yazar, “${shorten(item.s, 90)}” ifadesiyle bir ilişki veya sınır çiziyor; bu, düz bir özet değil, bir çıkarım gerektirir.`
        : `The author is drawing a relationship or limit in “${shorten(item.s, 90)}”; that requires inference, not a copy of a label.`;
    const wrong =
      language === "tr"
        ? [
            "Yazar hiçbir neden-sonuç ilişkisi kurmaz.",
            "Cümle yalnızca bir tarih verir, sav taşımaz.",
            "Bu ifade, metnin ilerisindeki bir örneği iptal eder."
          ]
        : [
            "The author refuses any cause-and-effect claim here.",
            "The sentence only names a date and carries no argument.",
            "This line cancels an example that appears later."
          ];
    const options = shuffle([correct, ...wrong]);
    questions.push({
      id: uid("q"),
      kind: "inferential",
      prompt,
      options,
      correctIndex: options.indexOf(correct),
      paragraphIndex: item.i,
      explanation:
        language === "tr"
          ? "Doğru seçenek, cümlenin ima ettiği ilişkiyi yakalar."
          : "The correct option captures the implied relationship, not a word match."
    });
  }

  addLiteral(numeric[0] ?? longish[0] ?? sentences[0]);
  addLiteral(longish[1] ?? sentences[Math.floor(sentences.length / 2)]);
  addLiteral(sentences[sentences.length - 1]);
  addInference(causal[0] ?? longish[0] ?? sentences[1]);
  addInference(causal[1] ?? sentences[Math.max(0, sentences.length - 2)]);

  if (paras.length >= 2) {
    const claim = cleanSentence(splitSentences(paras[0])[0] ?? paras[0]);
    const prompt =
      language === "tr"
        ? "Metnin açılış savına en yakın ifade hangisidir?"
        : "Which statement is closest to the opening claim?";
    const correct = shorten(claim, 160);
    const pool = language === "tr" ? DISTRACTORS_TR : DISTRACTORS_EN;
    const options = shuffle([correct, ...shuffle(pool).slice(0, 3)]);
    questions.push({
      id: uid("q"),
      kind: "literal",
      prompt,
      options,
      correctIndex: options.indexOf(correct),
      paragraphIndex: 0,
      explanation:
        language === "tr"
          ? "Açılış cümlesi genellikle ana çerçeveyi kurar."
          : "The opening sentence usually frames the main claim."
    });
  }

  return questions.slice(0, 6);
}

export function generateRecallPoints(text: string, language: Language): string[] {
  const paras = splitParagraphs(text);
  const points = paras
    .map((p) => splitSentences(p)[0])
    .filter((s): s is string => Boolean(s))
    .slice(0, 5)
    .map((s) => s.replace(/\s+/g, " ").trim());
  if (points.length === 0) {
    return [
      language === "tr" ? "Metnin ana savını kendi cümlelerinle yaz." : "State the main claim in your own words."
    ];
  }
  return points;
}

export function passageFromText(input: {
  title: string;
  text: string;
  language: Language;
  source: Passage["source"];
  license: string;
  sourceUrl?: string;
  author?: string;
  genre?: Passage["genre"];
  questions?: Question[];
  modelRecall?: string[];
}): Passage {
  const text = input.text.trim();
  const questions = input.questions?.length ? input.questions : generateQuestions(text, input.language);
  const modelRecall = input.modelRecall?.length
    ? input.modelRecall
    : generateRecallPoints(text, input.language);
  return {
    id: uid("p"),
    title: input.title,
    language: input.language,
    source: input.source,
    license: input.license,
    sourceUrl: input.sourceUrl,
    author: input.author,
    genre: input.genre ?? "other",
    text,
    headings: extractHeadings(text),
    questions,
    modelRecall,
    difficulty: estimateDifficulty(text, input.language),
    createdAt: Date.now()
  };
}

export function pickMissedParagraphs(questions: Question[], answers: number[]): number[] {
  const missed = new Set<number>();
  questions.forEach((q, i) => {
    if (answers[i] !== q.correctIndex) missed.add(q.paragraphIndex);
  });
  return [...missed];
}
