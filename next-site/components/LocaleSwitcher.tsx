"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

const LOCALES: AppLocale[] = [...routing.locales];

/** Unicode regional-flag sequences (emoji). */
const LOCALE_FLAG: Record<AppLocale, string> = {
  tr: "\u{1F1F9}\u{1F1F7}",
  en: "\u{1F1EC}\u{1F1E7}",
  ar: "\u{1F1F8}\u{1F1E6}",
  ka: "\u{1F1EC}\u{1F1EA}",
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={"locale-switcher-chevron" + (open ? " locale-switcher-chevron--open" : "")}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="locale-switcher-globe" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M3 12h18M12 3c2.5 3.2 2.5 14.8 0 18M12 3c-2.5 3.2-2.5 14.8 0 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const PANEL_W = 188;

function switchTargetHref(
  pathname: ReturnType<typeof usePathname>,
  routeParams: ReturnType<typeof useParams>,
) {
  if (pathname === "/hizmetler/[slug]" && typeof routeParams.slug === "string") {
    return { pathname: "/hizmetler/[slug]" as const, params: { slug: routeParams.slug } };
  }
  if (pathname === "/blog/[slug]" && typeof routeParams.slug === "string") {
    return { pathname: "/blog/[slug]" as const, params: { slug: routeParams.slug } };
  }
  return pathname;
}

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const routeParams = useParams();
  const baseSwitchHref = useMemo(() => switchTargetHref(pathname, routeParams), [pathname, routeParams]);
  const [open, setOpen] = useState(false);
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const canUseDom = typeof document !== "undefined";

  const close = useCallback(() => setOpen(false), []);

  const pick = useCallback(
    (next: AppLocale) => {
      let href: typeof baseSwitchHref | { pathname: "/blog"; query: Record<string, string> } = baseSwitchHref;
      if (pathname === "/blog" && typeof window !== "undefined") {
        const q = Object.fromEntries(new URLSearchParams(window.location.search).entries());
        if (Object.keys(q).length > 0) {
          href = { pathname: "/blog", query: q };
        }
      }
      router.replace(href as Parameters<typeof router.replace>[0], { locale: next });
      close();
      triggerRef.current?.focus();
    },
    [router, pathname, baseSwitchHref, close],
  );

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const node = e.target as Node;
      if (rootRef.current?.contains(node) || menuRef.current?.contains(node)) return;
      close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const updatePanelPosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let left = r.right - PANEL_W;
    const pad = 10;
    if (left < pad) left = pad;
    if (left + PANEL_W > window.innerWidth - pad) left = window.innerWidth - PANEL_W - pad;
    setPanelPos({ top: r.bottom + 8, left });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePanelPosition();
    const onScrollOrResize = () => updatePanelPosition();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, updatePanelPosition]);

  const panel = open && canUseDom && (
    <div
      ref={menuRef}
      id={listId}
      className="locale-switcher-panel locale-switcher-panel--portal"
      style={{ position: "fixed", top: panelPos.top, left: panelPos.left, width: PANEL_W, zIndex: 200 }}
      role="listbox"
      aria-label={t("label")}
    >
      {LOCALES.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            role="option"
            aria-selected={active}
            className={"locale-switcher-option" + (active ? " locale-switcher-option--active" : "")}
            onClick={() => pick(loc)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                (e.currentTarget.nextElementSibling as HTMLButtonElement | null)?.focus();
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                (e.currentTarget.previousElementSibling as HTMLButtonElement | null)?.focus();
              }
            }}
          >
            <span className="locale-switcher-option-badge" aria-hidden>
              {LOCALE_FLAG[loc]}
            </span>
            <span className="locale-switcher-option-label">{t(loc)}</span>
            {active && (
              <span className="locale-switcher-check" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="locale-switcher" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="locale-switcher-trigger"
        aria-label={t("label")}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <GlobeIcon />
        <span className="locale-switcher-flag" aria-hidden title={locale.toUpperCase()}>
          {LOCALE_FLAG[locale]}
        </span>
        <Chevron open={open} />
      </button>

      {panel && createPortal(panel, document.body)}
    </div>
  );
}
