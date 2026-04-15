import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en", "ar", "ka"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/hakkimizda": {
      tr: "/hakkimizda",
      en: "/about",
      ar: "/about",
      ka: "/about",
    },
    "/hizmetler": {
      tr: "/hizmetler",
      en: "/services",
      ar: "/services",
      ka: "/services",
    },
    "/hizmetler/[slug]": {
      tr: "/hizmetler/[slug]",
      en: "/services/[slug]",
      ar: "/services/[slug]",
      ka: "/services/[slug]",
    },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/iletisim": {
      tr: "/iletisim",
      en: "/contact",
      ar: "/contact",
      ka: "/contact",
    },
  },
});

export type AppLocale = (typeof routing.locales)[number];
