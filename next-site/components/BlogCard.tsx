import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/content";

export function BlogCard({ post, hidden, readMore = "Devamını oku" }: { post: BlogPost; hidden?: boolean; readMore?: string }) {
  return (
    <article className={"blog-card" + (hidden ? " blog-card--hidden" : "")}>
      <Link href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }} className="blog-card-image-link">
        <div className="blog-card-image" style={{ backgroundImage: "url('/blog-banner.webp')" }} />
      </Link>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-card-category">{post.category}</span>
          <span className="blog-card-date">{post.date}</span>
          <span className="blog-card-reading">{post.readingTime}</span>
        </div>
        <h2 className="blog-card-title">
          <Link href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}>{post.title}</Link>
        </h2>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <Link href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }} className="blog-card-read-more">{readMore}</Link>
      </div>
    </article>
  );
}
