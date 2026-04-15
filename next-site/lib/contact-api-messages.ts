import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

type ContactApiStrings = {
  nameRequired: string;
  phoneRequired: string;
  emailInvalid: string;
  invalid: string;
  serverError: string;
};

const MESSAGES: Record<AppLocale, ContactApiStrings> = {
  tr: {
    nameRequired: "Ad soyad gerekli",
    phoneRequired: "Telefon gerekli",
    emailInvalid: "Geçerli bir e-posta girin",
    invalid: "Geçersiz veri",
    serverError: "Kayıt sırasında bir hata oluştu.",
  },
  en: {
    nameRequired: "Full name is required",
    phoneRequired: "Phone number is required",
    emailInvalid: "Please enter a valid email address",
    invalid: "Invalid data",
    serverError: "Something went wrong while saving your request.",
  },
  ar: {
    nameRequired: "الاسم الكامل مطلوب",
    phoneRequired: "رقم الهاتف مطلوب",
    emailInvalid: "يُرجى إدخال بريد إلكتروني صالح",
    invalid: "بيانات غير صالحة",
    serverError: "حدث خطأ أثناء حفظ الطلب.",
  },
  ka: {
    nameRequired: "სახელი და გვარი სავალდებულოა",
    phoneRequired: "ტელეფონის ნომერი სავალდებულოა",
    emailInvalid: "შეიყვანეთ სწორი ელფოსტის მისამართი",
    invalid: "არასწორი მონაცემები",
    serverError: "მოთხოვნის შენახვისას მოხდა შეცდომა.",
  },
};

export function contactApiLocale(raw: unknown): AppLocale {
  if (typeof raw === "string" && routing.locales.includes(raw as AppLocale)) {
    return raw as AppLocale;
  }
  return routing.defaultLocale;
}

export function contactApiMessages(locale: AppLocale): ContactApiStrings {
  return MESSAGES[locale] ?? MESSAGES[routing.defaultLocale];
}
