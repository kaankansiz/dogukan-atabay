"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import reviewsBundle from "@/lib/i18n/patient-reviews.json";
import type { AppLocale } from "@/i18n/routing";

const REVIEW_TITLE_MAX_PX = 24;
const REVIEW_TITLE_MIN_PX = 12;

type ReviewItem = { author: string; sub: string; text: string };

function reviewsForLocale(locale: string): ReviewItem[] {
  const bundle = reviewsBundle as Record<string, ReviewItem[]>;
  const list = bundle[locale] ?? bundle.tr;
  return list;
}

export function ReviewSlider() {
  const t = useTranslations("ReviewSlider");
  const locale = useLocale() as AppLocale;
  const reviews = reviewsForLocale(locale);
  const [current, setCurrent] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const total = reviews.length;

  useLayoutEffect(() => {
    const el = titleRef.current;
    const header = el?.parentElement;
    if (!el || !header) return;

    const fitTitle = () => {
      let size = REVIEW_TITLE_MAX_PX;
      el.style.fontSize = `${size}px`;
      while (el.scrollWidth > el.clientWidth && size > REVIEW_TITLE_MIN_PX) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
      }
    };

    fitTitle();
    const ro = new ResizeObserver(fitTitle);
    ro.observe(header);
    return () => ro.disconnect();
  }, [locale, total]);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total]);

  const show = (i: number) => setCurrent((i + total) % total);

  return (
    <div className="card review-card">
      <div className="card-header">
        <h2 ref={titleRef} className="review-card-title">
          {t("title")}
        </h2>
        <div className="review-nav-btns">
          <button type="button" className="review-nav-btn review-prev" id="review-prev" aria-label={t("prev")} onClick={() => show(current - 1)}>‹</button>
          <span className="review-counter" id="review-counter">{current + 1}/{total}</span>
          <button type="button" className="review-nav-btn review-next" id="review-next" aria-label={t("next")} onClick={() => show(current + 1)}>›</button>
        </div>
      </div>
      <div className="review-slider" id="review-slider">
        {reviews.map((r, i) => (
          <div key={i} className={"review-item" + (i === current ? " active" : "")}>
            <div className="review-author">
              <div className="avatar-wrap">
                <Image src="/Dogukan-atabay.webp" alt="" className="avatar" width={56} height={56} />
              </div>
              <div className="author-info">
                <h3>{r.author}</h3>
                <p>{r.sub}</p>
              </div>
            </div>
            <p className="review-text">{r.text}</p>
            <div className="rating">★★★★★</div>
          </div>
        ))}
      </div>
    </div>
  );
}
