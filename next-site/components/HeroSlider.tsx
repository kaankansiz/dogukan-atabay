"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/content";

type Slide = { title: string; desc: string };

const SLIDE_BGS = [
  "/assets/varis-tedavisi.png",
  "/assets/troid.png",
  "/assets/radyoloji.png",
  "/assets/biopsi.png",
];

function pad(n: number) {
  return n + 1 < 10 ? "0" + (n + 1) : String(n + 1);
}

export function HeroSlider() {
  const t = useTranslations("Hero");
  const slides = t.raw("slides") as Slide[];
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = slides.length;

  useEffect(() => {
    intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % n), 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [n]);

  const goTo = (index: number) => {
    setCurrent((index + n) % n);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % n), 5000);
  };

  return (
    <div className="card hero-card" id="hero-card">
      <div className="hero-card-header">
        <div className="hero-icons">
          <a href="https://wa.me/905339483076" className="icon-btn" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
          </a>
          <a href={SITE_CONFIG.instagram} className="icon-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          </a>
        </div>
      </div>
      <div className="hero-slides">
        {slides.map((s, i) => (
          <div
            key={i}
            className={"hero-slide" + (i === current ? " active" : "")}
            data-slide={i}
            style={{
              backgroundImage: `url('${SLIDE_BGS[i] ?? SLIDE_BGS[0]}'), url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80')`,
            }}
          >
            <div className="hero-slide-overlay" />
            <div className="hero-card-body">
              <h1 dangerouslySetInnerHTML={{ __html: s.title }} />
              <p>{s.desc}</p>
              <Link href="/iletisim" className="btn btn-primary btn-hero">{t("contactCta")}</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-card-footer" id="hero-slider">
        <div className="pagination">
          <span className="current-slide-num" id="hero-current-num">{pad(current)}</span>
        </div>
        <div className="slide-bars" id="hero-bars" role="tablist" aria-label={t("slideTablist")}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              className={"bar" + (i === current ? " active" : "")}
              data-slide={i}
              aria-label={t("slideN", { n: i + 1 })}
              aria-selected={i === current}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
