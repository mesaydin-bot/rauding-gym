export interface Citation {
  key: string;
  text: string;
}

export const citations: Citation[] = [
  {
    key: "Rayner2016",
    text: "Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? Psychological Science in the Public Interest, 17(1), 4–34."
  },
  {
    key: "Brysbaert2019",
    text: "Brysbaert, M. (2019). How many words do we read per minute? A review and meta-analysis of reading rate. Journal of Memory and Language, 109, 104047."
  },
  {
    key: "Klimovich2023",
    text: "Klimovich, M., Tiffin-Richards, S. P., & Richter, T. (2023). Does speed reading training work, and if so, why? Effects of speed reading training and metacognitive training on reading speed, comprehension and eye movements. Journal of Research in Reading."
  },
  {
    key: "Schwalm2025",
    text: "Schwalm, K. et al. (2025). Reviews of commercial speed-reading claims and laboratory constraints on word identification — cited here as a caution against RSVP-as-training and comprehension-optional drills."
  },
  {
    key: "Roediger2006",
    text: "Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. Psychological Science, 17(3), 249–255."
  },
  {
    key: "Carver1990",
    text: "Carver, R. P. (1990). Reading rate: A review of research and theory. Academic Press. (Rauding vs scanning/skimming; standard-length words.)"
  },
  {
    key: "Carver1977",
    text: "Carver, R. P. (1977 / later work). Toward a theory of reading comprehension and rauding. (Mode-specific rates; RE Index is not used as this app's primary KPI.)"
  }
];

export const sciencePointsEn = [
  "Adult silent reading of nonfiction typically falls near 175–300 words per minute when the task is ordinary comprehension (Brysbaert, 2019). That band is normal, not a failure.",
  "Eye-movement work (Rayner et al., 2016) shows that skilled reading is serial word identification plus integration. Peripheral-span drills, zigzag traces, and 'absorb a page' methods do not bypass that bottleneck.",
  "Klimovich and colleagues (2023) found that speed-reading training can raise measured rate, but metacognitive training — noticing mind-wandering, checking whether you still hold the claim — is the more honest lever for keeping meaning.",
  "RSVP and similar visual hacks can suppress regressions that skilled readers use for repair. This app refuses them as a default training mode.",
  "Retrieval practice (Roediger & Karpicke, 2006) is how we treat comprehension as real: free recall and delayed probes, not a stopwatch alone.",
  "Carver's rauding framework is used here as mode switching: study, normal (rauding), gist-skim, and scan have different success criteria. A high skim rate is not a normal-mode badge.",
  "The Reading Efficiency index (WPM × percent correct) is easy to game and is not the primary number on the dashboard.",
  "Modest gated gains inside the normal band are plausible. Two-to-three times careful comprehension is not a target this gym will set."
];

export const sciencePointsTr = [
  "Yetişkinlerin düz yazıyı sessizce, olağan anlamla okuma hızı çoğu zaman dakikada 175–300 sözcük bandındadır (Brysbaert, 2019). Bu bant normaldir; bir başarısızlık değildir.",
  "Göz hareketi araştırması (Rayner vd., 2016) okumanın seri sözcük tanıma ve tümleştirme olduğunu gösterir. Çevresel tarama, zikzak ve 'sayfayı emmek' bu darboğazı atlatmaz.",
  "Klimovich ve meslektaşları (2023) hız eğitimlerinin ölçülen tempo yükseltebileceğini, ancak anlamı tutmanın daha dürüst yolunun meta-bilişsel kontrol — savı hâlâ taşıyor musun — olduğunu gösterir.",
  "RSVP ve benzeri görsel hileler, ustalaşmış okuyucunun tamir için kullandığı kısa geri dönüşleri baskılayabilir. Bu uygulama onları varsayılan antrenman saymaz.",
  "Geri çağırma pratiği (Roediger ve Karpicke, 2006) anlamın gerçek sayılıp sayılmadığının ölçüsüdür: serbest döküm ve gecikmeli sondalar, yalnız kronometre değil.",
  "Carver'ın rauding çerçevesi burada mod geçişi olarak kullanılır. Yüksek tarama hızı, Normal rozetini açmaz.",
  "RE endeksi (WPM × doğruluk) kolay şişer; panonun birincil sayısı değildir.",
  "Normal bant içinde, kapılı (anlamı ölçülmüş) mütevazı kazançlar mümkündür. Eşit derin anlamla 2–3 kat hız bu salonun hedefi değildir."
];
