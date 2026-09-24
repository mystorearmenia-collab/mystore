import type { Locale } from "@/i18n/routing";

export type Tri = { hy: string; ru: string; en: string };

/** Picks the string for the active locale, falling back to English. */
export function pick(tri: Tri, locale: Locale): string {
  return tri[locale] || tri.en || tri.hy || tri.ru || "";
}

export function formatPrice(value: number, locale: Locale): string {
  const grouped = new Intl.NumberFormat(
    locale === "hy" ? "hy-AM" : locale === "ru" ? "ru-RU" : "en-US",
  ).format(value);
  return `${grouped} ֏`;
}
