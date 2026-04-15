import { MetadataRoute } from "next";
import { SERVICE_SLUGS, BLOG_SLUGS } from "@/lib/content";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/locale-path";

const STATIC_PATHS = ["/", "/hakkimizda", "/hizmetler", "/blog", "/iletisim"];

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const locale of routing.locales) {
    const loc = locale as AppLocale;

    for (const path of STATIC_PATHS) {
      out.push({
        url: localizedUrl(path, loc),
        lastModified,
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : 0.8,
      });
    }

    for (const slug of SERVICE_SLUGS) {
      out.push({
        url: localizedUrl(`/hizmetler/${slug}`, loc),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    for (const slug of BLOG_SLUGS) {
      out.push({
        url: localizedUrl(`/blog/${slug}`, loc),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return out;
}
