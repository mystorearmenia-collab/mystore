import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { store } from "./catalog";

export const siteOrigin = "https://mystorearmenia.am";

export function localizedUrl(path: string, locale: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteOrigin}${prefix}${path === "/" ? (prefix ? "" : "/") : path}`;
}

export function pageMetadata(locale: string, path: string, title: string, description?: string): Metadata {
  const url = localizedUrl(path, locale);
  return {
    title,
    ...(description ? { description } : {}),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(routing.locales.map((language) => [language, localizedUrl(path, language)])),
        "x-default": localizedUrl(path, routing.defaultLocale),
      },
    },
    openGraph: {
      type: "website", siteName: "MyStore Armenia", url, title, description,
      images: [{ url: `${siteOrigin}/images/storefront.webp`, alt: "MyStore Armenia — Komitas Ave 9, Yerevan" }],
    },
  };
}

export const storeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ElectronicsStore", "@id": `${siteOrigin}/#store`,
      name: "MyStore Armenia", alternateName: "MyStore", url: `${siteOrigin}/`,
      telephone: store.phone.replaceAll(" ", ""), email: store.email,
      image: `${siteOrigin}/images/storefront.webp`,
      address: { "@type": "PostalAddress", streetAddress: store.addressByLocale.en, addressLocality: "Yerevan", addressCountry: "AM" },
      sameAs: [store.facebook, store.instagram, store.tiktok],
    },
    {
      "@type": "WebSite", "@id": `${siteOrigin}/#website`,
      name: "MyStore Armenia", alternateName: "MyStore", url: `${siteOrigin}/`,
      inLanguage: [...routing.locales], publisher: { "@id": `${siteOrigin}/#store` },
    },
  ],
};
