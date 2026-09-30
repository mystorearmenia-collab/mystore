/** Pure trade-in maths — no data imports, so client components can use it without bundling the catalog. */

export type TradeInStorage = { size: string; min: number | null; max: number | null };

export type TradeInModel = { model: string; storage: TradeInStorage[] };

/** Slim product shape sent to the client calculator — the full catalog is too heavy for the browser. */
export type TradeInProduct = {
  id: string;
  name: string;
  cats: string[];
  price: number;
  variants: { storage: string | null; color: string | null; price: number }[];
};

export type Range = { min: number; max: number };

/** Approximate credit range for the old iPhone in AMD, or null when not priced — assessed in store. */
export function tradeInRange(models: TradeInModel[], model: string, storage: string): Range | null {
  const s = models.find((m) => m.model === model)?.storage.find((x) => x.size === storage);
  if (!s || s.min == null || s.max == null) return null;
  return { min: Math.min(s.min, s.max), max: Math.max(s.min, s.max) };
}

/** What is left to pay: the best case uses the top of the credit range, the worst case the bottom. */
export function toPayRange(newPrice: number, credit: Range): Range {
  return { min: Math.max(0, newPrice - credit.max), max: Math.max(0, newPrice - credit.min) };
}
