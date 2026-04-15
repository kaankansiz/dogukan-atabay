"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { SITE_CONFIG } from "@/lib/content";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export function Header() {
  const t = useTranslations("Nav");
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="logo-tab-container">
        <Link href="/" className="logo-tab" aria-label={t("homeAria")} onClick={closeMenu}>
          <Image
            src="/D-atabay-logo-laci-1.webp"
            alt="Dr. Doğukan Atabay"
            className="logo-img"
            width={300}
            height={56}
          />
        </Link>
        <div className="logo-curve" />
      </div>

      <button
        type="button"
        className="header-hamburger"
        aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
        aria-expanded={menuOpen}
        aria-controls="nav-drawer"
        onClick={toggleMenu}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      <div id="nav-drawer" className={`nav-container ${menuOpen ? "nav-open" : ""}`} role={menuOpen ? "dialog" : undefined} aria-modal={menuOpen ? "true" : undefined} aria-label={menuOpen ? t("mainMenu") : undefined}>
        <Link href="/" className="nav-drawer-logo" aria-label={t("homeAria")} onClick={closeMenu}>
          <Image
            src="/D-atabay-logo-laci-1.webp"
            alt="Dr. Doğukan Atabay"
            className="nav-drawer-logo-img"
            width={200}
            height={40}
          />
        </Link>
        <div className="nav-locale-slot">
          <LocaleSwitcher />
        </div>
        <nav className="nav-links">
          <Link href="/" onClick={closeMenu}>{t("home")}</Link>
          <Link href="/hakkimizda" onClick={closeMenu}>{t("about")}</Link>
          <Link href="/hizmetler" onClick={closeMenu}>{t("services")}</Link>
          <Link href="/blog" onClick={closeMenu}>{t("blog")}</Link>
          <Link href="/iletisim" onClick={closeMenu}>{t("contact")}</Link>
          <a href={SITE_CONFIG.whatsapp} className="btn btn-primary nav-cta" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            {t("whatsapp")}
          </a>
        </nav>
      </div>

      {menuOpen && (
        <div
          className="nav-overlay"
          aria-hidden="true"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}
