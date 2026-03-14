"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const REVIEWS = [
  // Eski 10 yorum (önce)
  { author: "Rize'den gelen hastamız", sub: "Ameliyatsız varis tedavisi", text: "Aynı gün hem muayene hem tedavi yapıldı, iki damara lazer uygulandı. Ağrısız ve konforluydu, aynı gün taburcu oldum. Dr. Atabay'a ve ekibine teşekkürler." },
  { author: "Bayburt'tan gelen hasta", sub: "Köpük skleroterapi", text: "Varislerimde pıhtı oluşmuştu. Hem varisleri tedavi ettik hem pıhtının ana damarlara ilerlemesi engellendi. Çok memnunum, herkese tavsiye ederim." },
  { author: "Gümüşhane Şiran", sub: "Lazerle varis tedavisi", text: "Bu kadar kolay olduğunu bilseydim daha önce gelirdim. Bir saat içinde taburcu oldum. Ağrı ve şişlikler kısa sürede geçti." },
  { author: "Artvin'den gelen hasta", sub: "Ameliyatsız varis", text: "Uzaktan geliyordum, aynı gün muayene ve tedavi yapıldı. Sonuçlar mükemmel, varislerim kayboldu. Teşekkürler Dr. Atabay." },
  { author: "Trabzon / Öğretmen", sub: "İki bacak lazer + köpük", text: "Saat 15:00'te muayene için geldim, 17:00'de iki damara lazer tedavisi yapılarak taburcu edildim. Çok profesyonel ve ilgili bir ekip." },
  { author: "Batum'dan gelen hasta", sub: "Lazer tedavisi sonrası", text: "Bir ay önce lazer tedavisi yaptırdım. Kontrolde sonuçlar mükemmeldi, hatıra fotoğrafı çekilerek uğurlandım. Çok teşekkürler." },
  { author: "Lenfödem + varis hastası", sub: "Venöz yetmezlik", text: "İleri derecede lenfödemi ve venöz yetmezliğim vardı. Damar içi lazer tedavisi ile bir saat içinde taburcu oldum. Çok memnunum." },
  { author: "Köpük tedavisi sonrası", sub: "2. ay kontrol", text: "Köpük tedavisi sonrası yeşil varisler tama yakın kapandı. Kahverengi alanların da zamanla kaybolacağı söylendi. Süreç çok iyi gidiyor." },
  { author: "Her iki bacak tedavisi", sub: "1 yıl sonra kontrol", text: "Bir yıl önce her iki bacağa lazer ve köpük tedavisi yaptırdım. Kontrolde her şey yolunda, varisler bitti ağrılar geçti. Kesinlikle tavsiye ederim." },
  { author: "Varis + pıhtı hastası", sub: "Bayburt", text: "Pıhtı oluşan varislerime iki damara lazer yapıldı. Hem pıhtıların ana damara ilerlemesi engellendi hem varisler tedavi edildi. Çok teşekkürler." },
  // Google yorumları (20 adet)
  { author: "b ilkbahar", sub: "Damar içi lazer operasyonu", text: "Yaklaşık 7-8 yıldır yaşadığım varis sorunları, akşamları artan şişler bacak ağrıları ve hissettiğim ağırlık hayat kalitemi çok olumsuz etkiliyordu. Her iki bacağımdan da 1 buçuk ay önce damar içi lazer operasyon geçirdim. Kendimi şu an çok daha iyi hissediyorum." },
  { author: "Üzeyir Birinci", sub: "Rize Pazar'dan", text: "Her şey için teşekkürler sayın Dr. Doğukan Atabay. Rize Pazar'dan selam olsun. Elleriniz dert görmesin. Uzun yıllardır ayağımda varis vardı, gün geçtikçe daha artmaya başlamıştı." },
  { author: "Arzu Yaman", sub: "Sosyal medyadan takip", text: "Ben uzun yıllar varis problemi yaşayan biriydim. Şişkin bacaklar, sürekli ağrıyan ve kramplarla günün kalitesini düşüren bir hayat sürüyordum. Doğukan beyi sosyal medya üzerinden gördüm, paylaşımlarını takip ettim. Ameliyattan korkan biri olarak kendisine başvurdum." },
  { author: "Nuray Caylak", sub: "Yaklaşık 1 saat, konforlu tedavi", text: "Uzun yıllardır devam eden varisle ilgili şikayetlerime çok kısa sürede (yaklaşık 1 saat) ve çok konforlu bir şekilde veda ettim. Güler yüzlü ve mahir doktorum Doğukan hocama ve tatlı ekibine teşekkürlerimi sunuyorum. Herkese tavsiye ediyorum." },
  { author: "Ayşegül Genç", sub: "Kısa sürede acısız tedavi", text: "Doktor bey ve hemşire hanımlar mükemmel bir ekip. Kısa sürede acısız, ağrısız tedavim yapıldı. Bir yıldır takip ediyordum gitmeye tereddüt ediyordum. Çok pişmanım geciktiğim için. Doğukan Bey çok alçakgönüllü, nazik birisi ve işinde oldukça tecrübeli. Hiç tereddüt etmeden gidip tedavi olabilirsiniz." },
  { author: "Sevilay Canbay", sub: "Arhavi'den – Sercan hocanın tavsiyesi", text: "Doğukan hoca ile güzel bir çalışma yaptık. Çok memnun kaldım. Kesinlikle tavsiye ediyorum. Sercan hocanın tavsiyesi üzerine Arhavi'den geldim." },
  { author: "Perihan Sarıgül", sub: "Lazer ve köpük tedavisi", text: "Doğukan bey ve güler yüzlü ekibine çok teşekkür ederim. Varis şikayetimden dolayı uzun zamandır bir tedavi çözümü düşünüyordum. Doğukan bey ile irtibata geçtim. Bacağımda şişlik ve morluklar oluşuyordu. Lazer ve köpük tedavisi yaptırdım." },
  { author: "Sercan Özgen", sub: "Girişimsel radyoloji", text: "Bilgi ve donanımı, son teknoloji sistemleri ve iletişimi ile Karadeniz sahilinin açık ara en iyisi sevgili Doğukan hocamız. Girişimsel radyoloji alanında birçok tanı ve tedavi ile tavsiye edilir." },
  { author: "Didem Sivri", sub: "Tekirdağ Şarköy'den", text: "Tekirdağ Şarköy'den geldim. Dr. Doğukan Atabay'ı iki yıldır Instagram sayfasından takip ediyordum ve gelip tedavi olmaya karar verdim. 30-40 dakikalık lazer ve köpük tedavisi olduktan sonra kısa sürede yürüyebildim." },
  { author: "Songül Sağır", sub: "Panik atak hastası – rahat tedavi", text: "Öncelikle Doğukan hocama çok teşekkür ediyorum. Hastasıyla ilgisi ve diyaloğu çok güzel. Panik atak hastasıyım ama Doğukan hocanın yanında panik atağım bile tutmadı. Herkese tavsiye ederim." },
  { author: "Savaş Ayhan", sub: "Başarılı operasyon", text: "Sayın Dr. Doğukan Atabay'a ve ekibine başarılı operasyonu, ilgisi ve alakalarından dolayı çok teşekkür ediyorum. Uzun yıllar varis ağrıları çekmiştim." },
  { author: "Songül Erdoğan", sub: "Tek seansta lazer ve skleroterapi", text: "Doğukan hocama varis damar tıkanıklığı ve pıhtı şikayeti ile gittim. Yürümekte zorlanıyor, ağrılardan uyuyamıyordum. Tek seansta damar içi lazer ve skleroterapi ile hayat kalitem geri geldi." },
  { author: "Burak Özkan", sub: "Eşiyle birlikte tedavi", text: "Eşimle birlikte Doğukan hocaya gittik. Çok memnun kaldık. İlgi ve alakası bizi memnun etti. Tedavileri yönünden işinin uzmanı." },
  { author: "Deniz Fatma", sub: "Arkadaş tavsiyesi", text: "Doğukan beye bir arkadaşımın tavsiyesi üzerine gittim. Varis ameliyatım sürecindeki tüm ilgi, özeni ve profesyonelliği için teşekkür ediyorum. Ameliyatım çok başarılı geçti ve kendimi çok daha iyi hissediyorum." },
  { author: "Belma Öztürk", sub: "Ameliyatsız kurtuldu", text: "Doğukan hocam size çok teşekkür ederim. Sizin sayenizde varislerimden ameliyat olmadan kurtuldum ve çok güzel bir şekilde iyileşiyorum." },
  { author: "Sibel Alakuş", sub: "Damar içi lazer + köpük", text: "Damar içi lazer ameliyatı hem eşim hem ben olduk. Ayrıca köpük tedavisi yapıldı. İşinin en iyilerinden biri diyebilirim. Güler yüzlü, hastalarıyla çok ilgili bir doktor." },
  { author: "Sema Dereli", sub: "Lazer sonrası şikayetler geçti", text: "Sayın hocam lazer tedavisinden sonra bacaklarımdaki ağrılar, kramplar ve damar iltihabı şikayetlerimden kurtuldum. Bacaklarımdaki ağırlık hissi ve şişlikler kayboldu." },
  { author: "Çiğdem Genç", sub: "Yaklaşık 30 yıl varis – ameliyatsız lazer", text: "Yaklaşık 30 yıl varisle mücadele ettim. Uzun araştırmalarım sonucunda Dr. Doğukan Atabay ile iletişime geçip ameliyatsız lazer tedavisi yaptırdım. İşlemin üzerinden 3 ay geçti ve büyük ölçüde iyileşme oldu." },
  { author: "SFSNGL", sub: "Venöz yetmezlik – her iki bacak", text: "Eşimin mesleği ve genetik sebeplerden dolayı genç yaşta her iki bacağında da venöz yetmezlik oluşmuştu. Akşama doğru artan ağrılar ve kramplar yüzünden hayat kalitesi çok düşmüştü." },
  { author: "Yeliz Türkoğlu", sub: "Lazer ve köpük – güvenle tedavi", text: "Tereddütlerle başladığım tedavim, Doktor Doğukan Bey sayesinde yerini güvene bıraktı. Ağrılarım ve şişliklerim lazer ve köpük tedavisi ile son buldu. Şimdi huzurla kontrollerime devam ediyorum." },
];

