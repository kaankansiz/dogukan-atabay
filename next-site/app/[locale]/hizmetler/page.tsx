import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ServiceCard } from "@/components/ServiceCard";
import { getServices } from "@/lib/content-locale";
import { getSiteConfig } from "@/lib/site-config";
import { buildBreadcrumbSchema, buildItemListSchema, buildWebPageSchema, getBaseUrl } from "@/lib/schema";
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
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  const site = getSiteConfig(locale);
  const baseUrl = getBaseUrl();
  const title = `${t("title")} | ${site.orgName.split("|")[0]?.trim() ?? site.orgName}`;
  const description = t("description");
  return {
    title,
    description,
    alternates: pageAlternates("/hizmetler", locale),
    keywords: t.raw("keywords") as string[],
    openGraph: {
      url: localizedUrl("/hizmetler", locale),
      title,
      description,
      images: [{ url: `${baseUrl}/Dogukan-atabay.webp`, width: 800, height: 600, alt: site.orgName }],
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function HizmetlerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  if (!hasLocale(routing.locales, loc)) notFound();
  const locale = loc as AppLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  const th = await getTranslations({ locale, namespace: "HomePage" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const services = getServices(locale);

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" as const },
    { label: t("breadcrumb") },
  ];

  const description = t("description");
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, locale);
  const webPageSchema = buildWebPageSchema({
    name: t("schemaName"),
    description,
    url: localizedUrl("/hizmetler", locale),
    locale,
    breadcrumb: breadcrumbItems,
  });
  const itemListSchema = buildItemListSchema({
    name: t("itemListName"),
    description,
    url: localizedUrl("/hizmetler", locale),
    items: services.map((s) => ({ name: s.title, url: localizedUrl(`/hizmetler/${s.slug}`, locale) })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <main className="main-inner">
        <div className="page-hero-banner">
          <Image src="/images/hizmet-banner.jpg" alt="" fill className="page-hero-banner-img" sizes="100vw" priority />
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
        <section className="section services-section" id="hizmetlerimiz">
          <div className="services-grid">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} readMore={t("readMore")} />
            ))}
          </div>
          <div className="cta-card">
            <div className="cta-card-inner">
              <h2 className="cta-title">{th("ctaTitle")}</h2>
              <p className="cta-desc">{th("ctaDesc")}</p>
              <div className="cta-buttons">
                <a href="tel:+905339483076" className="btn btn-primary cta-btn">
                  {th("ctaCall")}
                </a>
                <a href="https://wa.me/905339483076" className="btn cta-btn cta-btn-outline" target="_blank" rel="noopener noreferrer">
                  {th("ctaWhatsapp")}
                </a>
              </div>
            </div>
            <div className="cta-card-image" aria-hidden="true">
              <Image src="/Dogukan-atabay.webp" alt="" width={280} height={200} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
