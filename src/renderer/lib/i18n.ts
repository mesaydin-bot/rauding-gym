import type { Language, ReadingMode, Purpose } from "../types";

export const t = {
  en: {
    appName: "Rauding Gym",
    tagline: "Read with a purpose. Measure meaning, not theater.",
    nav: {
      home: "Home",
      library: "Library",
      session: "Session",
      dashboard: "Dashboard",
      history: "History",
      review: "Review",
      settings: "Settings",
      about: "Science"
    },
    modes: {
      study: {
        label: "Study",
        criterion: "Success: you can teach the structure tomorrow. Slow is correct. Annotate freely."
      },
      normal: {
        label: "Normal (rauding)",
        criterion: "Success: ordinary comprehension of consecutive prose at your current careful rate. This is the gated speed trial."
      },
      gist: {
        label: "Gist-skim",
        criterion: "Success: you can state the claim and two supports — not every detail. High WPM here never unlocks Normal credit."
      },
      scan: {
        label: "Scan",
        criterion: "Success: you find the specific target you named. Speed without a target is just skipping."
      }
    },
    purposes: {
      gist: {
        label: "I need the gist",
        detail: "One claim, a few supports. Gate asks for the frame, not trivia."
      },
      argument: {
        label: "Argument + evidence",
        detail: "How the pieces relate. Inferential items count more in your self-check."
      },
      details: {
        label: "Details I will recall tomorrow",
        detail: "Names, numbers, conditions. Delayed review will probe these."
      }
    },
    onboarding: {
      title: "What this gym is",
      p1: "Rauding Gym trains four things: language skill, deliberate mode switching, control of attention and useless rereading, and retrieval so comprehension is real.",
      p2: "It will not sell you RSVP, 'kill subvocalization,' peripheral-span flashes, PhotoReading, or a lock that forbids looking back. Those are not the product.",
      p3: "Adult nonfiction at ordinary comprehension usually sits near 175–300 WPM (Brysbaert, 2019). Modest gated gains are plausible. Two-to-three times careful comprehension is not a target.",
      p4: "A Normal-mode speed number only counts if the comprehension gate stays green. Gist-skim speed cannot unlock a Normal badge.",
      start: "Enter the gym",
      langHint: "Interface language — passages can still be Turkish or English."
    },
    home: {
      greeting: "Hello, Mesut.",
      dueReviews: "Delayed probes waiting",
      startSession: "Start a session",
      continueScience: "Read the evidence notes",
      recent: "Recent gated sessions",
      empty: "No sessions yet. Pick a passage and a mode — the stopwatch is not the point."
    },
    library: {
      title: "Passages",
      samples: "Baked-in samples",
      yours: "Your texts",
      fetch: "Fetch open text",
      paste: "Paste text",
      upload: "Upload .txt or .md",
      gutenberg: "Project Gutenberg (English, public domain)",
      wiki: "Wikipedia article (EN or TR, CC BY-SA)",
      search: "Search",
      topic: "Title or topic",
      hardHint: "Demanding text — Study mode is suggested.",
      words: "words",
      license: "License"
    },
    session: {
      pickMode: "Choose a mode before you read",
      pickPurpose: "Lock a purpose",
      preview: "Structure preview",
      previewHint: "Headings and first sentences. Optional: write 1–3 questions you want the text to answer.",
      startTimer: "Start 75s preview timer",
      skipTimer: "Skip timer",
      yourQuestions: "Questions from the skeleton",
      beginRead: "Begin full reading",
      reading: "Full-text reading",
      pacerOn: "Pacer on",
      pacerOff: "Pacer off",
      markConfused: "Mark confused",
      endReading: "End reading",
      stillTracking: "Still tracking the claim?",
      yes: "Yes — continue",
      lost: "I drifted — mark this spot",
      sectionGist: "One-line gist for this stretch",
      recallTitle: "Dump the argument",
      recallHint: "A few sentences, from memory. Then score yourself against the model points.",
      showModel: "Show model points",
      gateTitle: "Comprehension gate",
      failHint: "No speed credit for this Normal trial. Reread the paragraph that held the miss.",
      rereadMiss: "Reread missed paragraphs",
      lexicalTitle: "Lexical layer",
      lexicalHint: "Form, meaning, and a new sentence. This is language skill, not a flash card race.",
      summary: "Session record",
      noCredit: "Speed not credited — gate failed or mode is not Normal.",
      credited: "Normal-mode speed credited (gate green).",
      save: "Save and return"
    },
    dash: {
      title: "Honest numbers",
      byMode: "By mode — tracks are separate",
      delayed: "Delayed recall (self-scored probes)",
      noVanity: "There is no single 'your speed is 812' number. That would be the product we refused.",
      target: "Gentle Normal target",
      baseline: "Careful baseline",
      wpm: "WPM (standard-length)",
      raw: "raw WPM",
      comp: "Comprehension",
      empty: "Complete a gated session to see a mode row."
    },
    settings: {
      title: "Settings",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      font: "Reading size",
      pacer: "Attention pacer (never hides words, never blocks going back)",
      prompts: "Mind-wandering prompts",
      rare: "Rare",
      normal: "Normal",
      frequent: "Frequent",
      previewTimer: "Optional preview timer",
      reset: "Reset local progress"
    },
    about: {
      title: "Evidence, not hype",
      refuse: "What we refuse"
    },
    review: {
      title: "Spaced probes",
      empty: "No probes due. Finish a session with a purpose of 'details' or a gated Normal trial and come back tomorrow.",
      score: "How close were you?",
      due: "Due"
    },
    keys: "Keys: P pacer · H highlight · C confused · E end reading · Esc dismiss prompt"
  },
  tr: {
    appName: "Rauding Gym",
    tagline: "Amaçla oku. Sahne değil, anlam ölç.",
    nav: {
      home: "Giriş",
      library: "Kitaplık",
      session: "Oturum",
      dashboard: "Pano",
      history: "Geçmiş",
      review: "Tekrar",
      settings: "Ayarlar",
      about: "Bilim"
    },
    modes: {
      study: {
        label: "Çalışma",
        criterion: "Başarı: yapıyı yarına öğretebilmek. Yavaş doğrudur. Serbestçe işaretle."
      },
      normal: {
        label: "Normal (rauding)",
        criterion: "Başarı: ardışık düz yazıyı, şu anki dikkatli hızında olağan anlamla okumak. Kapılı hız denemesi budur."
      },
      gist: {
        label: "Özet-tarama",
        criterion: "Başarı: savı ve iki dayanağı söylemek — her ayrıntıyı değil. Buradaki yüksek WPM Normal kredisini açmaz."
      },
      scan: {
        label: "Tarama",
        criterion: "Başarı: adlandırdığın hedefi bulmak. Hedefsiz hız, atlamaktır."
      }
    },
    purposes: {
      gist: {
        label: "Genel resim",
        detail: "Bir sav, birkaç dayanak. Kapı çerçeveyi sorar, ıvır zıvırı değil."
      },
      argument: {
        label: "Sav + kanıt",
        detail: "Parçaların ilişkisi. Çıkarım maddeleri öz-puanda daha ağır basar."
      },
      details: {
        label: "Yarın hatırlayacağım ayrıntılar",
        detail: "Adlar, sayılar, koşullar. Gecikmeli tekrar bunları soracak."
      }
    },
    onboarding: {
      title: "Bu salon ne",
      p1: "Rauding Gym dört şey çalıştırır: dil becerisi, bilinçli mod geçişi, dikkat ve gereksiz yeniden okumanın kontrolü, ve anlamın gerçek sayılması için geri çağırma.",
      p2: "RSVP, 'iç sesi öldür', çevresel tarama, PhotoReading veya geriye bakmayı yasaklayan kilit satılmaz. Ürün bunlar değildir.",
      p3: "Yetişkin düz yazıda olağan anlama çoğu zaman 175–300 WPM bandındadır (Brysbaert, 2019). Kapılı mütevazı kazanç mümkündür. Eşit derin anlamla 2–3 kat hız hedef değildir.",
      p4: "Normal mod hızı yalnızca anlama kapısı yeşilse sayılır. Özet-tarama hızı Normal rozetini açamaz.",
      start: "Salona gir",
      langHint: "Arayüz dili — metinler yine Türkçe veya İngilizce olabilir."
    },
    home: {
      greeting: "Merhaba, Mesut.",
      dueReviews: "Bekleyen gecikmeli sonda",
      startSession: "Oturum başlat",
      continueScience: "Kanıt notlarını oku",
      recent: "Son kapılı oturumlar",
      empty: "Henüz oturum yok. Metin ve mod seç — kronometre asıl iş değildir."
    },
    library: {
      title: "Metinler",
      samples: "Hazır örnekler",
      yours: "Senin metinlerin",
      fetch: "Açık metin çek",
      paste: "Metin yapıştır",
      upload: ".txt veya .md yükle",
      gutenberg: "Project Gutenberg (İngilizce, kamu malı)",
      wiki: "Vikipedi maddesi (TR veya EN, CC BY-SA)",
      search: "Ara",
      topic: "Başlık veya konu",
      hardHint: "Zor metin — Çalışma modu önerilir.",
      words: "sözcük",
      license: "Lisans",
    },
    session: {
      pickMode: "Okumadan önce mod seç",
      pickPurpose: "Amacı kilitle",
      preview: "Yapı önizlemesi",
      previewHint: "Başlıklar ve ilk cümleler. İsteğe bağlı: metnin cevaplamasını istediğin 1–3 soru yaz.",
      startTimer: "75 sn önizleme sayacı",
      skipTimer: "Sayacı atla",
      yourQuestions: "İskeletten soruların",
      beginRead: "Tam metne geç",
      reading: "Tam metin okuma",
      pacerOn: "Tempo açık",
      pacerOff: "Tempo kapalı",
      markConfused: "Karıştı işaretle",
      endReading: "Okumayı bitir",
      stillTracking: "Savı hâlâ takip ediyor musun?",
      yes: "Evet — devam",
      lost: "Kayıldım — burayı işaretle",
      sectionGist: "Bu dilim için tek satırlık öz",
      recallTitle: "Savı dök",
      recallHint: "Birkaç cümle, bellekten. Sonra model maddelerine göre kendini puanla.",
      showModel: "Model maddeleri göster",
      gateTitle: "Anlama kapısı",
      failHint: "Bu Normal denemede hız kredisi yok. Kaçırdığın maddenin paragrafını yeniden oku.",
      rereadMiss: "Kaçırılan paragrafları oku",
      lexicalTitle: "Sözcük katmanı",
      lexicalHint: "Biçim, anlam, yeni cümle. Dil becerisi — yarış değil.",
      summary: "Oturum kaydı",
      noCredit: "Hız sayılmadı — kapı kırmızı veya mod Normal değil.",
      credited: "Normal-mod hızı sayıldı (kapı yeşil).",
      save: "Kaydet ve dön"
    },
    dash: {
      title: "Dürüst sayılar",
      byMode: "Moda göre — izler ayrı",
      delayed: "Gecikmeli hatırlama (öz-puanlı sondalar)",
      noVanity: "Tek bir 'hızın 812' sayısı yok. Reddettiğimiz ürün o olurdu.",
      target: "Nazik Normal hedef",
      baseline: "Dikkatli taban",
      wpm: "WPM (standart uzunluk)",
      raw: "ham WPM",
      comp: "Anlama",
      empty: "Mod satırı için kapılı bir oturum bitir."
    },
    settings: {
      title: "Ayarlar",
      theme: "Tema",
      light: "Açık",
      dark: "Koyu",
      font: "Okuma punto",
      pacer: "Dikkat temposu (sözcük gizlemez, geriye gitmeyi kilitlemez)",
      prompts: "Zihin kaçışı soruları",
      rare: "Seyrek",
      normal: "Normal",
      frequent: "Sık",
      previewTimer: "İsteğe bağlı önizleme sayacı",
      reset: "Yerel ilerlemeyi sıfırla"
    },
    about: {
      title: "Kanıt, şişirme değil",
      refuse: "Neyi reddediyoruz"
    },
    review: {
      title: "Aralıklı sondalar",
      empty: "Vadesi gelen sonda yok. 'Ayrıntı' amaçlı veya kapılı Normal bir oturum bitir; yarına uğra.",
      score: "Ne kadar yaklaştın?",
      due: "Vade"
    },
    keys: "Tuşlar: P tempo · H vurgu · C karıştı · E bitir · Esc soruyu kapat"
  }
} as const;

export function copy(lang: Language) {
  return t[lang];
}

export const modeOrder: ReadingMode[] = ["study", "normal", "gist", "scan"];
export const purposeOrder: Purpose[] = ["gist", "argument", "details"];
