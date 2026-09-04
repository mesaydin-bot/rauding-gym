import type { Passage } from "../types";
import { estimateDifficulty } from "../lib/metrics";

const now = 1_700_000_100_000;

export const turkishPassages: Passage[] = [
  {
    id: "tr-dikkat",
    title: "İç sesi öldürmek bir antrenman değildir",
    language: "tr",
    source: "sample",
    license: "Rauding Gym için yazılmış özgün eğitim metni (CC0)",
    author: "Rauding Gym",
    genre: "essay",
    headings: ["İç okuma ne işe yarar", "Asıl sızıntı nerede", "Ne çalışılır, ne çalışılmaz"],
    abstract:
      "Hızlı okuma vaatlerinde 'iç sesi yok et' öğüdünün neden dil becerisine zarar verdiğini anlatan deneme.",
    text: `İç okuma ne işe yarar

Birçok kurs, sessiz okumadaki iç sesi düşman ilan eder. Gerekçe tanıdık gelir: kelimeleri zihinde duymak sizi konuşma hızına kilitler; iç sesi kapatırsanız gözleriniz sayfayı tarar ve anlam aynı kalır. Bu hikâye, dilin nasıl işlendiğine dair elimizdeki tabloyla uyuşmaz. Yetişkin bir okuyucu, tanıdık bir sözcüğü gördüğünde ses yolunu tamamen kapatmaz. Fonolojik kod, kısa süreli bellekte cümleyi tutmaya ve benzer sözcükleri ayırmaya yardım eder. İç sesi "yok etmek" çoğu zaman anlamı incelten bir kısayol değil, destek iskelesini sökmektir.

Elbette herkes her cümleyi tiyatro gibi seslendirmez. Akıcı bir okuyucu, tahmin edilebilir kalıplarda daha az ayrıntılı bir iç ses kullanır. Bu, pratikle gelen bir ekonomiidir. Bilinçli olarak "hiç duyma" talimatı ise başka bir şeydir. Zor bir cümlede, yabancı bir adda veya olumsuzlamanın döndüğü bir yerde iç ses çoğu zaman tam da ihtiyacınız olan yavaşlıktır.

Asıl sızıntı nerede

Anlamın kaybolduğu yer genellikle boğaz değil, dikkattir. Paragrafı bitirirsiniz ve savın ne olduğunu söyleyemezsiniz. Gözler sayfada ilerlemiştir; zihin başka bir odaya geçmiştir. Bu kaçışı "daha hızlı tarayarak" çözmek zordur. Daha dürüst bir çalışma, savı hâlâ takip edip etmediğinizi ara sıra sormak ve bölüm sonunda tek cümlelik bir özet yazdırmaktır. Geriye bakmayı yasaklamak bu kaçışı gizler. Kısa, gerekçeli bir dönüş ise tamir olabilir.

Amaç belirsizse her cümle aynı ağırlıkta durur. Yalnızca genel resmi mi istiyorsunuz, yoksa yarın hatırlayacağınız ayrıntıları mı? Bunu baştan kilitlemek, ikinci bir tam okumadan daha ucuzdur. Hız, bu kilidin ardından bir sonuçtur; ürünün kendisi değildir.

Bu ayrımı günlük hayatta da kullanırsınız. Bir fatura tararsınız, bir köşe yazısını rauding temposunda okursunuz, bir yönetmeliği çalışırsınız. Üçü de "okumak"tır; başarı ölçütleri aynı değildir. Tek bir vanity hız sayısı, bu farkı siler. O yüzden bu salon, tarama temposunu Normal rozetine çevirmez.

Ne çalışılır, ne çalışılmaz

Çalışılacak şeyler sadedir: dil bilgisi ve sözcük, moda bilinçli geçiş, dikkatin meta-farkındalığı, ve okuduktan sonra geri çağırma. Çalışılmayacak şeyler de sadedir: sayfayı bir bakışta emmek, çevresel görüşü sihirli bir tarayıcıya çevirmek, iç sesi utanç nesnesi yapmak. Yetişkin bir okuyucu, tanıdık düz yazıda yaklaşık 175–300 sözcük/dakika bandında "rauding" yapar. Bu bandın içinde, kapılı (anlamı ölçülmüş) küçük kazançlar mümkündür. Eşit derin anlamla iki-üç kat hız ise bir hedef değil, bir vaazdır.`,
    questions: [
      {
        id: "tr-dikkat-q1",
        kind: "literal",
        prompt: "Yazara göre fonolojik kod (iç ses) ne işe yarar?",
        options: [
          "Kısa süreli bellekte cümleyi tutmaya ve benzer sözcükleri ayırmaya yardım eder.",
          "Sadece çocukların sesli okuması için vardır.",
          "Anlamı her zaman yavaşlatan bir hatadır.",
          "Yalnızca şiir okurken devreye girer."
        ],
        correctIndex: 0,
        paragraphIndex: 1,
        explanation: "Açılış, iç sesin bellek ve ayırt etme desteği olduğunu söyler."
      },
      {
        id: "tr-dikkat-q2",
        kind: "literal",
        prompt: "Anlamın kaybolduğu asıl yer neresi olarak anlatılır?",
        options: [
          "Dikkat kaçışı: göz ilerler, zihin savı bırakır.",
          "Yalnızca göz kaslarının zayıflığı.",
          "Sayfanın kağıt kalitesi.",
          "Sözlük kullanmamak."
        ],
        correctIndex: 0,
        paragraphIndex: 4,
        explanation: "Orta bölüm, sızıntıyı boğazda değil dikkatte arar."
      },
      {
        id: "tr-dikkat-q3",
        kind: "inferential",
        prompt: "Geriye bakmayı yasaklamak neden kaçışı gizler?",
        options: [
          "Okuyucu anlamadıysa bunu tamir edemez; hız korunur gibi görünür.",
          "Yasak, sözcük dağarcığını otomatik büyütür.",
          "Yasak yalnızca Türkçe metinlerde işe yarar.",
          "Yasak, gece uykusunu düzenler."
        ],
        correctIndex: 0,
        paragraphIndex: 4,
        explanation: "Kısa dönüş tamir olabilir; kilit ise kaybı görünmez kılar."
      },
      {
        id: "tr-dikkat-q4",
        kind: "literal",
        prompt: "Metne göre yetişkin 'rauding' bandı kabaca nedir?",
        options: [
          "Dakikada yaklaşık 175–300 sözcük.",
          "Dakikada 800–1000 sözcük.",
          "Dakikada 50 sözcük.",
          "Ölçülemez."
        ],
        correctIndex: 0,
        paragraphIndex: 8,
        explanation: "Kapanış, Brysbaert bandına yakın bir aralık verir."
      },
      {
        id: "tr-dikkat-q5",
        kind: "inferential",
        prompt: "Hız neden 'ürünün kendisi' olarak görülmez?",
        options: [
          "Hız, amaç ve anlama kapısından sonra gelen bir sonuçtur.",
          "Hız hiç ölçülmemelidir.",
          "Hız yalnızca tarama modunda vardır.",
          "Hız, iç ses yok edilince otomatik ikiye katlanır."
        ],
        correctIndex: 0,
        paragraphIndex: 5,
        explanation: "Amaç kilidi, hızı bir sonuç haline getirir."
      }
    ],
    modelRecall: [
      "İç sesi yok etmek, dilin bellek desteğini sökmek olabilir.",
      "Akıcı okuyucu iç sesi ekonomize eder; zor yerde yavaşlık işe yarar.",
      "Asıl kayıp çoğu zaman dikkat kaçışıdır, boğaz değil.",
      "Amaç (özet / sav / yarınki ayrıntı) ikinci tam okumadan ucuzdur.",
      "Çalışılacaklar: dil, mod, meta-dikkat, geri çağırma — görsel hile değil."
    ],
    difficulty: estimateDifficulty("", "tr"),
    createdAt: now
  },
  {
    id: "tr-isi",
    title: "Kentlerde gece sıcaklığı neden düşmüyor",
    language: "tr",
    source: "sample",
    license: "Rauding Gym için yazılmış özgün eğitim metni (CC0)",
    author: "Rauding Gym",
    genre: "news",
    headings: ["Havaalanı değil, yatak odası", "Minimum neden önemli", "Belediyelerin ikinci sayısı"],
    abstract:
      "Resmi günlük maksimumun, insanların uyuduğu gece ısısını nasıl gizlediğine dair haber tadında metin.",
    text: `Havaalanı değil, yatak odası

Bir kentin akşam bültenindeki sıcaklık çoğu zaman uçaklar veya bölgesel iklim kaydı için seçilmiş bir istasyondan gelir. Cihaz çim üzerindedir, asfalttan uzaktır; hava kütlesini iyi anlatır. Otobüs şeridinin üstündeki dördüncü kat yatak odasını o kadar iyi anlatmaz. Geçen yaz, aynı nehir havzasındaki üç orta ölçekli kentin resmi günlük maksimumları bir derecenin altında ayrıştı. Kiralık dairelerdeki ev içi kayıtlar ise gün batımından sonra 4,6°C'ye varan farklar gösterdi.

Bu bir skandaldan çok bir kategori hatasıdır. Uçak ve tarla için kurulmuş bir ölçü, konut sorusuna cevap vermeye zorlanmıştır. İnsan havaalanında toparlanmaz. Günün ısısını depolayan ve gece yarısından sonra yavaş yavaş bırakan odalarda toparlanır — ya da toparlanamaz.

Minimum neden önemli

Halk sağlığı araştırmacıları daha dar bir iddiayı tekrarlıyor: sıcak dönemlerdeki fazla ölümler, öğleden sonra zirvelerinden çok gece minimumlarıyla birlikte hareket eder. Gövde, çekirdek ısının düşmesine izin veren bir gece varsa sıcak bir öğleden sonrayı tolere edebilir. Minimum birkaç gece boyunca yaklaşık 20°C'nin üstünde kalırsa uyku parçalanır; ertesi gün dikkat ve bellek zayıflar. Bu, konfor kadar iş olgusudur. Yalnızca günlük yükseği yayımlayan bir kent, kâğıt üzerinde ılımlı görünüp sakinlerinde uyku borusu biriktirebilir.

Mahalle biçimi, artakalan ısının çoğunu açıklar. Az ağaçlı, koyu çatılı, dar sokaklı adalar ısıyı tutar. Parklar ve nehir kenarları bırakır. Aynı resmi istasyon ikisini birden temsil edemez. Bu yüzden bazı planlama ofisleri ikinci bir sayı yayımlamaya başladı: okul ve sağlık ocağına konmuş ucuz duyarga ağı, artı tipik yapı türleri için ev içi minimum tahmini.

Ölçüm ağı pahalı bir laboratuvar olmak zorunda değildir. Okul bahçesine asılan ucuz bir duyarga, o mahallede gece ısının nasıl davrandığına dair havaalanından daha fazla şey söyler. Asıl iş, sayıyı bir gösteriş panosuna yazmak değil; serinlemeyen üç-dört adayı isimlendirip oraya ağaç, açık renk çatı ve gece açık kalan bir serinleme yeri kaydırmaktır.

Belediyelerin ikinci sayısı

İlk pratik değişim iletişimdedir. Eskiden tek bir öğleden sonra eşiğinde tetiklenen sıcaklık uyarıları artık bir gece maddesi içeriyor. Modellenen ev içi minimum yüksek kalacaksa serinleme merkezleri daha geç kapanıyor; bazı ulaşım hatları akşam gölge ve su duraklarını uzatıyor. İkinci değişim daha yavaş: çatı kaplama ve sokak ağacı bütçeleri yalnızca öğle fotoğraflarına göre değil, gece rahatlamasına göre puanlanıyor.

Hiçbir kent, daha iyi bir termometrenin odayı soğuttuğunu iddia etmiyor. Sav daha mütevazı ve daha işe yarar: insanların gerçekten uyuduğu ısıyı ölçerseniz, bölgesel bir ortalamayı kutlamayı bırakır, soğumayan adalara harcama kaydırırsınız. Bu yeni bir iklim değil. Eski iklimin daha net bir haritasıdır.`,
    questions: [
      {
        id: "tr-isi-q1",
        kind: "literal",
        prompt: "Resmi kent sıcaklığı çoğu zaman neden ev içi gece ısısını kaçırır?",
        options: [
          "İstasyonlar uçak veya bölgesel kayıt için, çim üzerinde ve konuttan uzakta kurulur.",
          "Ev içi termometre kullanımı yasaktır.",
          "Havaalanları her zaman yatak odasından sıcaktır.",
          "Bültenler yalnızca kış verisi verir."
        ],
        correctIndex: 0,
        paragraphIndex: 1,
        explanation: "Açılış, resmi cihazın hava kütlesini, odayı değil anlattığını söyler."
      },
      {
        id: "tr-isi-q2",
        kind: "literal",
        prompt: "Fazla ölümler hangi ölçüyle daha sıkı birlikte hareket eder?",
        options: [
          "Gece minimumlarıyla, öğleden sonra zirvelerinden çok.",
          "Yalnızca resmi havaalanı yükseğiyle.",
          "Öğle rüzgar hızıyla.",
          "Telefon uygulamalarının sayısıyla."
        ],
        correctIndex: 0,
        paragraphIndex: 4,
        explanation: "Minimum bölümü, sağlık riskini gece soğumasına bağlar."
      },
      {
        id: "tr-isi-q3",
        kind: "inferential",
        prompt: "Bir kent 'kâğıt üzerinde ılımlı' görünüp nasıl uyku borusu biriktirebilir?",
        options: [
          "Tek bir günlük yüksek, hiç soğumayan geceleri gizleyebilir.",
          "İnsanlar sıcakta daha iyi uyur.",
          "Üç kentin resmi yükseği 4,6°C ayrışmıştır.",
          "Serinleme merkezleri soğuk gecelerde kapanır."
        ],
        correctIndex: 0,
        paragraphIndex: 4,
        explanation: "Gece minimumu yüksek kalırsa resmi yüksek sıradan durabilir."
      },
      {
        id: "tr-isi-q4",
        kind: "literal",
        prompt: "Gece-ısı endeksi neden oluşur?",
        options: [
          "Okul ve sağlık ocağı duyargaları ile yapı türüne göre ev içi model.",
          "Yalnızca plaj uydu fotoğrafları.",
          "Tek bir pistin pilot raporları.",
          "Saatlik sosyal medya şikayetleri."
        ],
        correctIndex: 0,
        paragraphIndex: 5,
        explanation: "Planlama ofisleri ucuz ağı bir bina modeliyle birleştirir."
      },
      {
        id: "tr-isi-q5",
        kind: "inferential",
        prompt: "Daha iyi ölçümün mütevazı vaadi nedir?",
        options: [
          "Soğumayan adalara harcamayı kaydıracak daha net bir harita.",
          "Termometrenin odayı kendiliğinden soğutması.",
          "Ağaç bütçesinin yalnızca öğle fotoğrafıyla yargılanması.",
          "Üç kentte ev içi ısının özdeş olması."
        ],
        correctIndex: 0,
        paragraphIndex: 9,
        explanation: "Kapanış: ölçü odayı soğutmaz; ortalamayı kutlamayı bırakır."
      }
    ],
    modelRecall: [
      "Resmi yüksekler çoğu zaman çim istasyonlarından gelir.",
      "Ev içi gece ısısı resmi yüksekten sert sapabilir.",
      "Sağlık riski gece minimumuna bağlıdır; gövde soğuk gece ister.",
      "Mahalle biçimi (ağaç, çatı, sokak) ısıyı tutar veya bırakır.",
      "Politika: uyarılarda gece maddesi; harcamayı gece rahatlamasına göre kaydır."
    ],
    difficulty: estimateDifficulty("", "tr"),
    createdAt: now + 1
  },
  {
    id: "tr-uyku",
    title: "Kısa uykunun ertesi gün hatırlamaya etkisi",
    language: "tr",
    source: "sample",
    license: "Rauding Gym için yazılmış özgün eğitim metni (CC0)",
    author: "Rauding Gym",
    genre: "report",
    headings: ["Çalışmanın özeti", "Yalnızca yorgunluk değil", "Bu ne değildir"],
    abstract:
      "Uyku kısıtının gecikmeli hatırlamayı nasıl zayıflattığını ve kafeinin neden pekiştirme yerine geçmediğini anlatan kısa rapor.",
    text: `Çalışmanın özeti

Bir üniversite uyku laboratuvarı, 22–41 yaş arası 64 yetişkinden iki hafta boyunca sabit uyanma saati istedi. İlk hafta herkes 7,5 saatlik bir pencerede yattı. İkinci hafta rastgele seçilen yarının ışıkların kapanması ileri alındı; yatakta geçen süre 5 saate indi. Her sabah katılımcılar daha önce görmedikleri 500 sözcüklük olgusal bir metin okudu. Aynı gün kısa cevaplı bir sınav aldılar; ertesi gün aynı metni yeniden okumadan gecikmeli teste girdiler.

Anlık puanlar neredeyse yerinde saydı. Kısa uyku grubu aynı gün sorularında yalnızca üç puan gerideydi. Gecikmeli puanlar başka bir hikaye anlattı. Beş kısıtlı gecenin ardından ertesi gün hatırlama, iyi uyuyan kontrollere göre 18 puan düştü. Düşüş, cümleyi neredeyse aynen tekrarlayan maddelerden çok çıkarımsal maddelerde büyüktü. İnsanlar gördükleri bir ifadeyi hâlâ tanıyabiliyordu. Savı yeniden kurmakta zayıftılar.

Yalnızca yorgunluk değil

Katılımcılar her sabah uyanıklıklarını puanladı. Bu puanlar gecikmeli sonuçlarla ancak gevşekçe örtüştü. Kısıtlı uykudaki bazı kişiler "kahveden sonra iyiyim" dedi ve kontrol grubunun koruduğu gece kazancını yine de kaybetti. Laboratuvarın tezi, yorgun insanın okuyamayacağı değildi. Okuduktan sonraki pekiştirmenin biyolojik bir süreç olduğu ve kısa gecenin yeni bir sav yapısını saklamak için kötü bir zaman olduğu idi.

Metinler sözcük listesi değil, sıradan açıklayıcı düz yazıydı. Bu önemlidir. Uyku baskısı altında özete çalışan bir okuyucu başlık düzeyinde bir özet çıkarabilir ve iki paragrafın nasıl bağlandığını soran maddelerde düşebilir. Kısıtlı grupta ikinci gün serbest hatırlama dökümleri daha kısaydı ve neden-sonucu ters çevirmeye daha yatkındı.

Laboratuvar bunu "daha yavaş oku, her şey düzelir" diye satmaz. Uykusuz bir sabahın yavaş okuması da savı kötü saklayabilir. Mesaj daha dardır: eğer yarın kullanacağınız bir yapı okuyorsanız, oturumu yalnızca tempo ile yargılamayın. Ertesi gün o yapıyı bir-iki cümleyle geri çağırıp çağıramadığınız, o sabahki kronometreden daha ağır basar.

Bu ne değildir

Yazarlar iki popüler sıçramayı reddetti. Sekiz saatin ahlaki bir borç olduğunu iddia etmediler; tek bir kısa gecenin kariyeri yıktığını da iddia etmediler. Kafeini de bir anlama teknolojisi gibi görmediler. Kafein öznel uyanıklığı kaldırabilir. Bu desende, tam gecenin gecikmeli çıkarımsal üstünlüğünü geri getirmedi.

Bir okuma pratiği için sonuç moda değildir. Yarın hâlâ bileceğiniz şeyi önemsiyorsanız oturum sayfayı kapattığınızda bitmez. Uyku antrenman planının parçasıdır ve uykusuz bir sabahın yüksek sözcük/dakika sayısı zayıf bir vaattir. Ertesi gün geri çağırma, ilk geçişteki kronometreden daha iyi bir denetimdir.`,
    questions: [
      {
        id: "tr-uyku-q1",
        kind: "literal",
        prompt: "İkinci hafta grubun yarısında uyku nasıl kısıtlandı?",
        options: [
          "Işıkların kapanması ileri alındı; yatakta süre 5 saate indi.",
          "9 saat uyuyup kahveyi kestiler.",
          "Yalnızca hafta sonu uyudular.",
          "Her 20 dakikada sözcük çalışması için uyandırıldılar."
        ],
        correctIndex: 0,
        paragraphIndex: 1,
        explanation: "Desen, rastgele yarıda 5 saatlik yatak süresi kullanır."
      },
      {
        id: "tr-uyku-q2",
        kind: "literal",
        prompt: "Büyük fark hangi testte görüldü?",
        options: [
          "Ertesi gün gecikmeli hatırlama, özellikle çıkarımsal maddelerde.",
          "Yalnızca aynı günkü kısa sınavda.",
          "Yazma hızı testinde.",
          "Sorusuz göz takibi sınavında."
        ],
        correctIndex: 0,
        paragraphIndex: 2,
        explanation: "Anlık puanlar neredeyse aynı kaldı; gecikmeli 18 puan düştü."
      },
      {
        id: "tr-uyku-q3",
        kind: "inferential",
        prompt: "Yazarlar kafeini neden yetersiz bir ikame sayıyor?",
        options: [
          "Uyanıklık hissini kaldırabilir ama gecikmeli çıkarımsal belleği geri getirmez.",
          "Her iki grupta da yasaktı.",
          "Hatırlamayı uykudan daha çok artırdı.",
          "Yalnızca sözcük listelerinde işe yarar."
        ],
        correctIndex: 0,
        paragraphIndex: 8,
        explanation: "Kafein öznel uyanıklığı kaldırır; gece kazancını yerine koymaz."
      },
      {
        id: "tr-uyku-q4",
        kind: "inferential",
        prompt: "Uykusuz bir sabahın yüksek WPM sayısı neyi garanti etmez?",
        options: [
          "Sav yapısının yarın hâlâ elde olacak olmasını.",
          "Sayfanın bitirilebileceğini.",
          "Kahve içildiğini.",
          "Metnin 500 sözcük olduğunu."
        ],
        correctIndex: 0,
        paragraphIndex: 9,
        explanation: "Kapanış, yarınki geri çağırmayı ilk geçiş kronometresinden üstün tutar."
      },
      {
        id: "tr-uyku-q5",
        kind: "literal",
        prompt: "Kısıtlı grupta ikinci gün serbest hatırlama dökümleri nasıldı?",
        options: [
          "Daha kısa ve neden-sonucu ters çevirmeye daha yatkın.",
          "Kontrol grubundan daha ayrıntılı.",
          "Anlık dökümlerle özdeş.",
          "Toplanmadı."
        ],
        correctIndex: 0,
        paragraphIndex: 5,
        explanation: "Serbest hatırlama kısaldı ve nedensellik karıştı."
      }
    ],
    modelRecall: [
      "Desen: 64 yetişkin, sonra yarısında 5 saatlik yatak süresi.",
      "Anlık sınav neredeyse aynı; ertesi gün hatırlama sert düştü.",
      "Çıkarım maddeleri, neredeyse birebir tanımadan daha çok zarar gördü.",
      "'Kahveden sonra iyiyim' pekiştirmeyi geri getirmedi.",
      "Antrenman için: uyku ve gecikmeli geri çağırma, ilk geçiş WPM'den iyi denetimdir."
    ],
    difficulty: estimateDifficulty("", "tr"),
    createdAt: now + 2
  }
];

for (const p of turkishPassages) {
  p.difficulty = estimateDifficulty(p.text, "tr");
}
