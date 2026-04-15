import { notFound } from "next/navigation";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SERVICE_SLUGS } from "@/lib/content";
import { getServiceBySlug, getServices } from "@/lib/content-locale";
import { getSiteConfig } from "@/lib/site-config";
import { buildFAQPageSchema, buildServiceSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";
import { localizedUrl, pageAlternates } from "@/lib/locale-path";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale: loc } = await params;
  if (!hasLocale(routing.locales, loc)) return { title: "Hizmet" };
  const locale = loc as AppLocale;
  const service = getServiceBySlug(slug, locale);
  if (!service) return { title: "Hizmet" };
  const canonical = localizedUrl(`/hizmetler/${slug}`, locale);
  const ogLocale =
    locale === "tr" ? "tr_TR" : locale === "en" ? "en_US" : locale === "ar" ? "ar_SA" : "ka_GE";
  return {
    title: service.title,
    description: service.excerpt,
    alternates: pageAlternates(`/hizmetler/${slug}`, locale),
    openGraph: {
      title: service.title,
      description: service.excerpt,
      url: canonical,
      type: "website",
      locale: ogLocale,
    },
    twitter: { card: "summary_large_image", title: service.title, description: service.excerpt },
    robots: { index: true, follow: true },
  };
}

const SUBHEADING_PREFIXES = [
  "Kimlere uygulanır?",
  "İşlem nasıl yapılır?",
  "Avantajları:",
  "Hangi işlemler yapılır?",
  "Hangi bölgelere uygulanır?",
];

/** SSS için her zaman 8 soru: önce hizmete özel, eksikse genel sorularla tamamlanır. */
const GENERIC_FAQS = [
  { q: "Randevu nasıl alabilirim?", a: "Telefon veya WhatsApp ile bize ulaşabilir, iletişim sayfamızdaki formu doldurabilirsiniz. En kısa sürede size dönüş yapılacaktır." },
  { q: "İşlem ücretleri hakkında bilgi alabilir miyim?", a: "Ücretler işleme ve muayeneye göre değişir. Randevu sırasında veya öncesi telefon ile detaylı bilgi alabilirsiniz." },
  { q: "Sigorta anlaşmalarınız var mı?", a: "Kurumumuzun anlaşmalı olduğu sigortalar ve ödeme seçenekleri hakkında iletişim numaramızdan bilgi alabilirsiniz." },
  { q: "İşlem öncesi hazırlık gerekir mi?", a: "İşleme göre açlık, ilaç kesimi veya başka hazırlıklar gerekebilir. Randevunuzda size özel talimatlar verilecektir." },
  { q: "Sonuçları ne zaman alırım?", a: "İşlem türüne göre sonuç süresi değişir. Patoloji veya rapor süreleri randevu sonrası size bildirilir." },
  { q: "Yanımda refakatçi gerekir mi?", a: "Sedasyon veya genel anestezi uygulanacaksa refakatçi getirmeniz önerilir. Diğer işlemlerde hekiminiz bilgi verecektir." },
  { q: "Çalışma saatleriniz nedir?", a: "Pazartesi–Cuma 08:00–17:00, Cumartesi 08:00–13:00. Randevu alırken güncel saat bilgisi verilir." },
  { q: "Nerede hizmet veriyorsunuz?", a: "Kemerkaya, İller Sk. 27-29, İmperial Hastanesi – Ortahisar/Trabzon adresinde hizmet vermekteyiz." },
];

