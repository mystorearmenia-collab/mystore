"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import ProductVisual from "./ProductVisual";
import { CloseIcon } from "./icons";
import { formatPrice, pick, type Availability, type Product } from "@/lib/catalog";
import type { Locale } from "@/i18n/routing";

const dotColor: Record<Availability, string> = {
  "in-stock": "var(--orange)",
  "on-request": "#6f6f6f",
};

type Ctx = { open: (product: Product) => void };
const ProductModalContext = createContext<Ctx | null>(null);

export function useProductModal(): Ctx {
  const ctx = useContext(ProductModalContext);
  if (!ctx) throw new Error("useProductModal must be used within ProductModalProvider");
  return ctx;
}

export function ProductModalProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  const locale = useLocale() as Locale;
  const t = useTranslations("product");

  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setProduct(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [product]);

  return (
    <ProductModalContext.Provider value={{ open: setProduct }}>
      {children}

      <div
        aria-hidden={!product}
        className={`fixed inset-0 z-[70] flex items-end justify-center transition-[opacity,visibility] duration-300 sm:items-center sm:p-6 ${
          product ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setProduct(null)}
        />

        {product && (
          <div
            className="relative flex max-h-[92vh] w-full flex-col overflow-y-auto rounded-t-[var(--radius-lg)] border border-line bg-surface sm:max-w-3xl sm:rounded-[var(--radius-lg)] sm:flex-row"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setProduct(null)}
              aria-label={t("close")}
              className="icon-button absolute right-3 top-3 z-10 bg-background/70 backdrop-blur"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            <div className="stage flex aspect-square items-center justify-center p-8 sm:aspect-auto sm:w-[42%] sm:shrink-0">
              <ProductVisual
                art={product.art}
                image={product.image}
                alt={`${product.brand} ${product.name}`}
                className="h-[80%] w-auto"
              />
            </div>

            <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                  {product.brand}
                </p>
                <h2 className="mt-1.5 text-[1.4rem] font-semibold tracking-[-0.02em]">
                  {product.name}
                </h2>
                {pick(product.config, locale) && (
                  <p className="mt-1 text-[0.9rem] text-muted">
                    {pick(product.config, locale)}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 border-y border-line py-4">
                <p className="price text-[1.3rem] font-semibold">
                  {formatPrice(product.price, locale)}
                </p>
                {product.oldPrice && (
                  <p className="price text-[0.9rem] text-muted line-through">
                    {formatPrice(product.oldPrice, locale)}
                  </p>
                )}
                <p className="ml-auto flex items-center gap-2 text-[0.8rem] text-muted">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: dotColor[product.availability] }}
                  />
                  {product.availability === "in-stock" ? t("inStock") : t("onRequest")}
                </p>
              </div>

              {product.specs.length > 0 && (
                <div>
                  <p className="eyebrow mb-3">{t("specs")}</p>
                  <div className="space-y-4">
                    {product.specs.map((section) => (
                      <div key={pick(section.title, locale)}>
                        <p className="mb-2 text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                          {pick(section.title, locale)}
                        </p>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
                          {section.attrs.map((attr) => (
                            <div
                              key={pick(attr.label, locale)}
                              className="flex items-baseline justify-between gap-3 border-b border-line/60 py-1 text-[0.85rem] sm:justify-start"
                            >
                              <dt className="text-muted">{pick(attr.label, locale)}</dt>
                              <dd className="text-right sm:ml-auto">{pick(attr.value, locale)}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ProductModalContext.Provider>
  );
}
