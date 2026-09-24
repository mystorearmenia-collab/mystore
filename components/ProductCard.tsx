"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import ProductVisual from "./ProductVisual";
import { HeartIcon } from "./icons";
import Prices from "./Prices";
import { useProductModal } from "./ProductModal";
import { pick } from "@/lib/format";
import type { Availability, Product } from "@/lib/catalog";
import type { Locale } from "@/i18n/routing";

const dotColor: Record<Availability, string> = {
  "in-stock": "var(--orange)",
  "on-request": "#6f6f6f",
};

export default function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const locale = useLocale() as Locale;
  const t = useTranslations("product");
  const { open } = useProductModal();
  const config = pick(product.config, locale);

  return (
    <article
      onClick={() => open(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && open(product)}
      className="group card card-lift flex h-full cursor-pointer flex-col overflow-hidden"
    >
      <div className="stage aspect-square">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted((v) => !v);
          }}
          aria-label={wishlisted ? t("removeFavorite") : t("addFavorite")}
          aria-pressed={wishlisted}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-white/5 hover:text-ink"
          style={wishlisted ? { color: "var(--orange)" } : undefined}
        >
          <HeartIcon
            className="h-[18px] w-[18px]"
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>

        <ProductVisual
          art={product.art}
          image={product.image}
          alt={`${product.brand} ${product.name}`}
          className="stage-media h-[74%] w-auto"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            {product.brand}
          </p>
          <h3 className="mt-2 text-[1.0625rem] font-medium tracking-[-0.025em]">
            {product.name}
          </h3>
          {config && <p className="mt-1 text-[0.825rem] text-muted">{config}</p>}
        </div>

        <div className="mt-auto">
          <Prices product={product} />

          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-[0.775rem] text-muted">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: dotColor[product.availability] }}
              />
              {product.availability === "in-stock" ? t("inStock") : t("onRequest")}
            </p>
            <span className="text-[0.775rem] font-medium text-muted transition-colors duration-300 group-hover:text-orange">
              {t("specs")} →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