export function ReviewSlider() {
  const [current, setCurrent] = useState(0);

  const total = REVIEWS.length;
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total]);

  const show = (i: number) => setCurrent((i + total) % total);

  return (
    <div className="card review-card">
      <div className="card-header">
        <h2>Hastalarımız Ne Diyor?</h2>
        <div className="review-nav-btns">
          <button type="button" className="review-nav-btn review-prev" id="review-prev" aria-label="Önceki yorum" onClick={() => show(current - 1)}>‹</button>
          <span className="review-counter" id="review-counter">{current + 1}/{total}</span>
          <button type="button" className="review-nav-btn review-next" id="review-next" aria-label="Sonraki yorum" onClick={() => show(current + 1)}>›</button>
        </div>
      </div>
      <div className="review-slider" id="review-slider">
        {REVIEWS.map((r, i) => (
          <div key={i} className={"review-item" + (i === current ? " active" : "")}>
            <div className="review-author">
              <div className="avatar-wrap">
                <Image src="/Dogukan-atabay.webp" alt="" className="avatar" width={56} height={56} />
              </div>
              <div className="author-info">
                <h3>{r.author}</h3>
                <p>{r.sub}</p>
              </div>
            </div>
            <p className="review-text">{r.text}</p>
            <div className="rating">★★★★★</div>
          </div>
        ))}
      </div>
    </div>
  );
}
