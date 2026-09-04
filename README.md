# Rauding Gym

Evidence-based reading fluency training for mixed materials in **Turkish** and **English**. Local-first desktop app (Electron) that also runs in a browser for convenience.

This is a gym for four skills:

1. Better language skill (vocabulary, sentence integration)
2. Deliberate mode switching (study / normal rauding / gist-skim / scan)
3. Metacognitive control of attention and *unnecessary* rereading
4. Retrieval, so comprehension is real

It is **not** a speed-reading gadget.

## What it refuses to be

- No Spritz / RSVP as a training mode
- No "eliminate subvocalization" drills
- No peripheral-span, whole-page flash, or zigzag traces
- No PhotoReading or absorb-a-page-in-seconds
- No forced regression lock
- No comprehension-optional tachistoscopic drills
- No RE Index (WPM × % correct) as the primary KPI
- No promise of 2–3× speed with equal deep comprehension

Adult nonfiction at ordinary comprehension usually sits near **175–300 WPM** (Brysbaert, 2019). Modest *gated* gains inside that band are plausible. A Normal-mode speed number only counts if the comprehension gate stays green. A high gist-skim rate cannot unlock a Normal badge.

## Install and run

```bash
npm install
npm start
```

`npm start` launches the **Electron** desktop app.

To use the same interface in a browser (useful for preview or if you do not want Electron):

```bash
npm run web
```

Then open `http://127.0.0.1:43147`.

Production build (smoke-tested):

```bash
npm run build
```

Progress is stored locally: Electron writes JSON under the app user-data folder; the browser preview uses `localStorage`.

## How a session works

1. **Mode** — Study, Normal (rauding), Gist-skim, or Scan. Each screen states the success criterion.
2. **Purpose lock** — gist / argument+evidence / details you will recall tomorrow.
3. **Structure preview** — headings, first sentences, abstract if any. Optional 75s timer. You may write 1–3 questions from the skeleton.
4. **Full-text reading** — you scroll. Optional attention pacer (underline / margin tick) that never hides passed words and never blocks going back. Click or `C` to mark confusion; double-click a paragraph to count a reread.
5. **Mind-wandering prompts** — occasional "still tracking the claim?" and a one-line gist box.
6. **Free recall** — dump the argument, then self-score against model points.
7. **Comprehension gate** — mixed literal + inferential items. Fail the gate → no Normal-mode speed credit; reread the paragraph that held the miss.
8. **Lexical layer** — struggled words: form, meaning, a new sentence (free dictionary / Wiktionary, with a local fallback).
9. **Spaced review** — the next visit can open with 1–2 delayed probes, not a full reread.

Keys while reading: `P` pacer · `H` highlight · `C` confused · `E` end reading · `Esc` dismiss a prompt.

## Measurement (honest)

- WPM uses Carver-style **standard-length words** (characters / 6) and also reports raw word count. Numbers are **by mode**.
- Timed sample passages are 300–500+ words.
- Normal-mode speed is credited only if comprehension is ≥ ~80% of your careful baseline **or** ≥ 70% absolute on a ~25% chance gate.
- Target nudge: +5–10% above baseline after **3 consecutive gated passes**; backoff after **2 fails**.
- The dashboard never collapses the work into a vanity "your speed is 812."

## Content

- Six baked-in original passages (CC0): 3 English + 3 Turkish, essay / news-like / short report, each with pre-written questions and model recall points.
- Paste your own text, or upload `.txt` / `.md`.
- **Fetch:** Project Gutenberg via [Gutendex](https://gutendex.com/) when reachable; otherwise a local catalog of public-domain titles fetched as plain text from gutenberg.org (boilerplate stripped, license shown, stored locally). Wikipedia REST / MediaWiki extracts for EN or TR (CC BY-SA). Gutenberg is English-heavy; Turkish training uses the curated samples plus Wikipedia.

Hard text (Flesch or sentence-length heuristic) suggests Study mode.

## Science (short)

See **Science** in the app for the longer panel.

- Rayner et al. (2016): skilled reading is serial word identification plus integration; visual "speed systems" do not bypass that.
- Brysbaert (2019): typical adult silent rates for ordinary comprehension.
- Klimovich et al. (2023): metacognitive control is the more honest lever for keeping meaning.
- Roediger & Karpicke (2006): retrieval practice.
- Carver's rauding framework: mode-specific rates; this app does **not** use RE Index as the headline number.
- Schwalm (2025) and related reviews: caution against RSVP-as-training and comprehension-optional drills.

## Turkish + English

Interface language is independent of passage language. You can run the UI in Turkish and still read an English Gutenberg chapter, or the reverse.

## What this is not asking you to believe

Faster decoding of familiar prose is real. Erasing the speed–accuracy tradeoff is not. If a product promises two or three times your careful comprehension, it is selling a different activity than rauding.
