import type { Locale } from "@/i18n/routing";

export type Variant = {
  color: string | null;
  storage: string | null;
  ram: string | null;
  sim: "sim-esim" | "esim" | null;
  price: number;
  credit: number | null;
  image: string;
  inStock: boolean;
};

export type Selection = Partial<Record<"color" | "storage" | "ram" | "sim", string>>;
export type OptionKey = keyof Selection;

type WithVariants = { variants?: Variant[] };

const KEYS: OptionKey[] = ["color", "storage", "ram", "sim"];

/** Distinct values per option, in first-seen order (variants arrive sorted by storage). */
export function optionsOf(p: WithVariants, key: OptionKey): string[] {
  const seen: string[] = [];
  for (const v of p.variants ?? []) {
    const val = v[key];
    if (val && !seen.includes(val)) seen.push(val);
  }
  return seen;
}

/** Variant that best matches the selection; the cheapest one when nothing is selected yet. */
export function findVariant(p: WithVariants, sel: Selection): Variant | undefined {
  const list = p.variants ?? [];
  if (!list.length) return undefined;
  let best: Variant | undefined;
  let bestScore = -1;
  for (const v of list) {
    let score = 0;
    for (const k of KEYS) if (sel[k] && v[k] === sel[k]) score += 1;
    if (
      score > bestScore ||
      (score === bestScore && best && v.price < best.price && v.sim !== "esim")
    ) {
      best = v;
      bestScore = score;
    }
  }
  return best;
}

/** Changing one option keeps the others whenever a matching variant exists, otherwise snaps to the closest one. */
export function choose(p: WithVariants, sel: Selection, key: OptionKey, value: string): Selection {
  const next: Selection = { ...sel, [key]: value };
  const list = (p.variants ?? []).filter((v) => v[key] === value);
  let best: Variant | undefined;
  let bestScore = -1;
  for (const v of list) {
    let score = 0;
    for (const k of KEYS) if (k !== key && next[k] && v[k] === next[k]) score += 1;
    if (score > bestScore || (score === bestScore && best && v.price < best.price)) {
      best = v;
      bestScore = score;
    }
  }
  if (!best) return next;
  const out: Selection = {};
  for (const k of KEYS) if (best[k]) out[k] = best[k] as string;
  return out;
}

/** Which values of `key` exist for the current selection of the OTHER options (for greying out). */
export function isAvailable(p: WithVariants, sel: Selection, key: OptionKey, value: string): boolean {
  return (p.variants ?? []).some(
    (v) => v[key] === value && KEYS.every((k) => k === key || !sel[k] || v[k] === sel[k]),
  );
}

type ColorInfo = { hex: string; ru?: string; hy?: string };

