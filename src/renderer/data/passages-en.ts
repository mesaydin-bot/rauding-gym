import type { Passage } from "../types";
import { estimateDifficulty } from "../lib/metrics";

const now = 1_700_000_000_000;

export const englishPassages: Passage[] = [
  {
    id: "en-reread",
    title: "Rereading is not a vice",
    language: "en",
    source: "sample",
    license: "Original educational text for Rauding Gym (CC0)",
    author: "Rauding Gym",
    genre: "essay",
    headings: ["What regressions actually do", "When going back helps", "A better habit than a lock"],
    abstract:
      "An essay on why skilled readers look back, and why locking regressions is a poor training idea.",
    text: `What regressions actually do

Most advice sold as speed reading treats looking back as a defect. The story is simple: if your eyes return to an earlier word, you are wasting time, and if you stop doing that you will read two or three times faster with the same understanding. Eye-movement research does not support that story. Skilled adult readers make short regressions often. They do it when a word is unexpected, when a pronoun is ambiguous, or when a clause failed to parse on the first pass. The return is usually a few characters or a line, not a theatrical restart of the page.

Those glances are part of comprehension, not a moral failure. Language arrives in time. A sentence can look finished and then turn. A later phrase can force you to reinterpret an earlier noun. If you cannot go back, you do not become a more efficient decoder. You become a person who is guessing.

When going back helps

There is a real problem hiding under the myth. Some rereading is not repair; it is drift. You finish a paragraph and realize you can name none of its claims. You slide the eyes back to the top and hope a second pass will do the work that attention failed to do the first time. That loop is expensive, and it feels like diligence. Training can target it without pretending that all regressions are waste.

The useful distinction is between a short, motivated look-back and an unplanned replay of the whole page. The first is how language is checked. The second is often a substitute for a purpose. If you do not know whether you need the gist, the argument, or details you must recall tomorrow, every sentence feels equally urgent and equally forgettable. Purpose is cheaper than another pass.

A better habit than a lock

Software that forbids going back trains a brittle habit. It can raise words-per-minute on a quiz that never asks you to use the information. It cannot raise the quality of the representation you keep after the page is gone. A more honest drill is slower to advertise: choose a mode, preview the skeleton, read the full paragraph, notice when you have lost the claim, and then retrieve the argument without looking. If you miss a question, return to the paragraph that held the answer. That is not a visual hack. It is language practice plus metacognitive control.

None of this implies that adults cannot become faster. Practice with familiar vocabulary, cleaner preview, and fewer useless loops can move a careful reader a modest distance inside a normal band. It does not rewrite the limits of word identification and sentence integration. Those limits are why a product that promises two or three times the speed at equal deep comprehension is not a training plan. It is a sales sentence.`,
    questions: [
      {
        id: "en-reread-q1",
        kind: "literal",
        prompt: "According to the essay, what do skilled adult readers often do with their eyes?",
        options: [
          "They make short regressions when a word or clause is unclear.",
          "They never look back once a line has been seen.",
          "They skip every other line to raise speed.",
          "They read only the first and last sentence of each paragraph."
        ],
        correctIndex: 0,
        paragraphIndex: 1,
        explanation: "The second paragraph states that skilled readers regress when a word is unexpected or a clause fails to parse."
      },
      {
        id: "en-reread-q2",
        kind: "literal",
        prompt: "What distinction does the author want the reader to keep?",
        options: [
          "Between motivated look-backs and unplanned replay of a whole page.",
          "Between paper books and screens.",
          "Between fiction and invoices.",
          "Between silent reading and reading aloud."
        ],
        correctIndex: 0,
        paragraphIndex: 5,
        explanation: "The middle section contrasts short repair glances with drifting second passes."
      },
      {
        id: "en-reread-q3",
        kind: "inferential",
        prompt: "Why does the author reject software that forbids going back?",
        options: [
          "It can inflate speed on weak tests while leaving a poor memory of the argument.",
          "It is too expensive for schools.",
          "It only works in Turkish.",
          "It forces readers to use a dictionary on every noun."
        ],
        correctIndex: 0,
        paragraphIndex: 7,
        explanation: "The closing section argues that a lock raises WPM on shallow quizzes without improving the kept representation."
      },
      {
        id: "en-reread-q4",
        kind: "inferential",
        prompt: "What follows from the claim that language arrives in time?",
        options: [
          "A later phrase can force reinterpretation, so blocking return harms comprehension.",
          "Readers should memorize every sentence before moving on.",
          "Speed and meaning are the same variable.",
          "Previewing headings is unnecessary."
        ],
        correctIndex: 0,
        paragraphIndex: 2,
        explanation: "If sentences can turn, forbidding look-back turns the reader into a guesser."
      },
      {
        id: "en-reread-q5",
        kind: "literal",
        prompt: "What kind of gain does the essay treat as plausible?",
        options: [
          "Modest movement inside a normal adult band, not a two-to-three-times rewrite of careful comprehension.",
          "A guaranteed doubling of deep comprehension in a week.",
          "Photo-like absorption of a full page.",
          "Elimination of all inner speech."
        ],
        correctIndex: 0,
        paragraphIndex: 8,
        explanation: "The last paragraph allows modest gated gains and rejects 2–3× claims."
      }
    ],
    modelRecall: [
      "Skilled regressions are usually short repairs, not proof of a bad habit.",
      "Some rereading is drift: a second pass that substitutes for attention and purpose.",
      "Purpose (gist vs argument vs later recall) is cheaper than replaying the page.",
      "Forbidding look-back can raise shallow WPM without improving what you keep.",
      "Honest practice: mode, preview, full text, notice loss of the claim, then retrieve."
    ],
    difficulty: estimateDifficulty("", "en"),
    createdAt: now
  },
  {
    id: "en-heat",
    title: "A quiet shift in how cities measure heat",
    language: "en",
    source: "sample",
    license: "Original educational text for Rauding Gym (CC0)",
    author: "Rauding Gym",
    genre: "news",
    headings: ["Not just the airport reading", "Night is the policy problem", "What councils are changing"],
    abstract:
      "A news-style report on why official city temperatures can miss the heat people actually sleep in.",
    text: `Not just the airport reading

For decades, the temperature that appeared in a city's evening bulletin came from a station chosen for aviation or regional climate records. Those instruments sit on grass, away from asphalt, and they are excellent at describing the air mass over a region. They are less excellent at describing a fourth-floor bedroom above a bus lane. During last summer's long warm spell, three mid-size cities in the same river basin posted official highs that differed by less than a degree. Indoor loggers in rented flats differed by as much as 4.6°C after sunset.

The gap is not a scandal so much as a category error. A forecast built for aircraft and farms was being asked to answer a housing question. People do not recover from heat at the airport. They recover, or fail to, in rooms that store the day's radiation and then release it slowly after midnight.

Night is the policy problem

Public health researchers have been repeating a narrower claim: excess deaths during warm periods track overnight minima more tightly than afternoon peaks. The body can tolerate a hot afternoon if the night allows core temperature to fall. When the minimum stays above about 20°C for several nights, sleep fragments, and the next day's attention and memory suffer. That is an occupational fact as much as a comfort fact. A city that reports only the daily high can look moderate on paper while its residents accumulate a sleep deficit.

Neighborhood structure explains much of the leftover heat. Dense blocks with little tree cover, dark roofs, and narrow streets hold warmth. Parks and river edges shed it. The same official station cannot represent both. Several planning offices have therefore begun to publish a second number: a night-heat index built from a cheap network of sensors on schools and clinics, plus a model that estimates indoor minima for typical building types.

What councils are changing

The first practical change is communication. Heat warnings that once triggered at a single afternoon threshold now include a night clause. If the modeled indoor minimum is likely to stay high, cooling centers stay open later and some transit systems extend evening shade-and-water stops. The second change is slower: roof-coating programs and street-tree budgets are being scored against overnight relief, not only against midday photographs.

None of the cities claims that a better thermometer cools a room. The argument is more modest and more useful. If you measure the heat people actually sleep in, you stop congratulating a regional average and start spending on the blocks that do not cool. That is not a new climate. It is a clearer map of the old one.`,
    questions: [
      {
        id: "en-heat-q1",
        kind: "literal",
        prompt: "Why can official city temperatures miss the heat in apartments?",
        options: [
          "Stations are often sited for aviation or regional records, away from asphalt and housing.",
          "Indoor thermometers are illegal in the cities described.",
          "Airports are always hotter than bedrooms.",
          "Forecasts only report winter data."
        ],
        correctIndex: 0,
        paragraphIndex: 1,
        explanation: "The opening explains that official instruments sit on grass and describe an air mass, not a flat above a bus lane."
      },
      {
        id: "en-heat-q2",
        kind: "literal",
        prompt: "What do excess deaths during warm periods track more tightly, according to the report?",
        options: [
          "Overnight minima, rather than afternoon peaks.",
          "Only the official airport high.",
          "Wind speed at noon.",
          "The number of weather apps on a phone."
        ],
        correctIndex: 0,
        paragraphIndex: 4,
        explanation: "The night section states that deaths track overnight minima more tightly than peaks."
      },
      {
        id: "en-heat-q3",
        kind: "inferential",
        prompt: "Why would a city look 'moderate on paper' while residents still accumulate a sleep deficit?",
        options: [
          "A single daily high can hide nights that never cool enough for recovery.",
          "People sleep better in heat, so the deficit is imaginary.",
          "Official highs were 4.6°C apart in the same basin.",
          "Cooling centers close when nights are hot."
        ],
        correctIndex: 0,
        paragraphIndex: 4,
        explanation: "If nights stay warm, the official high can still look ordinary while sleep is damaged."
      },
      {
        id: "en-heat-q4",
        kind: "literal",
        prompt: "What is the night-heat index built from?",
        options: [
          "A network of sensors on schools and clinics, plus a model of indoor minima.",
          "Satellite photos of beaches only.",
          "Pilot reports from a single runway.",
          "Social-media complaints counted by the hour."
        ],
        correctIndex: 0,
        paragraphIndex: 5,
        explanation: "Planning offices combine cheap sensors with a building-type model."
      },
      {
        id: "en-heat-q5",
        kind: "inferential",
        prompt: "What is the modest claim about better measurement?",
        options: [
          "A clearer map of leftover heat can redirect spending to blocks that do not cool.",
          "A better thermometer by itself lowers room temperature.",
          "Tree budgets should be judged only by midday photographs.",
          "All three cities already have identical indoor temperatures."
        ],
        correctIndex: 0,
        paragraphIndex: 8,
        explanation: "The close says measurement does not cool a room; it stops praise of a regional average."
      }
    ],
    modelRecall: [
      "Official highs often come from grass stations meant for aviation or climate records.",
      "Indoor night temperatures can diverge sharply from those official highs.",
      "Health risk tracks overnight minima because the body needs a cool night to recover.",
      "Neighborhood form (trees, roofs, street width) stores or sheds heat.",
      "Policy shift: night clause in warnings; spend against overnight relief, not only midday images."
    ],
    difficulty: estimateDifficulty("", "en"),
    createdAt: now + 1
  },
  {
    id: "en-sleep",
    title: "What a week of short sleep does to next-day recall",
    language: "en",
    source: "sample",
    license: "Original educational text for Rauding Gym (CC0)",
    author: "Rauding Gym",
    genre: "report",
    headings: ["The study in brief", "Not just feeling tired", "What this is not"],
    abstract:
      "A short research-style report on sleep restriction, delayed recall, and why caffeine is a poor substitute for consolidation.",
    text: `The study in brief

A university sleep lab asked 64 adults, aged 22 to 41, to keep a fixed wake time for two weeks. In the first week everyone slept in a 7.5-hour window. In the second week a randomly assigned half of the group had their lights-out moved later so that time in bed fell to 5 hours. Each morning the participants read a 500-word factual passage they had not seen before. They took an immediate short-answer test, then returned the next day for a delayed test on the same passage without rereading.

Immediate scores barely moved. The short-sleep group was only three percentage points lower on the same-day questions. Delayed scores told a different story. After five nights of restriction, next-day recall fell by 18 points relative to the well-slept controls. The drop was larger for inferential items than for questions that repeated a sentence almost verbatim. People could still recognize a phrase they had seen. They were worse at reconstructing the argument.

Not just feeling tired

Participants rated their alertness each morning. Those ratings tracked the delayed scores only loosely. Several restricted sleepers said they felt "fine after coffee" and still lost the overnight gain that the control group kept. The lab's point was not that tired people cannot read. It was that consolidation after reading is a biological process, and a short night is a bad time to store a new structure of claims.

The passages were ordinary explainer prose, not word lists. That matters. A reader who skims for gist under sleep pressure may still extract a title-level summary and fail the questions that ask how two paragraphs relate. In the restricted group, free-recall dumps on day two were shorter and more likely to invert cause and effect.

What this is not

The authors refused two popular leaps. They did not claim that eight hours is a moral duty, and they did not claim that a single short night ruins a career. They also did not treat caffeine as a comprehension technology. Caffeine can lift subjective alertness. In this design it did not restore the delayed inferential advantage of a full night.

For a reading practice, the implication is unfashionable. If you care about what you will still know tomorrow, the session is not finished when you close the page. Sleep is part of the training plan, and a high words-per-minute number on a sleepy morning is a weak promise. Retrieval the next day is a better audit than a stopwatch on the first pass.`,
    questions: [
      {
        id: "en-sleep-q1",
        kind: "literal",
        prompt: "How did the lab change sleep for half the participants in week two?",
        options: [
          "Lights-out moved later so time in bed fell to 5 hours.",
          "They were asked to sleep 9 hours and skip caffeine.",
          "They slept only on weekends.",
          "They were woken every 20 minutes for vocabulary drills."
        ],
        correctIndex: 0,
        paragraphIndex: 1,
        explanation: "Week two restricted a random half to 5 hours in bed by delaying lights-out."
      },
      {
        id: "en-sleep-q2",
        kind: "literal",
        prompt: "Which test showed the large difference after restriction?",
        options: [
          "Next-day delayed recall, especially inferential items.",
          "The immediate same-day short-answer test only.",
          "A typing speed test.",
          "An eye-tracking exam with no questions."
        ],
        correctIndex: 0,
        paragraphIndex: 2,
        explanation: "Immediate scores barely moved; delayed recall dropped 18 points, more on inference."
      },
      {
        id: "en-sleep-q3",
        kind: "inferential",
        prompt: "Why do the authors treat caffeine as a poor substitute here?",
        options: [
          "It can raise how awake people feel without restoring delayed inferential memory.",
          "It was banned in both groups.",
          "It improved next-day recall more than sleep did.",
          "It only works for word lists, not prose."
        ],
        correctIndex: 0,
        paragraphIndex: 7,
        explanation: "Caffeine lifted alertness ratings but did not bring back the overnight inferential advantage."
      },
      {
        id: "en-sleep-q4",
        kind: "inferential",
        prompt: "What does a high WPM on a sleepy morning fail to guarantee?",
        options: [
          "That the structure of claims will still be available tomorrow.",
          "That the reader can finish the page.",
          "That coffee was consumed.",
          "That the passage was 500 words."
        ],
        correctIndex: 0,
        paragraphIndex: 8,
        explanation: "The close argues that tomorrow's retrieval is a better audit than a first-pass stopwatch."
      },
      {
        id: "en-sleep-q5",
        kind: "literal",
        prompt: "What happened to free-recall dumps on day two in the restricted group?",
        options: [
          "They were shorter and more likely to invert cause and effect.",
          "They became more detailed than the control group's.",
          "They were identical to immediate dumps.",
          "They were not collected."
        ],
        correctIndex: 0,
        paragraphIndex: 5,
        explanation: "Sleep-restricted free recall was shorter and mixed up causality."
      }
    ],
    modelRecall: [
      "Design: 64 adults, then one week of 5-hour time in bed for half the group.",
      "Immediate quiz almost unchanged; delayed next-day recall dropped sharply.",
      "Inferential items suffered more than near-verbatim recognition.",
      "Feeling 'fine after coffee' did not restore consolidation.",
      "For training: sleep and delayed retrieval audit meaning better than first-pass WPM."
    ],
    difficulty: estimateDifficulty("", "en"),
    createdAt: now + 2
  }
];

for (const p of englishPassages) {
  p.difficulty = estimateDifficulty(p.text, "en");
}
