import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getSiteConfig } from "@/lib/site-config";
import { getBaseUrl, buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/schema";
import { localizedUrl, pageAlternates } from "@/lib/locale-path";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: loc } = await params;
  if (!hasLocale(routing.locales, loc)) return {};
  const locale = loc as AppLocale;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const site = getSiteConfig(locale);
  const baseUrl = getBaseUrl();
  const title = `${t("title")} | ${site.orgName.split("|")[0]?.trim() ?? site.orgName}`;
  const description = t("description");
  return {
    title,
    description,
    alternates: pageAlternates("/hakkimizda", locale),
    keywords: t.raw("keywords") as string[] | undefined,
    openGraph: {
      url: localizedUrl("/hakkimizda", locale),
      title,
      description,
      images: [{ url: `${baseUrl}/Dogukan-atabay.webp`, width: 800, height: 600, alt: t("aboutName") }],
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function HakkimizdaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  if (!hasLocale(routing.locales, loc)) notFound();
  const locale = loc as AppLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const description = t("description");

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" as const },
    { label: t("breadcrumb") },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, locale);
  const webPageSchema = buildWebPageSchema({
    name: t("schemaName"),
    description,
    url: localizedUrl("/hakkimizda", locale),
    locale,
    breadcrumb: breadcrumbItems,
  });

  const deps = [
    t("dep1"),
    t("dep2"),
    t("dep3"),
    t("dep4"),
    t("dep5"),
    t("dep6"),
    t("dep7"),
    t("dep8"),
    t("dep9"),
    t("dep10"),
    t("dep11"),
    t("dep12"),
    t("dep13"),
    t("dep14"),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <main className="main-inner">
        <div className="page-hero-banner">
          <Image
            src="/images/about-banner.jpg"
            alt=""
            fill
            className="page-hero-banner-img"
            sizes="100vw"
            priority
          />
          <div className="page-hero-banner-overlay" aria-hidden="true" />
          <div className="page-hero-banner-content page-hero-banner-content--with-title">
            <header className="services-section-header services-section-header--on-banner">
              <span className="services-section-label">{t("whoLabel")}</span>
              <h1 className="services-section-title">{t("heroTitle")}</h1>
              <p className="services-section-desc">{t("heroDesc")}</p>
              <div className="services-section-line" aria-hidden="true" />
            </header>
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        <section className="section about-section">
          <div className="card about-card">
            <div className="about-photo-col">
              <div className="about-photo">
                <Image
                  src="/Dogukan-atabay.webp"
                  alt={t("aboutName")}
                  className="about-doctor-img"
                  width={280}
                  height={340}
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div className="about-specialty-card">
                  <span className="about-specialty-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /></svg>
                  </span>
                  <span className="about-specialty-text">{t("aboutSpecialty")}</span>
                </div>
              </div>
              <div className="about-photo-details">
                <Link href="/iletisim" className="about-more-card">
                  <span className="about-more-text">{t("aboutCta")}</span>
                  <span className="about-more-arrow" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </Link>
              </div>
            </div>
            <div className="about-content">
              <h1 className="about-name">{t("aboutName")}</h1>
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
        <section className="section hospital-card-section" aria-labelledby="hospital-card-title">
          <div className="card hospital-card">
            <div className="hospital-card-header">
              <span className="hospital-card-label">{t("hospitalLabel")}</span>
              <h2 id="hospital-card-title" className="hospital-card-title">{t("hospitalTitle")}</h2>
              <p className="hospital-card-lead">{t("hospitalLead")}</p>
            </div>
            <div className="hospital-card-grid">
              <div className="hospital-card-block hospital-card-block--contact">
                <h3 className="hospital-card-block-title">{t("addrTitle")}</h3>
                <ul className="hospital-contact-list">
                  <li className="hospital-contact-item">
                    <span className="hospital-contact-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    </span>
                    <div className="hospital-contact-content">
                      <span className="hospital-contact-label">{t("callCenter")}</span>
                      <a href="tel:+904624444461" className="hospital-contact-value hospital-contact-value--link">0462 444 44 61</a>
                    </div>
                  </li>
                  <li className="hospital-contact-item">
                    <span className="hospital-contact-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    </span>
                    <div className="hospital-contact-content">
                      <span className="hospital-contact-label">{t("otherLines")}</span>
                      <div className="hospital-contact-numbers">
                        <a href="tel:+904624556464" className="hospital-contact-value hospital-contact-value--link">0462 455 64 64</a>
                        <a href="tel:+904624556425" className="hospital-contact-value hospital-contact-value--link">0462 455 64 25</a>
                      </div>
                    </div>
                  </li>
                  <li className="hospital-contact-item">
                    <span className="hospital-contact-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    </span>
                    <div className="hospital-contact-content">
                      <span className="hospital-contact-label">{t("emailLabel")}</span>
                      <a href="mailto:info@imperialhastanesi.com" className="hospital-contact-value hospital-contact-value--link">info@imperialhastanesi.com</a>
                    </div>
                  </li>
                  <li className="hospital-contact-item">
                    <span className="hospital-contact-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    </span>
                    <div className="hospital-contact-content">
                      <span className="hospital-contact-label">{t("webLabel")}</span>
                      <a href="https://www.imperialhastanesi.com" target="_blank" rel="noopener noreferrer" className="hospital-contact-value hospital-contact-value--link">imperialhastanesi.com</a>
                    </div>
                  </li>
                </ul>
                <p className="hospital-contact-address">{t("hospitalAddress")}</p>
              </div>
              <div className="hospital-card-block hospital-card-block--features">
                <h3 className="hospital-card-block-title">{t("featuresTitle")}</h3>
                <ul className="hospital-features-list">
                  <li className="hospital-feature-item">
                    <span className="hospital-feature-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83" /></svg>
                    </span>
                    <div className="hospital-feature-content">
                      <span className="hospital-feature-name">{t("feat1Name")}</span>
                      <span className="hospital-feature-desc">{t("feat1Desc")}</span>
                    </div>
                  </li>
                  <li className="hospital-feature-item">
                    <span className="hospital-feature-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    </span>
                    <div className="hospital-feature-content">
                      <span className="hospital-feature-name">{t("feat2Name")}</span>
                      <span className="hospital-feature-desc">{t("feat2Desc")}</span>
                    </div>
                  </li>
                  <li className="hospital-feature-item">
                    <span className="hospital-feature-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    </span>
                    <div className="hospital-feature-content">
                      <span className="hospital-feature-name">{t("feat3Name")}</span>
                      <span className="hospital-feature-desc">{t("feat3Desc")}</span>
                    </div>
                  </li>
                  <li className="hospital-feature-item">
                    <span className="hospital-feature-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                    </span>
                    <div className="hospital-feature-content">
                      <span className="hospital-feature-name">{t("feat4Name")}</span>
                      <span className="hospital-feature-desc">{t("feat4Desc")}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="hospital-card-block hospital-card-block--departments">
                <h3 className="hospital-card-block-title">{t("depsTitle")}</h3>
                <p className="hospital-card-deps-intro">{t("depsIntro")}</p>
                <div className="hospital-departments-tags">
                  {deps.map((label) => (
                    <span key={label} className="hospital-dep-tag">{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
