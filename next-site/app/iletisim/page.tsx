import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactForm } from "@/components/ContactForm";
import { SocialMediaBar } from "@/components/SocialMediaBar";
import { SITE_CONFIG } from "@/lib/content";
import { getBaseUrl, buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/schema";

const baseUrl = getBaseUrl();
const title = "İletişim | Uzm. Dr. Doğukan Atabay";
const description = "Randevu ve iletişim. İmperial Hastanesi Trabzon. Telefon, WhatsApp, adres.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}/iletisim` },
  keywords: ["Doğukan Atabay randevu", "İmperial Hastanesi iletişim", "Trabzon girişimsel radyoloji randevu"],
  openGraph: {
    url: `${baseUrl}/iletisim`,
    title,
    description,
    images: [{ url: `${baseUrl}/Dogukan-atabay.webp`, width: 800, height: 600, alt: "İletişim" }],
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const breadcrumbItems = [{ label: "Anasayfa", href: "/" }, { label: "İletişim" }];

export default function IletisimPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const webPageSchema = buildWebPageSchema({
    name: "İletişim",
    description,
    url: `${baseUrl}/iletisim`,
    breadcrumb: breadcrumbItems,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <main className="main-inner">
        <div className="page-hero-banner">
          <Image
            src="/images/iletisim-banner.jpg"
            alt=""
            fill
            className="page-hero-banner-img"
            sizes="100vw"
            priority
            unoptimized
          />
          <div className="page-hero-banner-overlay" aria-hidden="true" />
          <div className="page-hero-banner-content page-hero-banner-content--with-title">
            <header className="services-section-header services-section-header--on-banner">
              <span className="services-section-label">Bize ulaşın</span>
              <h1 className="services-section-title">İletişim</h1>
              <p className="services-section-desc">Randevu ve bilgi için bize ulaşabilirsiniz.</p>
              <div className="services-section-line" aria-hidden="true" />
            </header>
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        <section className="section contact-section">
          <div className="contact-instagram-cta">
            <SocialMediaBar />
          </div>
          <div className="contact-row">
            <div className="contact-info-col">
              <div className="contact-info-head">
                <span className="contact-info-badge">İletişim</span>
                <h2 className="contact-info-title">Bilgiler &amp; Çalışma saatleri</h2>
                <p className="contact-info-sub">Randevu ve bilgi için bizi arayabilir veya yanındaki formu doldurabilirsiniz.</p>
              </div>
              <ul className="contact-info-list">
                <li className="contact-info-item">
                  <span className="contact-info-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </span>
                  <div className="contact-info-content">
                    <span className="contact-info-label">Telefon</span>
                    <a href={"tel:" + SITE_CONFIG.phone.replace(/\s/g, "")} className="contact-info-value">{SITE_CONFIG.phone}</a>
                  </div>
                </li>
                <li className="contact-info-item">
                  <span className="contact-info-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </span>
                  <div className="contact-info-content">
                    <span className="contact-info-label">E-posta</span>
                    <a href={"mailto:" + SITE_CONFIG.email} className="contact-info-value">{SITE_CONFIG.email}</a>
                  </div>
                </li>
                <li className="contact-info-item">
                  <span className="contact-info-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </span>
                  <div className="contact-info-content">
                    <span className="contact-info-label">Adres</span>
                    <span className="contact-info-value">{SITE_CONFIG.address}</span>
                  </div>
                </li>
                <li className="contact-info-item contact-info-item--hours">
                  <span className="contact-info-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </span>
                  <div className="contact-info-content">
                    <span className="contact-info-label">Çalışma saatleri</span>
                    <span className="contact-info-value contact-info-value--hours">{SITE_CONFIG.hours.split("\n").map((line, i) => <span key={i}>{line}{i < 2 ? <br /> : null}</span>)}</span>
                  </div>
                </li>
              </ul>
              <div className="contact-map-wrap">
                <iframe className="contact-map" src={SITE_CONFIG.mapsEmbed} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Konum: Kemerkaya, İller Sk. 27-29, İmperial Hastanesi – Ortahisar/Trabzon" />
              </div>
            </div>
            <div className="contact-form-col">
              <div className="contact-form-head">
                <span className="contact-form-badge">Randevu</span>
                <h2 className="contact-form-title">Randevu talebi gönderin</h2>
                <p className="contact-form-sub">Formu doldurup gönderin; en kısa sürede size dönüş yapacağız.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
