import tradeInData from "@/data/trade-in.json";
import { products } from "./catalog";
import type { TradeInModel, TradeInProduct } from "./tradein-estimate";

export const tradeInModels: TradeInModel[] = (tradeInData as { models: TradeInModel[] }).models;

export const tradeInProducts: TradeInProduct[] = products
  .filter((p) => p.price > 0)
  .map((p) => ({
    id: p.id,
    name: p.brand === "Apple" || p.name.startsWith(p.brand) ? p.name : `${p.brand} ${p.name}`,
    cats: p.cats,
    price: p.price,
    variants: (p.variants ?? [])
      .filter((v) => v.price > 0)
      .map((v) => ({ storage: v.storage, color: v.color, price: v.price })),
  }));

/** Highest credit in the price list — shown on the homepage as "trade-in up to …". */
export const tradeInMax: number = Math.max(
  0,
  ...tradeInModels.flatMap((m) => m.storage.map((s) => s.max ?? 0)),
);
