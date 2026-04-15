import type { AppLocale } from "@/i18n/routing";
import { BLOG_POSTS, SERVICES, type BlogPost, type Service } from "@/lib/content";
import blogAr from "@/lib/i18n/blog-overrides/ar.json";
import blogEn from "@/lib/i18n/blog-overrides/en.json";
import blogKa from "@/lib/i18n/blog-overrides/ka.json";
import serviceAr from "@/lib/i18n/service-overrides/ar.json";
import serviceEn from "@/lib/i18n/service-overrides/en.json";
import serviceKa from "@/lib/i18n/service-overrides/ka.json";

type ServiceOverride = Partial<Pick<Service, "title" | "excerpt" | "body" | "faq">>;
type BlogOverride = Partial<
  Pick<BlogPost, "title" | "category" | "date" | "readingTime" | "excerpt" | "body" | "imageAlt">
>;

const overrides: Record<AppLocale, Record<string, ServiceOverride> | null> = {
  tr: null,
  en: serviceEn as Record<string, ServiceOverride>,
  ar: serviceAr as Record<string, ServiceOverride>,
  ka: serviceKa as Record<string, ServiceOverride>,
};

const blogOverrides: Record<AppLocale, Record<string, BlogOverride> | null> = {
  tr: null,
  en: blogEn as Record<string, BlogOverride>,
  ar: blogAr as Record<string, BlogOverride>,
  ka: blogKa as Record<string, BlogOverride>,
};

/** Turkish `category` from content — machine translation often confuses homonyms (e.g. Varis → “arrival”). */
const BLOG_CATEGORY_LABEL: Record<Exclude<AppLocale, "tr">, Record<string, string>> = {
  en: {
    Varis: "Varicose veins",
    Tiroid: "Thyroid",
    Radyoloji: "Radiology",
    Tanı: "Diagnostics",
    Ultrason: "Ultrasound",
    Girişimsel: "Interventional",
  },
  ar: {
    Varis: "الدوالي",
    Tiroid: "الغدة الدرقية",
    Radyoloji: "الأشعة",
    Tanı: "التشخيص",
    Ultrason: "الموجات فوق الصوتية",
    Girişimsel: "التدخلي",
  },
  ka: {
    Varis: "ვარიკოზი",
    Tiroid: "ფარისებრი ჯირჯვი",
    Radyoloji: "რადიოლოგია",
    Tanı: "დიაგნოსტიკა",
    Ultrason: "ულტრაბგერა",
    Girişimsel: "ინტერვენციული",
  },
};

function blogCategoryForLocale(trCategory: string, locale: Exclude<AppLocale, "tr">): string {
  return BLOG_CATEGORY_LABEL[locale][trCategory] ?? trCategory;
}

function normalizeEnReadingTime(s: string): string {
  return s
    .replace(/\bmin reading\b/gi, "min read")
    .replace(/\bminutes reading\b/gi, "min read")
    .replace(/\bminute reading\b/gi, "min read");
}

function mergeService(base: Service, patch?: ServiceOverride): Service {
  if (!patch) return base;
  return {
    ...base,
    title: patch.title ?? base.title,
    excerpt: patch.excerpt ?? base.excerpt,
    body: patch.body ?? base.body,
    faq: patch.faq ?? base.faq,
  };
}

function mergeBlogPost(base: BlogPost, patch: BlogOverride | undefined, locale: AppLocale): BlogPost {
  const merged: BlogPost = patch
    ? {
        ...base,
        title: patch.title ?? base.title,
        category: patch.category ?? base.category,
        date: patch.date ?? base.date,
        readingTime: patch.readingTime ?? base.readingTime,
        excerpt: patch.excerpt ?? base.excerpt,
        body: patch.body ?? base.body,
        imageAlt: patch.imageAlt ?? base.imageAlt,
      }
    : base;

  if (locale === "tr") return merged;

  let readingTime = merged.readingTime;
  if (locale === "en") readingTime = normalizeEnReadingTime(readingTime);

  return {
    ...merged,
    readingTime,
    category: blogCategoryForLocale(base.category, locale),
  };
}

export function getServices(locale: AppLocale): Service[] {
  if (locale === "tr") return SERVICES;
  const map = overrides[locale];
  if (!map) return SERVICES;
  return SERVICES.map((s) => mergeService(s, map[s.slug]));
}

export function getServiceBySlug(slug: string, locale: AppLocale): Service | undefined {
  const base = SERVICES.find((s) => s.slug === slug);
  if (!base) return undefined;
  if (locale === "tr") return base;
  const map = overrides[locale];
  if (!map) return base;
  return mergeService(base, map[slug]);
}

export function getBlogPosts(locale: AppLocale): BlogPost[] {
  if (locale === "tr") return BLOG_POSTS;
  const map = blogOverrides[locale];
  if (!map) return BLOG_POSTS;
  return BLOG_POSTS.map((p) => mergeBlogPost(p, map[p.slug], locale));
}

export function getBlogPostBySlug(slug: string, locale: AppLocale): BlogPost | undefined {
  const base = BLOG_POSTS.find((p) => p.slug === slug);
  if (!base) return undefined;
  if (locale === "tr") return base;
  const map = blogOverrides[locale];
  if (!map) return base;
  return mergeBlogPost(base, map[slug], locale);
}
