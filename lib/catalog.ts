import type { ProductArt } from "@/components/ProductVisual";
import type { Locale } from "@/i18n/routing";
import catalogData from "@/data/catalog.json";

export type Tri = { hy: string; ru: string; en: string };

export type Availability = "in-stock" | "on-request";

export type ProductSpecAttr = { label: Tri; value: Tri };
export type ProductSpecSection = { title: Tri; attrs: ProductSpecAttr[] };

export type Product = {
  id: string;
  brand: string;
  name: string;
  config: Tri;
  price: number;
  oldPrice: number | null;
  monthly: number | null;
  availability: Availability;
  art: ProductArt;
  image?: string | null;
  specs: ProductSpecSection[];
};

export type Category = {
  id: string;
  name: Tri;
  href: string;
  art: ProductArt;
  count: number;
};

type CatalogFile = {
  meta: { generated_from: string; warning: string; product_count: number };
  categories: Category[];
  products: Product[];
};

const catalog = catalogData as CatalogFile;

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

export const navigation: { key: string; href: string }[] = [
  { key: "home", href: "/" },
  { key: "iphone", href: "/iphone" },
  { key: "samsung", href: "/samsung" },
  { key: "mac", href: "/mac" },
  { key: "ipad", href: "/ipad" },
  { key: "gaming", href: "/gaming" },
  { key: "audio", href: "/audio" },
  { key: "dyson", href: "/dyson" },
  { key: "accessories", href: "/accessories" },
];

export const categories: Category[] = catalog.categories;
export const products: Product[] = catalog.products;
export const featuredProducts: Product[] = products.slice(0, 8);
export const newArrivals: Product[] = products.slice(8, 14);

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

/** Same brand/art rules the catalog generator used to count each category. */
export function productsForCategory(id: string): Product[] {
  switch (id) {
    case "iphone":
      return products.filter((p) => p.brand === "Apple" && p.art === "iphone");
    case "samsung":
      return products.filter((p) => p.brand === "Samsung");
    case "mac":
      return products.filter((p) => p.brand === "Apple" && p.art === "macbook");
    case "ipad":
      return products.filter((p) => p.brand === "Apple" && p.art === "ipad");
    case "gaming":
      return products.filter((p) => p.brand === "PlayStation");
    case "audio":
      return products.filter((p) =>
        (["headphones", "earbuds", "speaker"] as ProductArt[]).includes(p.art),
      );
    case "dyson":
      return products.filter((p) => p.brand === "Dyson");
    case "accessories":
      return products.filter((p) => p.art === "earbuds" && p.brand !== "Apple");
    default:
      return [];
  }
}

export const brands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "Dyson",
  "DJI",
  "PlayStation",
  "Sony",
];

/** Yerevan storefront details — language-neutral facts stay as-is, the rest is translated per locale. */
export const store = {
  address: "Կոմիտասի 9",
  cityByLocale: { hy: "Երևան, Հայաստան", ru: "Ереван, Армения", en: "Yerevan, Armenia" } as Tri,
  phone: "+374 10 500 900",
  email: "hello@mystore.am",
  mapUrl: "https://maps.google.com/?q=Komitas+9,+Yerevan,+Armenia",
};

export function storeCity(locale: Locale): string {
  return pick(store.cityByLocale, locale);
}
