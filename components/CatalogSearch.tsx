"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { products } from "@/lib/catalog";
import { searchProducts } from "@/lib/search";
import ProductCard from "./ProductCard";

export default function CatalogSearch() {
  const t = useTranslations("catalogSearch");
  const params = useSearchParams();
  const router = useRouter();
  const initialQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  useEffect(() => setQuery(initialQuery), [initialQuery]);
  const matches = searchProducts(products, query);
  const hasQuery = /[\p{L}\p{N}]/u.test(query);

  return (
    <>
      <form role="search" className="mt-8 max-w-2xl" onSubmit={(event) => {
        event.preventDefault();
        router.replace(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false });
      }}>
        <label htmlFor="catalog-search" className="mb-3 block text-sm text-muted">{t("label")}</label>
        <div className="flex gap-3">
          <input id="catalog-search" type="search" autoFocus autoComplete="off" value={query}
            onChange={(event) => setQuery(event.target.value)} placeholder={t("placeholder")}
            className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none focus:border-orange" />
          <button type="submit" className="btn btn-primary">{t("submit")}</button>
        </div>
      </form>
      <p className="my-8 text-muted" role="status" aria-live="polite">
        {!hasQuery ? t("hint") : matches.length ? t("count", { count: matches.length }) : t("empty")}
      </p>
      <div className="grid grid-cols-1 gap-[clamp(0.75rem,1.4vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-4">
        {matches.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </>
  );
}
