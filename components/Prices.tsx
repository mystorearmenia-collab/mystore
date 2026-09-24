"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/catalog";
import type { Locale } from "@/i18n/routing";

/** Cash price always; credit price only when the shops actually offer credit on the item. */
export default function Prices({
  product,
  size = "md",
}: {
  product: Product;
  size?: "md" | "lg";
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("product");
  const main = size === "lg" ? "text-[1.3rem]" : "text-[1.15rem]";

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[0.72rem] uppercase tracking-[0.12em] text-muted">
          {t("cash")}
        </span>
        <span className={`price ${main} font-semibold`}>
          {formatPrice(product.price, locale)}
        </span>
      </div>
      {product.creditPrice && (
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[0.72rem] uppercase tracking-[0.12em] text-muted">
            {t("credit")}
          </span>
          <span className="price text-[0.95rem] text-muted">
            {formatPrice(product.creditPrice, locale)}
          </span>
        </div>
      )}
    </div>
  );
}
