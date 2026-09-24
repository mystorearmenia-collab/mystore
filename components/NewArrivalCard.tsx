"use client";

import ProductVisual from "./ProductVisual";
import { useProductModal } from "./ProductModal";
import Prices from "./Prices";
import { pick } from "@/lib/format";
import type { Product } from "@/lib/catalog";
import type { Locale } from "@/i18n/routing";

export default function NewArrivalCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const { open } = useProductModal();

  return (
    <button
      onClick={() => open(product)}
      className="group card card-lift w-[min(78vw,380px)] overflow-hidden text-left"
    >
      <div className="stage aspect-[4/4.6]">
        <ProductVisual
          art={product.art}
          image={product.image}
          alt={`${product.brand} ${product.name}`}
          className="stage-media h-[70%] w-auto"
        />
      </div>
      <div className="flex items-end justify-between gap-4 border-t border-line p-5">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            {product.brand}
          </p>
          <h3 className="mt-2 text-[1.05rem] font-medium tracking-[-0.025em]">
            {product.name}
          </h3>
          <p className="mt-1 text-[0.8rem] text-muted">{pick(product.config, locale)}</p>
        </div>
        <div className="shrink-0 min-w-[9.5rem]"><Prices product={product} /></div>
      </div>
    </button>
  );
}
