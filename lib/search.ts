import type { Product } from "./catalog";

function normalize(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/\p{M}/gu, "")
    .replace(/самсунг/g, "samsung").replace(/сяоми|ксиаоми|ксяоми/g, "xiaomi")
    .replace(/айфон/g, "iphone").replace(/айпад/g, "ipad")
    .replace(/эйрподс|аирподс/g, "airpods")
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export function searchProducts(products: Product[], query: string): Product[] {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  return products.filter((product) => {
    const text = normalize([
      product.brand, product.name, product.id,
      ...Object.values(product.config),
      ...(product.variants ?? []).flatMap((variant) => [variant.color, variant.storage, variant.ram, variant.sim]),
    ].filter(Boolean).join(" "));
    return tokens.every((token) => text.includes(token));
  });
}