const COLORS: Record<string, ColorInfo> = {
  black: { hex: "#1c1c1e", ru: "Чёрный", hy: "Սև" },
  "space black": { hex: "#2a2a2c", ru: "Чёрный космос", hy: "Տիեզերական սև" },
  white: { hex: "#f5f5f7", ru: "Белый", hy: "Սպիտակ" },
  "cloud white": { hex: "#f0f0ee", ru: "Белое облако", hy: "Սպիտակ" },
  silver: { hex: "#d8d9dc", ru: "Серебристый", hy: "Արծաթագույն" },
  grey: { hex: "#8e8e93", ru: "Серый", hy: "Մոխրագույն" },
  "light gray": { hex: "#b9b9bd", ru: "Светло-серый", hy: "Բաց մոխրագույն" },
  graphite: { hex: "#4a4a4d", ru: "Графит", hy: "Գրաֆիտ" },
  blue: { hex: "#2f6fe4", ru: "Синий", hy: "Կապույտ" },
  "deep blue": { hex: "#1f3a6e", ru: "Тёмно-синий", hy: "Մուգ կապույտ" },
  "sky blue": { hex: "#8fc5ea", ru: "Небесно-голубой", hy: "Երկնագույն" },
  "light blue": { hex: "#a9d3f0", ru: "Голубой", hy: "Երկնագույն" },
  "icy blue": { hex: "#a8d4ec", ru: "Ледяной голубой", hy: "Երկնագույն" },
  icyblue: { hex: "#a8d4ec", ru: "Ледяной голубой", hy: "Երկնագույն" },
  "glacier blue": { hex: "#bcd6e8", ru: "Ледяной голубой", hy: "Երկնագույն" },
  glacier: { hex: "#bcd6e8", ru: "Ледяной", hy: "Սառցե" },
  navy: { hex: "#1b2a4a", ru: "Тёмно-синий", hy: "Մուգ կապույտ" },
  green: { hex: "#4f8f5f", ru: "Зелёный", hy: "Կանաչ" },
  "dark green": { hex: "#2f5b40", ru: "Тёмно-зелёный", hy: "Մուգ կանաչ" },
  "mint green": { hex: "#98e0c0", ru: "Мятный", hy: "Անանուխ" },
  mint: { hex: "#98e0c0", ru: "Мятный", hy: "Անանուխ" },
  sage: { hex: "#a3b08e", ru: "Шалфей", hy: "Կանաչավուն" },
  olive: { hex: "#6b7048", ru: "Оливковый", hy: "Ձիթապտղի" },
  red: { hex: "#d63b3b", ru: "Красный", hy: "Կարմիր" },
  burgundy: { hex: "#6d1f2e", ru: "Бордовый", hy: "Բորդո" },
  pink: { hex: "#f3b9c6", ru: "Розовый", hy: "Վարդագույն" },
  blush: { hex: "#f1c7cf", ru: "Румяный розовый", hy: "Վարդագույն" },
  purple: { hex: "#8b6fc9", ru: "Фиолетовый", hy: "Մանուշակագույն" },
  lavender: { hex: "#b9a7e0", ru: "Лавандовый", hy: "Լավանդա" },
  lilac: { hex: "#c7b3e6", ru: "Сиреневый", hy: "Մանուշակագույն" },
  "light violet": { hex: "#c3b2e8", ru: "Светло-фиолетовый", hy: "Բաց մանուշակագույն" },
  violet: { hex: "#7d5fb4", ru: "Фиолетовый", hy: "Մանուշակագույն" },
  "violet shadow": { hex: "#5c4a8a", ru: "Фиолетовая тень", hy: "Մանուշակագույն" },
  "cobalt violet": { hex: "#5b4fc4", ru: "Кобальтовый фиолетовый", hy: "Մանուշակագույն" },
  "mist purple": { hex: "#b7a9cf", ru: "Туманный фиолетовый", hy: "Մանուշակագույն" },
  orange: { hex: "#f28c28", ru: "Оранжевый", hy: "Նարնջագույն" },
  "cosmic orange": { hex: "#e8712f", ru: "Космический оранжевый", hy: "Նարնջագույն" },
  yellow: { hex: "#f2d24b", ru: "Жёлтый", hy: "Դեղին" },
  citrus: { hex: "#d8e04a", ru: "Цитрус", hy: "Ցիտրուս" },
  gold: { hex: "#e6cfa5", ru: "Золотой", hy: "Ոսկեգույն" },
  "light gold": { hex: "#ecdcb8", ru: "Светлое золото", hy: "Բաց ոսկեգույն" },
  titanium: { hex: "#9a978f", ru: "Титановый", hy: "Տիտանե" },
  "natural titanium": { hex: "#b5aea1", ru: "Натуральный титан", hy: "Բնական տիտան" },
  midnight: { hex: "#1e2230", ru: "Полночь", hy: "Կեսգիշեր" },
  starlight: { hex: "#efe6d5", ru: "Сияющая звезда", hy: "Աստղային" },
  cream: { hex: "#f0e8d4", ru: "Кремовый", hy: "Կրեմ" },
  indigo: { hex: "#3b3f8f", ru: "Индиго", hy: "Ինդիգո" },
};

export function colorInfo(name: string): { hex: string | null; label: (l: Locale) => string } {
  const key = name.toLowerCase().trim();
  const info = COLORS[key];
  return {
    hex: info?.hex ?? null,
    label: (l) => (l === "ru" ? info?.ru : l === "hy" ? info?.hy : undefined) ?? name,
  };
}
