import type { MetadataRoute } from "next";
import { categories, brands } from "@/lib/catalog";
import { routing } from "@/i18n/routing";

const origin = "https://mystorearmenia.am";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set([
    "/", "/about", "/trade-in", "/delivery", "/installments",
    "/returns", "/support", "/warranty",
    ...categories.map((category) => category.href),
    ...brands.map((brand) => `/brand/${encodeURIComponent(brand.toLowerCase())}`),
  ]);

  return [...paths].flatMap((path) => {
    const localizedUrl = (locale: string) => {
      const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
      return `${origin}${prefix}${path === "/" ? (prefix ? "" : "/") : path}`;
    };
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale)]),
    );
    return routing.locales.map((locale) => ({
      url: localizedUrl(locale),
      alternates: { languages: { ...languages, "x-default": localizedUrl(routing.defaultLocale) } },
    }));
  });
}
