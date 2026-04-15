import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

/** `href` uses next-intl iç pathnames (ör. `/hizmetler`); `Link` dış URL’yi üretir. */
export type BreadcrumbItem = { label: string; href?: ComponentProps<typeof Link>["href"] };

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="breadcrumb-sep" aria-hidden="true">/</span>}
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
