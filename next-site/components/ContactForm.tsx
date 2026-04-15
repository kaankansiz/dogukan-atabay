"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import type { AppLocale } from "@/i18n/routing";

const id = (prefix: string, name: string) => (prefix ? `${prefix}-${name}` : name);

export function ContactForm({ idPrefix = "" }: { idPrefix?: string }) {
  const t = useTranslations("ContactForm");
  const locale = useLocale() as AppLocale;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || undefined,
      message: (formData.get("message") as string) || undefined,
      locale,
    };
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(json.message || t("errorGeneric"));
        return;
      }
      setStatus("success");
      setMessage(t("success"));
      form.reset();
    } catch {
      setStatus("error");
      setMessage(t("errorNetwork"));
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} method="post">
      <div className="contact-form-group">
        <label htmlFor={id(idPrefix, "contact-name")}>{t("nameLabel")}</label>
        <input type="text" id={id(idPrefix, "contact-name")} name="name" required placeholder={t("namePlaceholder")} />
      </div>
      <div className="contact-form-row">
        <div className="contact-form-group">
          <label htmlFor={id(idPrefix, "contact-phone")}>{t("phoneLabel")}</label>
          <input type="tel" id={id(idPrefix, "contact-phone")} name="phone" required placeholder={t("phonePlaceholder")} />
        </div>
        <div className="contact-form-group">
          <label htmlFor={id(idPrefix, "contact-email")}>{t("emailLabel")}</label>
          <input type="email" id={id(idPrefix, "contact-email")} name="email" placeholder={t("emailPlaceholder")} />
        </div>
      </div>
      <div className="contact-form-group">
        <label htmlFor={id(idPrefix, "contact-message")}>{t("messageLabel")}</label>
        <textarea id={id(idPrefix, "contact-message")} name="message" rows={4} placeholder={t("messagePlaceholder")} />
      </div>
      {message && <p style={{ fontSize: "13px", color: status === "success" ? "green" : "#dc2626" }}>{message}</p>}
      <button type="submit" className="btn btn-primary contact-form-submit" disabled={status === "loading"}>
        {status === "loading" ? t("submitting") : t("submitShort")}
      </button>
      <div className="contact-form-footer">
        <p className="contact-form-note">{t("note")}</p>
        <div className="contact-form-quick">
          <span className="contact-form-quick-label">{t("quickLabel")}</span>
          <a href="tel:+905339483076" className="contact-form-quick-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            {t("quickCall")}
          </a>
          <a href="https://wa.me/905339483076" className="contact-form-quick-link contact-form-quick-wa" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
    </form>
  );
}