/** Paragraf "Başlık? Metin" veya "Başlık: Metin" ile başlıyorsa [başlık, metin] döner. */
function splitSubheading(paragraph: string): { heading: string; rest: string } | null {
  const t = paragraph.trim();
  for (const prefix of SUBHEADING_PREFIXES) {
    if (t.startsWith(prefix)) {
      const rest = t.slice(prefix.length).trim();
      return rest ? { heading: prefix, rest } : null;
    }
  }
  if (t.includes("? ") && t.length < 120) {
    const i = t.indexOf("? ");
    const heading = t.slice(0, i + 1).trim();
    const rest = t.slice(i + 1).trim();
    if (rest && heading.length < 50) return { heading, rest };
  }
  return null;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug, locale: loc } = await params;
  if (!hasLocale(routing.locales, loc)) notFound();
  const locale = loc as AppLocale;
  setRequestLocale(locale);
  const service = getServiceBySlug(slug, locale);
  if (!service) notFound();

  const site = getSiteConfig(locale);
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tSvc = await getTranslations({ locale, namespace: "ServicesPage" });
  const tHome = await getTranslations({ locale, namespace: "HomePage" });
  const tDetail = await getTranslations({ locale, namespace: "ServiceDetail" });

  const phoneUrl = "tel:" + site.phone.replace(/\s/g, "");
  const otherServices = getServices(locale).filter((s) => s.slug !== slug);
  const firstContentIndex = service.body.findIndex((p) => !splitSubheading(p));
  const faqList = [...(service.faq || []), ...GENERIC_FAQS].slice(0, 8);

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" as const },
    { label: tSvc("breadcrumb"), href: "/hizmetler" as const },
    { label: service.title },
  ];
  const pageUrl = localizedUrl(`/hizmetler/${slug}`, locale);
  const faqSchema = buildFAQPageSchema(faqList, `${service.title} – ${tDetail("faqTitleSuffix")}`);
  const serviceSchema = buildServiceSchema({
    title: service.title,
    excerpt: service.excerpt,
    slug,
    url: pageUrl,
  });
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, locale);

  return (
    <main className="main-inner">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="page-hero-banner">
        <Image
          src="/images/hizmet-banner.jpg"
          alt=""
          fill
          className="page-hero-banner-img"
          sizes="100vw"
          priority
        />
        <div className="page-hero-banner-overlay" aria-hidden="true" />
        <div className="page-hero-banner-content">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="service-detail-layout">
        <aside className="service-detail-sidebar">
          <div className="service-detail-cta-card">
            <h2 className="service-detail-sidebar-title">{tDetail("sidebarTitle")}</h2>
            <p>{tDetail("sidebarLead")}</p>
            <div className="service-detail-cta-card-links">
              <a href={phoneUrl}>{tDetail("callNow")}</a>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                {tDetail("whatsapp")}
              </a>
            </div>
          </div>
          <nav className="service-detail-other" aria-label={tDetail("otherServicesAria")}>
            <h2 className="service-detail-other-title">{tDetail("otherServices")}</h2>
            <ul className="service-detail-other-list">
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link href={{ pathname: "/hizmetler/[slug]", params: { slug: s.slug } }}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <article className="section page-content service-detail-article">
          <h1>{service.title}</h1>
          {service.excerpt && (
            <p className="service-detail-excerpt">{service.excerpt}</p>
          )}
          <div className="service-detail-body">
            {service.body.map((p, i) => {
              const split = splitSubheading(p);
              if (split) {
                return (
                  <div key={i} className="service-detail-block">
                    <h2 className="service-detail-subheading">{split.heading}</h2>
                    <p>{split.rest}</p>
                  </div>
                );
              }
              const isFirst = firstContentIndex === i;
              return (
                <p key={i} className={isFirst ? "service-detail-lead" : undefined}>
                  {p}
                </p>
              );
            })}
          </div>
        </article>
      </div>
      <section className="service-detail-sss" id="sss" aria-labelledby="sss-title">
        <h2 id="sss-title" className="service-detail-sss-title">
          {tDetail("faqTitle")}
        </h2>
        <div className="service-detail-sss-list">
          {faqList.map((item, i) => (
            <details key={i} className="service-detail-sss-item">
              <summary className="service-detail-sss-q">{item.q}</summary>
              <p className="service-detail-sss-a">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <div className="cta-card">
        <div className="cta-card-inner">
          <h2 className="cta-title">{tHome("ctaTitle")}</h2>
          <p className="cta-desc">{tHome("ctaDesc")}</p>
          <div className="cta-buttons">
            <a href={phoneUrl} className="btn btn-primary cta-btn">
              {tHome("ctaCall")}
            </a>
            <a href={site.whatsapp} className="btn cta-btn cta-btn-outline" target="_blank" rel="noopener noreferrer">
              {tHome("ctaWhatsapp")}
            </a>
          </div>
        </div>
        <div className="cta-card-image" aria-hidden="true">
          <Image src="/Dogukan-atabay.webp" alt="" width={280} height={200} />
        </div>
      </div>
    </main>
  );
}
