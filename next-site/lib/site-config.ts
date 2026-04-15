import type { AppLocale } from "@/i18n/routing";
import { SITE_CONFIG as SITE_TR } from "@/lib/content";

export type SiteConfig = {
  orgName: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  whatsapp: string;
  instagram: string;
  mapsEmbed: string;
};

const shared = {
  phone: SITE_TR.phone,
  email: SITE_TR.email,
  whatsapp: SITE_TR.whatsapp,
  instagram: SITE_TR.instagram,
  mapsEmbed: SITE_TR.mapsEmbed,
};

export function getSiteConfig(locale: AppLocale): SiteConfig {
  switch (locale) {
    case "en":
      return {
        ...shared,
        orgName: "Assoc. Prof. Dr. Doğukan Atabay",
        address: "Kemerkaya, İller St. 27-29, Imperial Hospital – Ortahisar/Trabzon, Türkiye",
        hours: "Monday – Friday: 08:00 – 17:00\nSaturday: 08:00 – 13:00\nSunday: Closed",
      };
    case "ar":
      return {
        ...shared,
        orgName: "الدكتور دوغوكان أتاباي — أخصائي الأشعة التداخلية",
        address: "كمركايا، شارع إلر 27-29، مستشفى إمبريال – أورتاهيسار/طرابزون، تركيا",
        hours: "الاثنين – الجمعة: 08:00 – 17:00\nالسبت: 08:00 – 13:00\nالأحد: مغلق",
      };
    case "ka":
      return {
        ...shared,
        orgName: "დოქტ. დოღუქან ათაბაი — ინტერვენციული რადიოლოგიის სპეციალისტი",
        address: "ქემერქაია, ილერის ქ. 27-29, იმპერიული საავადმყოფო – ორთაჰისარი/ტრაბზონი, თურქეთი",
        hours: "ორშაბათი – პარასკევი: 08:00 – 17:00\nშაბათი: 08:00 – 13:00\nკვირა: დახურულია",
      };
    default:
      return {
        ...shared,
        orgName: "Uzm. Dr. Doğukan Atabay",
        address: SITE_TR.address,
        hours: SITE_TR.hours,
      };
  }
}
