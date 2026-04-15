import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Outfit } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { buildOrganizationSchema, getBaseUrl } from "@/lib/schema";
import { getSiteConfig } from "@/lib/site-config";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";

/** Runtime subsets include arabic/georgian; `next/font` Outfit typings lag behind Google Fonts. */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext", "arabic", "georgian"] as ("latin" | "latin-ext")[],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "RootLayout" });
  const baseUrl = getBaseUrl();
  const siteName = t("siteName");
  const defaultDescription = t("defaultDescription");
  const ogLocale =
    locale === "tr" ? "tr_TR" : locale === "en" ? "en_US" : locale === "ar" ? "ar_SA" : "ka_GE";

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? "" : `/${loc}`;
    languages[loc] = `${baseUrl}${prefix}`;
  }

  return {
    metadataBase: new URL(baseUrl),
    applicationName: t("applicationName"),
    icons: { icon: "/favicon.webp" },
    title: {
      default: siteName,
      template: t("titleTemplate"),
    },
    description: defaultDescription,
    keywords: t.raw("keywords") as string[],
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: baseUrl,
      siteName,
      title: siteName,
      description: defaultDescription,
      images: [{ url: `${baseUrl}/Dogukan-atabay.webp`, width: 800, height: 600, alt: t("ogImageAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: defaultDescription,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      languages: {
        ...languages,
        "x-default": baseUrl,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const site = getSiteConfig(locale);
  const baseUrl = getBaseUrl();
  const organizationSchema = buildOrganizationSchema({
    name: site.orgName,
    phone: site.phone,
    email: site.email,
    address: site.address,
    hours: site.hours,
    url: baseUrl,
  });

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PF6D5DB3');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PF6D5DB3"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <div className="page-container">
            <Header />
            {children}
            <Footer locale={locale as AppLocale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
