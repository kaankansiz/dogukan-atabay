import { notFound } from "next/navigation";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BLOG_SLUGS } from "@/lib/content";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content-locale";
import { getSiteConfig } from "@/lib/site-config";
import { buildFAQPageSchema, buildArticleSchema, buildBreadcrumbSchema, getBaseUrl } from "@/lib/schema";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";
import { localizedUrl, pageAlternates } from "@/lib/locale-path";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => BLOG_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale: loc } = await params;
  if (!hasLocale(routing.locales, loc)) return { title: "Blog" };
  const locale = loc as AppLocale;
  const post = getBlogPostBySlug(slug, locale);
  if (!post) return { title: "Blog" };
  const baseUrl = getBaseUrl();
  const canonical = localizedUrl(`/blog/${slug}`, locale);
  const imageUrl = post.image ? `${baseUrl}${post.image}` : `${baseUrl}/blog-banner.webp`;
  const ogLocale =
    locale === "tr" ? "tr_TR" : locale === "en" ? "en_US" : locale === "ar" ? "ar_SA" : "ka_GE";
  return {
    title: post.title,
    description: post.excerpt,
    alternates: pageAlternates(`/blog/${slug}`, locale),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      type: "article",
      locale: ogLocale,
      publishedTime: post.date,
      images: [{ url: imageUrl, width: 720, height: 405, alt: post.imageAlt || post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
    robots: { index: true, follow: true },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug, locale: loc } = await params;
  if (!hasLocale(routing.locales, loc)) notFound();
  const locale = loc as AppLocale;
  setRequestLocale(locale);
  const post = getBlogPostBySlug(slug, locale);
  if (!post) notFound();

  const site = getSiteConfig(locale);
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tBlog = await getTranslations({ locale, namespace: "BlogPage" });
  const tHome = await getTranslations({ locale, namespace: "HomePage" });
  const tDetail = await getTranslations({ locale, namespace: "BlogDetail" });

  const blogFaqs = [
    { q: tDetail("faq0q"), a: tDetail("faq0a") },
    { q: tDetail("faq1q"), a: tDetail("faq1a") },
    { q: tDetail("faq2q"), a: tDetail("faq2a") },
    { q: tDetail("faq3q"), a: tDetail("faq3a") },
    { q: tDetail("faq4q"), a: tDetail("faq4a") },
    { q: tDetail("faq5q"), a: tDetail("faq5a") },
    { q: tDetail("faq6q"), a: tDetail("faq6a") },
    { q: tDetail("faq7q"), a: tDetail("faq7a") },
  ];

  const phoneUrl = "tel:" + site.phone.replace(/\s/g, "");
  const allPosts = getBlogPosts(locale);
  const rest = allPosts.filter((p) => p.slug !== slug);
  const sameCategory = rest.filter((p) => p.category === post.category);
  const otherCategory = rest.filter((p) => p.category !== post.category);
  const otherPosts = [...sameCategory, ...otherCategory].slice(0, 5);

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" as const },
    { label: tBlog("breadcrumb"), href: "/blog" as const },
    { label: post.title },
  ];
  const pageUrl = localizedUrl(`/blog/${slug}`, locale);
  const faqSchema = buildFAQPageSchema(blogFaqs, `${post.title} – ${tDetail("faqTitleSuffix")}`);
  const articleSchema = buildArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    date: post.date,
    image: post.image,
    imageAlt: post.imageAlt,
    category: post.category,
    pageUrl,
  });
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems, locale);

  return (
    <main className="main-inner">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
          <nav className="service-detail-other" aria-label={tDetail("otherPostsAria")}>
            <h2 className="service-detail-other-title">{tDetail("otherPosts")}</h2>
            <ul className="service-detail-other-list">
              {otherPosts.map((p) => (
                <li key={p.slug}>
                  <Link href={{ pathname: "/blog/[slug]", params: { slug: p.slug } }}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <article className="section page-content service-detail-article blog-detail">
          <div className="blog-detail-meta">
            <span className="blog-card-category">{post.category}</span>
            <time dateTime={post.date}>{post.date}</time>
            <span className="blog-card-reading">{post.readingTime}</span>
          </div>
          <h1>{post.title}</h1>
          <div className="blog-detail-hero">
            <Image
              src={post.image || "/blog-banner.webp"}
              alt={post.imageAlt || post.title}
              width={720}
              height={405}
              className="blog-detail-hero-img"
              sizes="(max-width: 900px) 100vw, 720px"
            />
          </div>
          <Breadcrumb items={breadcrumbItems} />
          {post.excerpt && (
            <p className="service-detail-excerpt">{post.excerpt}</p>
          )}
          <div className="service-detail-body">
            {post.body.map((p, i) => (
              <p key={i} className={i === 0 ? "service-detail-lead" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </article>
      </div>
      <section className="service-detail-sss" id="sss" aria-labelledby="sss-title">
        <h2 id="sss-title" className="service-detail-sss-title">
          {tBlog("faqTitle")}
        </h2>
        <div className="service-detail-sss-list">
          {blogFaqs.map((item, i) => (
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
