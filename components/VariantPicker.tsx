"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Product } from "@/lib/catalog";
import {
  choose,
  colorInfo,
  isAvailable,
  optionsOf,
  type OptionKey,
  type Selection,
} from "@/lib/variants";
import type { Locale } from "@/i18n/routing";

export default function VariantPicker({
  product,
  selection,
  onChange,
}: {
  product: Product;
  selection: Selection;
  onChange: (next: Selection) => void;
}) {
  const t = useTranslations("product");
  const locale = useLocale() as Locale;

  const colors = optionsOf(product, "color");
  const storages = optionsOf(product, "storage");
  const rams = optionsOf(product, "ram");
  const sims = optionsOf(product, "sim");

  const pick = (key: OptionKey, value: string) => onChange(choose(product, selection, key, value));

  const chip = (key: OptionKey, value: string, label: string) => {
    const active = selection[key] === value;
    const available = isAvailable(product, selection, key, value);
    return (
      <button
        key={value}
        type="button"
        onClick={() => pick(key, value)}
        aria-pressed={active}
        className={`rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-colors duration-200 ${
          active
            ? "border-orange bg-[var(--orange-soft)] text-ink"
            : "border-line text-muted hover:border-[var(--border-strong,#3a3a3a)] hover:text-ink"
        } ${available ? "" : "opacity-45"}`}
      >
        {label}
      </button>
    );
  };

  const group = (title: string, body: React.ReactNode, hint?: string) => (
    <div>
      <p className="mb-2 flex items-baseline gap-2 text-[0.72rem] uppercase tracking-[0.14em] text-muted">
        {title}
        {hint && <span className="normal-case tracking-normal text-ink">{hint}</span>}
      </p>
      <div className="flex flex-wrap gap-2">{body}</div>
    </div>
  );

  return (
    <div className="space-y-4">
      {colors.length > 1 &&
        group(
          t("color"),
          colors.map((c) => {
            const info = colorInfo(c);
            const active = selection.color === c;
            const available = isAvailable(product, selection, "color", c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => pick("color", c)}
                aria-pressed={active}
                aria-label={info.label(locale)}
                title={info.label(locale)}
                className={`grid h-9 w-9 place-items-center rounded-full border transition-[border-color,box-shadow] duration-200 ${
                  active ? "border-orange shadow-[0_0_0_3px_var(--orange-soft)]" : "border-line"
                } ${available ? "" : "opacity-45"}`}
              >
                <span
                  className="h-6 w-6 rounded-full border border-white/15"
                  style={{
                    background: info.hex ?? "linear-gradient(135deg,#3a3a3a,#8a8a8a)",
                  }}
                />
              </button>
            );
          }),
          selection.color ? colorInfo(selection.color).label(locale) : undefined,
        )}

      {storages.length > 1 &&
        group(t("storage"), storages.map((s) => chip("storage", s, s)))}

      {rams.length > 1 && group(t("ram"), rams.map((r) => chip("ram", r, r)))}

      {sims.length > 1 &&
        group(
          t("sim"),
          sims.map((s) => chip("sim", s, s === "esim" ? t("esimOnly") : t("simEsim"))),
        )}
    </div>
  );
}
