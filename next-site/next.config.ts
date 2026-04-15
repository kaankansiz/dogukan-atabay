import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const prefixedLocales = ["en", "ar", "ka"] as const;

const legacyTurkishSegmentRedirects = prefixedLocales.flatMap((loc) => [
  { source: `/${loc}/hizmetler`, destination: `/${loc}/services`, permanent: true },
  { source: `/${loc}/hizmetler/:slug`, destination: `/${loc}/services/:slug`, permanent: true },
  { source: `/${loc}/hakkimizda`, destination: `/${loc}/about`, permanent: true },
  { source: `/${loc}/iletisim`, destination: `/${loc}/contact`, permanent: true },
]);

const nextConfig: NextConfig = {
  async redirects() {
    return [...legacyTurkishSegmentRedirects];
  },
};

export default withNextIntl(nextConfig);
