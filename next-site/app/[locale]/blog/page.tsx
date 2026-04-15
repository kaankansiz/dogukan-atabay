import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BlogCard } from "@/components/BlogCard";
import { getBlogPosts } from "@/lib/content-locale";
import { getSiteConfig } from "@/lib/site-config";
import { getBaseUrl, buildBreadcrumbSchema, buildWebPageSchema, buildItemListSchema } from "@/lib/schema";
import { localizedUrl, pageAlternates } from "@/lib/locale-path";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";

const POSTS_PER_PAGE = 12;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; category?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { locale: loc } = await params;
  if (!hasLocale(routing.locales, loc)) return {};
  const locale = loc as AppLocale;
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  const site = getSiteConfig(locale);
  const baseUrl = getBaseUrl();
  const titleBase = `${t("title")} | ${site.orgName.split("|")[0]?.trim() ?? site.orgName}`;
  const title = page > 1 ? `${titleBase} — ${page}` : titleBase;
  const description = t("description");
  return {
    title,
    description,
    alternates: pageAlternates("/blog", locale),
    keywords: t.raw("keywords") as string[],
    openGraph: {
      url: localizedUrl("/blog", locale),
      title,
      description,
      images: [{ url: `${baseUrl}/Dogukan-atabay.webp`, width: 800, height: 600, alt: t("title") }],
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale: loc } = await params;
  if (!hasLocale(routing.locales, loc)) notFound();
  const locale = loc as AppLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "BlogPage" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const postsAll = getBlogPosts(locale);
  const CATEGORIES = Array.from(new Set(postsAll.map((p) => p.category))).sort();

  const paramsSp = await searchParams;
  const page = Math.max(1, parseInt(paramsSp.page || "1", 10) || 1);
  const category =
    paramsSp.category && CATEGORIES.includes(paramsSp.category) ? paramsSp.category : null;

  const filtered = category ? postsAll.filter((p) => p.category === category) : [...postsAll];
  const totalPosts = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = filtered.slice(start, start + POSTS_PER_PAGE);

  const description = t("description");
  const breadcrumbItems = [
    { label: tNav("home"), href: "/" as const },
    { label: t("breadcrumb") },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, locale);
  const webPageSchema = buildWebPageSchema({
    name: t("schemaName"),
    description,
    url: localizedUrl("/blog", locale),
    locale,
    breadcrumb: breadcrumbItems,
  });
  const itemListSchema = buildItemListSchema({
    name: t("itemListName"),
    description,
    url: localizedUrl("/blog", locale),
    items: posts.map((p) => ({
      name: p.title,
      url: localizedUrl(`/blog/${p.slug}`, locale),
    })),
  });

  function blogListHref(p: number, cat: string | null) {
    const query: Record<string, string> = {};
    if (cat) query.category = cat;
    if (p > 1) query.page = String(p);
    if (Object.keys(query).length === 0) return "/blog" as const;
    return { pathname: "/blog" as const, query };
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <main className="main-inner">
        <div className="page-hero-banner">
          <Image
            src="/images/blog-banner.jpg"
            alt=""
            fill
            className="page-hero-banner-img"
            sizes="100vw"
            priority
          />
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
        <section className="section blog-section">
          <nav className="blog-categories" aria-label={t("categoriesAria")}>
            <Link href={blogListHref(1, null)} className={`blog-category-pill${!category ? " blog-category-pill--active" : ""}`}>
              {t("allCategories")}
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={blogListHref(1, cat)}
                className={`blog-category-pill${category === cat ? " blog-category-pill--active" : ""}`}
              >
                {cat}
              </Link>
            ))}
          </nav>
          <div className="blog-grid">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} readMore={t("readMore")} />
            ))}
          </div>
          {totalPages > 1 && (
            <nav className="blog-pagination" aria-label={t("paginationAria")}>
              <ul className="blog-pagination-list">
                <li>
                  {currentPage > 1 ? (
                    <Link href={blogListHref(currentPage - 1, category)} className="blog-pagination-link">
                      {t("prevPage")}
                    </Link>
                  ) : (
                    <span className="blog-pagination-link blog-pagination-link--disabled" aria-disabled="true">
                      {t("prevPage")}
                    </span>
                  )}
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <li key={p}>
                    {p === currentPage ? (
                      <span className="blog-pagination-link blog-pagination-link--current" aria-current="page">
                        {p}
                      </span>
                    ) : (
                      <Link href={blogListHref(p, category)} className="blog-pagination-link">
                        {p}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  {currentPage < totalPages ? (
                    <Link href={blogListHref(currentPage + 1, category)} className="blog-pagination-link">
                      {t("nextPage")}
                    </Link>
                  ) : (
                    <span className="blog-pagination-link blog-pagination-link--disabled" aria-disabled="true">
                      {t("nextPage")}
                    </span>
                  )}
                </li>
              </ul>
            </nav>
          )}
        </section>
      </main>
    </>
  );
}
