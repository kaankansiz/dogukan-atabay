/**
 * JSON-LD Structured Data – Google ve yapay zeka platformları (ChatGPT, Perplexity vb.)
 * için veri çıkarımı ve snippet/rich result desteği.
 * https://developers.google.com/search/docs/appearance/structured-data
 */

import type { BreadcrumbItem } from "@/components/Breadcrumb";
import type { AppLocale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/locale-path";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dogukanatabay.com";

export function getBaseUrl() {
  return SITE_URL.replace(/\/$/, "");
}

type FaqItem = { q: string; a: string };

/** Organization + MedicalBusiness – ana sayfa / layout için */
export function buildOrganizationSchema(config: {
  name: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  url: string;
}) {
  const base = getBaseUrl();
  const telephone = config.phone.replace(/\s/g, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: config.name,
        url: config.url || base,
        telephone: `+9${telephone.replace(/^0/, "")}`,
        email: config.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Trabzon",
          addressRegion: "Trabzon",
          streetAddress: "Kemerkaya, İller Sk. 27-29, İmperial Hastanesi",
          addressCountry: "TR",
        },
      },
      {
        "@type": "MedicalBusiness",
        "@id": `${base}/#localbusiness`,
        name: config.name,
        image: `${base}/Dogukan-atabay.webp`,
        url: base,
        telephone: `+9${telephone.replace(/^0/, "")}`,
        email: config.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ortahisar",
          addressRegion: "Trabzon",
          streetAddress: config.address,
          addressCountry: "TR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 41.0027,
          longitude: 39.7312,
        },
        areaServed: {
          "@type": "City",
          name: "Trabzon",
          containedInPlace: { "@type": "AdministrativeArea", name: "Trabzon", addressCountry: "TR" },
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "17:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "08:00",
            closes: "13:00",
          },
        ],
        priceRange: "$$",
        sameAs: [],
      },
    ],
  };
}

/** FAQPage – SSS sayfaları için (Google FAQ snippet + AI bilgi çıkarımı) */
export function buildFAQPageSchema(faq: FaqItem[], name?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
    ...(name ? { name } : {}),
  };
}

/** MedicalProcedure / Service – hizmet detay sayfası */
export function buildServiceSchema(service: {
  title: string;
  excerpt: string;
  slug: string;
  /** Full canonical URL including locale prefix when needed */
  url?: string;
}) {
  const base = getBaseUrl();
  const url = service.url ?? `${base}/hizmetler/${service.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.title,
    description: service.excerpt,
    url,
    procedureType: "Minimally invasive",
  };
}

/** Article – blog yazısı (Google News, AI özetleme) */
export function buildArticleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  image?: string;
  imageAlt?: string;
  category: string;
  /** Full canonical URL including locale prefix when needed */
  pageUrl?: string;
}) {
  const base = getBaseUrl();
  const pageUrl = post.pageUrl ?? `${base}/blog/${post.slug}`;
  const imageUrl = post.image ? `${base}${post.image}` : `${base}/blog-banner.webp`;
  const months: Record<string, string> = {
    Ocak: "01", Şubat: "02", Mart: "03", Nisan: "04", Mayıs: "05", Haziran: "06",
    Temmuz: "07", Ağustos: "08", Eylül: "09", Ekim: "10", Kasım: "11", Aralık: "12",
  };
  const m = post.date.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/);
  const isoDate = m
    ? `${m[3]}-${months[m[2]] || "01"}-${String(parseInt(m[1], 10)).padStart(2, "0")}`
    : new Date().toISOString().slice(0, 10);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: pageUrl,
    image: imageUrl,
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": "Person",
      name: "Uzm. Dr. Doğukan Atabay",
    },
    publisher: {
      "@type": "Organization",
      name: "Uzm. Dr. Doğukan Atabay",
      logo: {
        "@type": "ImageObject",
        url: `${base}/Dogukan-atabay.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };
}

/** BreadcrumbList – sayfa hiyerarşisi (snippet + AI) */
export function buildBreadcrumbSchema(items: BreadcrumbItem[], locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(typeof item.href === "string" ? { item: localizedUrl(item.href, locale) } : {}),
    })),
  };
}

/** WebPage – AEO: statik sayfalar için cevap motoru optimizasyonu */
export function buildWebPageSchema(config: {
  name: string;
  description: string;
  url: string;
  locale: AppLocale;
  breadcrumb?: BreadcrumbItem[];
}) {
  const base = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.name,
    description: config.description,
    url: config.url.startsWith("http") ? config.url : `${base}${config.url}`,
    ...(config.breadcrumb && config.breadcrumb.length > 0
      ? {
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: config.breadcrumb.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.label,
              ...(typeof item.href === "string"
                ? { item: localizedUrl(item.href, config.locale) }
                : {}),
            })),
          },
        }
      : {}),
  };
}

/** ItemList – AEO: liste sayfalarında (hizmetler/blog) cevap motorları için */
export function buildItemListSchema(config: {
  name: string;
  description?: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  const base = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: config.name,
    ...(config.description ? { description: config.description } : {}),
    url: config.url.startsWith("http") ? config.url : `${base}${config.url}`,
    numberOfItems: config.items.length,
    itemListElement: config.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${base}${item.url}`,
    })),
  };
}
