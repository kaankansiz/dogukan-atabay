import { createElement } from "react";
import { Link } from "@/i18n/navigation";
import type { Service } from "@/lib/content";
import { getServiceIcon } from "@/components/ServiceIcons";

export function ServiceCard({ service, readMore = "Detaylı bilgi" }: { service: Service; readMore?: string }) {
  return (
    <article className="service-card">
      <div className="service-card-body">
        <div className="service-card-header">
          <span className="service-icon" aria-hidden="true">
            {createElement(getServiceIcon(service.slug))}
          </span>
          <h2 className="service-card-title">{service.title}</h2>
        </div>
        <p>{service.excerpt}</p>
        <Link href={{ pathname: "/hizmetler/[slug]", params: { slug: service.slug } }} className="service-card-link">
          {readMore} <span className="service-link-arrow">→</span>
        </Link>
      </div>
    </article>
  );
}
