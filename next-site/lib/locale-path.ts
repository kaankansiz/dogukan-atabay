import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { getBaseUrl } from "@/lib/schema";

type PathnameKey =
  | "/"
  | "/hakkimizda"
  | "/hizmetler"
  | "/blog"
  | "/iletisim"
  | { pathname: "/hizmetler/[slug]"; params: { slug: string }; query?: Record<string, string | string[]> }
  | { pathname: "/blog/[slug]"; params: { slug: string }; query?: Record<string, string | string[]> }
  | { pathname: "/blog"; query: Record<string, string | string[]> };

/** Harici path: `tr` için Türkçe segment, diğer dillerde İngilizce (pathnames). */
export function localizedPath(path: string, locale: AppLocale): string {
  const href = parseInternalPath(path);
  return getPathname({ href: href as never, locale });
}

export function localizedUrl(path: string, locale: AppLocale): string {
  return `${getBaseUrl()}${localizedPath(path, locale)}`;
}

export function pageAlternates(path: string, locale: AppLocale): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = localizedUrl(path, loc);
  }
  return {
    canonical: localizedUrl(path, locale),
    languages: { ...languages, "x-default": localizedUrl(path, routing.defaultLocale) },
  };
}

function parseInternalPath(path: string): PathnameKey | string {
  const [rawPath, search] = path.split("?");
  const p = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  const query =
    search && search.length > 0
      ? Object.fromEntries(new URLSearchParams(search).entries())
      : undefined;

  if (p === "/" || p === "") return "/";

  const segments = p.split("/").filter(Boolean);

  if (segments[0] === "hakkimizda" && segments.length === 1) return "/hakkimizda";
  if (segments[0] === "iletisim" && segments.length === 1) return "/iletisim";

  if (segments[0] === "hizmetler") {
    if (segments.length === 1) return "/hizmetler";
    if (segments.length === 2) {
      return {
        pathname: "/hizmetler/[slug]",
        params: { slug: segments[1] },
        ...(query && Object.keys(query).length > 0 ? { query } : {}),
      };
    }
  }

  if (segments[0] === "blog") {
    if (segments.length === 1) {
      if (query && Object.keys(query).length > 0) {
        return { pathname: "/blog", query };
      }
      return "/blog";
    }
    if (segments.length === 2) {
      return {
        pathname: "/blog/[slug]",
        params: { slug: segments[1] },
        ...(query && Object.keys(query).length > 0 ? { query } : {}),
      };
    }
  }

  return p;
}
