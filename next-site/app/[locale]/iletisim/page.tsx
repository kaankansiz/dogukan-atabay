import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactForm } from "@/components/ContactForm";
import { SocialMediaBar } from "@/components/SocialMediaBar";
import { getSiteConfig } from "@/lib/site-config";
import { buildBreadcrumbSchema, buildWebPageSchema, getBaseUrl } from "@/lib/schema";
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
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const site = getSiteConfig(locale);
  const baseUrl = getBaseUrl();
  const title = `${t("title")} | ${site.orgName.split("—")[0]?.trim() ?? site.orgName}`;
  const description = t("description");
  return {
    title,
    description,
    alternates: pageAlternates("/iletisim", locale),
    keywords: t.raw("keywords") as string[],
    openGraph: {
      url: localizedUrl("/iletisim", locale),
      title,
      description,
      images: [{ url: `${baseUrl}/Dogukan-atabay.webp`, width: 800, height: 600, alt: t("title") }],
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function IletisimPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  if (!hasLocale(routing.locales, loc)) notFound();
  const locale = loc as AppLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const site = getSiteConfig(locale);

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" as const },
    { label: t("breadcrumb") },
  ];

  const description = t("description");
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, locale);
  const webPageSchema = buildWebPageSchema({
    name: t("schemaName"),
    description,
    url: localizedUrl("/iletisim", locale),
    locale,
    breadcrumb: breadcrumbItems,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <main className="main-inner">
        <div className="page-hero-banner">
          <Image src="/images/iletisim-banner.jpg" alt="" fill className="page-hero-banner-img" sizes="100vw" priority unoptimized />
          <div className="page-hero-banner-overlay" aria-hidden="true" />
          <div className="page-hero-banner-content page-hero-banner-content--with-title">
            <header className="services-section-header services-section-header--on-banner">
              <span className="services-section-label">{t("heroLabel")}</span>
              <h1 className="services-section-title">{t("title")}</h1>
              <p className="services-section-desc">{t("heroDesc")}</p>
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
                <span className="contact-info-badge">{t("contactBadge")}</span>
                <h2 className="contact-info-title">{t("contactInfoTitle")}</h2>
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
                <h2 className="contact-form-title">{t("formTitle")}</h2>
                <p className="contact-form-sub">{t("formSub")}</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
