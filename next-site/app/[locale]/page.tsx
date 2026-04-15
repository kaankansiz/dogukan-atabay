import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSlider } from "@/components/HeroSlider";
import { ReviewSlider } from "@/components/ReviewSlider";
import { SocialMediaBar } from "@/components/SocialMediaBar";
import { ServiceCard } from "@/components/ServiceCard";
import { BlogCard } from "@/components/BlogCard";
import { ContactForm } from "@/components/ContactForm";
import { getBlogPosts, getServices } from "@/lib/content-locale";
import { getSiteConfig } from "@/lib/site-config";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  if (!hasLocale(routing.locales, loc)) notFound();
  const locale = loc as AppLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "HomePage" });
  const ts = await getTranslations({ locale, namespace: "ServicesPage" });
  const tb = await getTranslations({ locale, namespace: "BlogPage" });
  const site = getSiteConfig(locale);
  const services = getServices(locale);
  const posts = getBlogPosts(locale).slice(0, 6);

  return (
    <>
      <main className="main-grid" id="anasayfa">
        <HeroSlider />
        <div className="right-col">
          <ReviewSlider />
          <div className="card feature-card">
            <div className="feature-content">
              <div className="card-header">
                <h2>{t("howTitle")}</h2>
                <div className="arrow-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
              <p>{t("howBody")}</p>
            </div>
            <div
              className="feature-image"
              style={{
                backgroundImage:
                  "url('/images/laptop_medical.png'), url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80')",
              }}
            />
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
              <Image
                src="/Dogukan-atabay.webp"
                alt={site.orgName}
                className="about-doctor-img"
                width={260}
                height={320}
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
              <div className="about-specialty-card">
                <span className="about-specialty-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
                <span className="about-specialty-text">{t("aboutSpecialty")}</span>
              </div>
            </div>
            <Link href="/hakkimizda" className="about-more-card">
              <span className="about-more-text">{t("aboutMore")}</span>
              <span className="about-more-arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
          <div className="about-content">
            <h2 className="about-name">{t("aboutName")}</h2>
            <p className="about-subtitle">{t("aboutSubtitle")}</p>
            <p>{t("aboutP1")}</p>
            <p>{t("aboutP2")}</p>
            <p>{t("aboutP3")}</p>
            <div className="about-badges">
              <span className="badge">{t("badge1")}</span>
              <span className="badge">{t("badge2")}</span>
              <span className="badge">{t("badge3")}</span>
              <span className="badge badge-lang">{t("badgeLang")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section" id="hizmetlerimiz">
        <header className="services-section-header">
          <span className="services-section-label">{t("servicesLabel")}</span>
          <h2 className="services-section-title">{t("servicesTitle")}</h2>
          <p className="services-section-desc">{t("servicesDesc")}</p>
          <div className="services-section-line" aria-hidden="true" />
        </header>
        <div className="services-grid">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} readMore={ts("readMore")} />
          ))}
        </div>
        <div className="cta-card">
          <div className="cta-card-inner">
            <h2 className="cta-title">{t("ctaTitle")}</h2>
            <p className="cta-desc">{t("ctaDesc")}</p>
            <div className="cta-buttons">
              <a href="tel:+905339483076" className="btn btn-primary cta-btn">
                {t("ctaCall")}
              </a>
              <a href="https://wa.me/905339483076" className="btn cta-btn cta-btn-outline" target="_blank" rel="noopener noreferrer">
                {t("ctaWhatsapp")}
              </a>
            </div>
          </div>
          <div className="cta-card-image" aria-hidden="true">
            <Image src="/Dogukan-atabay.webp" alt="" width={280} height={200} />
          </div>
        </div>
      </section>

      <section className="section blog-section" id="blog">
        <header className="services-section-header">
          <span className="services-section-label">{t("blogLabel")}</span>
          <h2 className="services-section-title">{t("blogTitle")}</h2>
          <p className="services-section-desc">{t("blogDesc")}</p>
          <div className="services-section-line" aria-hidden="true" />
        </header>
        <div className="blog-grid">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} readMore={tb("readMore")} />
          ))}
        </div>
        <div className="blog-footer">
          <Link href="/blog" className="blog-all-posts-link">
            {t("blogAll")} <span className="blog-all-posts-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="section contact-section" id="iletisim-alani">
        <header className="services-section-header">
          <span className="services-section-label">{t("contactLabel")}</span>
          <h2 className="services-section-title">{t("contactTitle")}</h2>
          <p className="services-section-desc">{t("contactDesc")}</p>
          <div className="services-section-line" aria-hidden="true" />
        </header>
        <div className="contact-instagram-cta">
          <SocialMediaBar />
        </div>
        <div className="contact-row">
          <div className="contact-info-col">
            <div className="contact-info-head">
              <span className="contact-info-badge">{t("contactBadge")}</span>
              <h3 className="contact-info-title">{t("contactInfoTitle")}</h3>
              <p className="contact-info-sub">{t("contactInfoSub")}</p>
            </div>
            <ul className="contact-info-list">
              <li className="contact-info-item">
                <span className="contact-info-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </span>
                <div className="contact-info-content">
                  <span className="contact-info-label">{t("phoneLabel")}</span>
                  <a href={`tel:+90${site.phone.replace(/\D/g, "").slice(1)}`} className="contact-info-value">
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="contact-info-item">
                <span className="contact-info-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </span>
                <div className="contact-info-content">
                  <span className="contact-info-label">{t("emailLabel")}</span>
                  <a href={`mailto:${site.email}`} className="contact-info-value">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="contact-info-item">
                <span className="contact-info-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </span>
                <div className="contact-info-content">
                  <span className="contact-info-label">{t("addressLabel")}</span>
                  <span className="contact-info-value">{site.address}</span>
                </div>
              </li>
              <li className="contact-info-item contact-info-item--hours">
                <span className="contact-info-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </span>
                <div className="contact-info-content">
                  <span className="contact-info-label">{t("hoursLabel")}</span>
                  <span className="contact-info-value contact-info-value--hours" dangerouslySetInnerHTML={{ __html: site.hours.replace(/\n/g, "<br />") }} />
                </div>
              </li>
            </ul>
            <div className="contact-map-wrap">
              <iframe
                className="contact-map"
                src={site.mapsEmbed}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("mapTitle")}
              />
            </div>
          </div>
          <div className="contact-form-col">
            <div className="contact-form-head">
              <span className="contact-form-badge">{t("formBadge")}</span>
              <h3 className="contact-form-title">{t("formTitle")}</h3>
              <p className="contact-form-sub">{t("formSub")}</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
