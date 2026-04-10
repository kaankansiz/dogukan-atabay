import Link from "next/link";
import Image from "next/image";
import { HeroSlider } from "@/components/HeroSlider";
import { ReviewSlider } from "@/components/ReviewSlider";
import { SocialMediaBar } from "@/components/SocialMediaBar";
import { ServiceCard } from "@/components/ServiceCard";
import { BlogCard } from "@/components/BlogCard";
import { ContactForm } from "@/components/ContactForm";
import { SERVICES, BLOG_POSTS } from "@/lib/content";

const MAPS_EMBED = "https://maps.google.com/maps?q=Kemerkaya,+%C4%B0ller+Sk.+27-29,+%C4%B0mperial+Hastanesi,+Ortahisar,+Trabzon&output=embed";

export default function HomePage() {
  return (
    <>
      <main className="main-grid" id="anasayfa">
        <HeroSlider />
        <div className="right-col">
          <ReviewSlider />
          <div className="card feature-card">
            <div className="feature-content">
              <div className="card-header">
                <h2>Nasıl İlerliyoruz?</h2>
                <div className="arrow-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
              <p>Muayene ve renkli Doppler ultrason ile değerlendirme sonrası size uygun tedavi yöntemi belirlenir. Lazer, köpük veya radyofrekans ile ameliyatsız, aynı gün taburcu olabileceğiniz işlemler uygulanır.</p>
            </div>
            <div className="feature-image" style={{ backgroundImage: "url('/images/laptop_medical.png'), url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80')" }} />
          </div>
          <div className="hero-instagram-cta">
            <SocialMediaBar />
          </div>
        </div>
      </main>

      <section className="section about-section" id="hakkimizda">
        <div className="card about-card">
          <div className="about-photo-col">
            <div className="about-photo">
              <Image src="/Dogukan-atabay.webp" alt="Uzm. Dr. Doğukan Atabay" className="about-doctor-img" width={260} height={320} style={{ objectFit: "cover", objectPosition: "top center" }} />
              <div className="about-specialty-card">
                <span className="about-specialty-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /></svg>
                </span>
                <span className="about-specialty-text">Girişimsel Radyoloji</span>
              </div>
            </div>
            <Link href="/hakkimizda" className="about-more-card">
              <span className="about-more-text">Detaylı bilgi</span>
              <span className="about-more-arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </Link>
          </div>
          <div className="about-content">
            <h2 className="about-name">Uzm. Dr. Doğukan Atabay</h2>
            <p className="about-subtitle">Girişimsel Radyoloji Uzmanı</p>
            <p>1985 yılında Iğdır&apos;da dünyaya geldim. İlköğretim ve lise eğitimimi Iğdır&apos;da tamamladım. 2003 yılında Atatürk Üniversitesi Tıp Fakültesi&apos;nde başladığım lisans eğitimimden 2009 yılında Tıp Hekimi olarak mezun oldum. 2010-2015 yılları arasında Karadeniz Teknik Üniversitesi Tıp Fakültesi Radyoloji A.D.&apos;da Radyoloji ihtisasımı yaptım. Tez döneminde Endovasküler yolla Tedavi Edilmiş serebral Anevrizmaların orta uzun dönem takip sonuçlarını araştırdım.</p>
            <p>Devlet hizmet yükümlülüğümü Trabzon Kanuni Eğitim ve Araştırma Hastanesinde 2015-2020 yılları arasında uzman hekim olarak tamamladım. İhtisasım sırasında temel ve ileri girişimsel radyoloji kurslarını başarıyla tamamlayıp girişimsel radyoloji diplomasını aldım. Hem ihtisasım hem de zorunlu hizmetimi yaptığım Kanuni Eğitim ve Araştırma Hastanesi&apos;nde girişimsel radyolojik işlemlere ağırlık vererek çalışmalarımı sürdürdüm.</p>
            <p>Türk Tabipler Birliği, Türk Radyoloji Derneği ve Türk Girişimsel Radyoloji Derneği&apos;ne üyeyim.</p>
            <div className="about-badges">
              <span className="badge">Trabzon Tabip Odası</span>
              <span className="badge">Türk Radyoloji Derneği</span>
              <span className="badge">Türk Girişimsel Radyoloji Derneği</span>
              <span className="badge badge-lang">İngilizce</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section" id="hizmetlerimiz">
        <header className="services-section-header">
          <span className="services-section-label">Ne Sunuyoruz</span>
          <h2 className="services-section-title">Hizmetlerimiz</h2>
          <p className="services-section-desc">Girişimsel radyoloji, varis tedavisi ve tanı işlemlerinde uzman kadromuzla yanınızdayız.</p>
          <div className="services-section-line" aria-hidden="true" />
        </header>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <div className="cta-card">
          <div className="cta-card-inner">
            <h2 className="cta-title">Randevu almak veya aklınıza takılanları sormak ister misiniz?</h2>
            <p className="cta-desc">Varis, girişimsel radyoloji ve tanı işlemleriyle ilgili sorularınız için buradayız.</p>
            <div className="cta-buttons">
              <a href="tel:+905339483076" className="btn btn-primary cta-btn">Hemen ara</a>
              <a href="https://wa.me/905339483076" className="btn cta-btn cta-btn-outline" target="_blank" rel="noopener noreferrer">WhatsApp ile yaz</a>
            </div>
          </div>
          <div className="cta-card-image" aria-hidden="true">
            <Image src="/Dogukan-atabay.webp" alt="" width={280} height={200} />
          </div>
        </div>
      </section>

      <section className="section blog-section" id="blog">
        <header className="services-section-header">
          <span className="services-section-label">Yazılar</span>
          <h2 className="services-section-title">Blog</h2>
          <p className="services-section-desc">Varis, girişimsel radyoloji ve sağlık üzerine güncel yazılar.</p>
          <div className="services-section-line" aria-hidden="true" />
        </header>
        <div className="blog-grid">
          {BLOG_POSTS.slice(0, 6).map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
        <div className="blog-footer">
          <Link href="/blog" className="blog-all-posts-link">Tüm yazıları görüntüle <span className="blog-all-posts-arrow" aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="section contact-section" id="iletisim-alani">
        <header className="services-section-header">
          <span className="services-section-label">Bize ulaşın</span>
          <h2 className="services-section-title">İletişim</h2>
          <p className="services-section-desc">Randevu ve bilgi için bize ulaşabilirsiniz.</p>
          <div className="services-section-line" aria-hidden="true" />
        </header>
        <div className="contact-instagram-cta">
          <SocialMediaBar />
        </div>
        <div className="contact-row">
          <div className="contact-info-col">
            <div className="contact-info-head">
              <span className="contact-info-badge">İletişim</span>
              <h3 className="contact-info-title">Bilgiler &amp; Çalışma saatleri</h3>
              <p className="contact-info-sub">Randevu ve bilgi için bizi arayabilir veya yanındaki formu doldurabilirsiniz.</p>
            </div>
            <ul className="contact-info-list">
              <li className="contact-info-item">
                <span className="contact-info-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </span>
                <div className="contact-info-content">
                  <span className="contact-info-label">Telefon</span>
                  <a href="tel:+905339483076" className="contact-info-value">0533 948 30 76</a>
                </div>
              </li>
              <li className="contact-info-item">
                <span className="contact-info-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </span>
                <div className="contact-info-content">
                  <span className="contact-info-label">E-posta</span>
                  <a href="mailto:info@dogukanatabay.com" className="contact-info-value">info@dogukanatabay.com</a>
                </div>
              </li>
              <li className="contact-info-item">
                <span className="contact-info-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </span>
                <div className="contact-info-content">
                  <span className="contact-info-label">Adres</span>
                  <span className="contact-info-value">Kemerkaya, İller Sk. 27-29, İmperial Hastanesi – Ortahisar/Trabzon</span>
                </div>
              </li>
              <li className="contact-info-item contact-info-item--hours">
                <span className="contact-info-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </span>
                <div className="contact-info-content">
                  <span className="contact-info-label">Çalışma saatleri</span>
                  <span className="contact-info-value contact-info-value--hours">Pazartesi – Cuma: 08:00 – 17:00<br />Cumartesi: 08:00 – 13:00<br />Pazar: Kapalı</span>
                </div>
              </li>
            </ul>
            <div className="contact-map-wrap">
              <iframe className="contact-map" src={MAPS_EMBED} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Konum: Kemerkaya, İller Sk. 27-29, İmperial Hastanesi – Ortahisar/Trabzon" />
            </div>
          </div>
          <div className="contact-form-col">
            <div className="contact-form-head">
              <span className="contact-form-badge">Randevu</span>
              <h3 className="contact-form-title">Randevu talebi gönderin</h3>
              <p className="contact-form-sub">Formu doldurup gönderin; en kısa sürede size dönüş yapacağız.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
