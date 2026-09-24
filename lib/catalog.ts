import type { ProductArt } from "@/components/ProductVisual";
import type { Locale } from "@/i18n/routing";
import catalogData from "@/data/catalog.json";

import { pick, type Tri } from "./format";

export { pick, formatPrice } from "./format";
export type { Tri } from "./format";

export type Availability = "in-stock" | "on-request";

export type ProductSpecAttr = { label: Tri; value: Tri };
export type ProductSpecSection = { title: Tri; attrs: ProductSpecAttr[] };

export type Product = {
  id: string;
  brand: string;
  name: string;
  config: Tri;
  /** Cash price, AMD */
  price: number;
  /** Instalment / credit price, AMD — null when the shops do not offer credit on the item */
  creditPrice: number | null;
  oldPrice: number | null;
  monthly: number | null;
  availability: Availability;
  art: ProductArt;
  image?: string | null;
  specs: ProductSpecSection[];
  cats: string[];
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

export { navigation } from "./nav";

export const categories: Category[] = catalog.categories;
export const products: Product[] = catalog.products;
export const featuredProducts: Product[] = pickShowcase(0);
export const newArrivals: Product[] = pickShowcase(1, 6);

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

/** Categories are assigned per product by the catalog generator (`cats`). */
export function productsForCategory(id: string): Product[] {
  return products.filter((p) => p.cats.includes(id));
}

/** The n-th most expensive product of each category, so the homepage shows the whole range. */
function pickShowcase(rank: number, limit = 8): Product[] {
  const order = ["iphone", "samsung", "mac", "gaming", "audio", "dyson", "dji", "xiaomi", "ipad", "camera"];
  const out: Product[] = [];
  for (const id of order) {
    const p = productsForCategory(id)[rank];
    if (p && !out.includes(p)) out.push(p);
  }
  return out.slice(0, limit);
}

export const brands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "Dyson",
  "DJI",
  "JBL",
  "Marshall",
  "PlayStation",
  "Canon",
];

/** Yerevan storefront details — language-neutral facts stay as-is, the rest is translated per locale. */
export const store = {
  addressByLocale: {
    hy: "Կոմիտասի պողոտա 9",
    ru: "проспект Комитаса, 9",
    en: "Komitas Ave 9",
  } as Tri,
  cityByLocale: { hy: "Երևան, Հայաստան", ru: "Ереван, Армения", en: "Yerevan, Armenia" } as Tri,
  phone: "+374 93 808 011",
  whatsapp: "https://wa.me/37493808011",
  email: "mystorearmenia@gmail.com",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Komitas+Ave+9,+Yerevan,+Armenia",
};

export function storeAddress(locale: Locale): string {
  return pick(store.addressByLocale, locale);
}

export function storeCity(locale: Locale): string {
  return pick(store.cityByLocale, locale);
}
