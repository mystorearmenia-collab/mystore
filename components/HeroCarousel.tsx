"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { ProductArt } from "./ProductVisual";
import ProductVisual from "./ProductVisual";

type Slide = { id: string; name: string; image: string | null; art: ProductArt; price: number; href: string };
const labels = {
  hy: { gallery: "Ապրանքներ", previous: "Նախորդ ապրանքը", next: "Հաջորդ ապրանքը" },
  ru: { gallery: "Товары", previous: "Предыдущий товар", next: "Следующий товар" },
  en: { gallery: "Products", previous: "Previous product", next: "Next product" },
};

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  const locale = useLocale() as Locale;
  const t = useTranslations("hero");
  if (!slides.length) return null;
  const slide = slides[index];
  const move = (step: number) => setIndex((current) => (current + step + slides.length) % slides.length);
  return (
    <div
      role="region"
      aria-label={labels[locale].gallery}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      onTouchStart={(event) => { start.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchCancel={() => { start.current = null; }}
      onTouchEnd={(event) => {
        if (!start.current) return;
        const dx = event.changedTouches[0].clientX - start.current.x;
        const dy = event.changedTouches[0].clientY - start.current.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
        start.current = null;
      }}
      className="stage stage-light relative mx-auto flex aspect-[4/4.4] w-full max-w-[560px] flex-col items-center justify-center overflow-hidden rounded-[var(--radius-lg)] shadow-[0_50px_90px_rgba(0,0,0,0.6)] focus-visible:outline-2 focus-visible:outline-orange sm:aspect-[4/3.8] lg:aspect-auto lg:h-[min(76vh,720px)]"
    >
      <Link href={slide.href} aria-label={slide.name} className="absolute bottom-28 top-6 flex w-[76%] items-center justify-center">
        <ProductVisual key={slide.id} art={slide.art} image={slide.image} alt={slide.name} className="max-h-full max-w-full" />
      </Link>
      {slides.length > 1 && ([-1, 1] as const).map((direction) => (
        <button key={direction} type="button" onClick={() => move(direction)} aria-label={direction < 0 ? labels[locale].previous : labels[locale].next}
          className={`absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-orange ${direction < 0 ? "left-3" : "right-3"}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true"><path d={direction < 0 ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} /></svg>
        </button>
      ))}
      <div aria-live="polite" aria-atomic="true" className="absolute bottom-12 text-center text-[#17171a]">
        <p className="text-base font-semibold">{slide.name}</p>
        <p className="mt-1 text-sm">{t("from")} {formatPrice(slide.price, locale)}</p>
      </div>
      <div className="absolute bottom-2 flex gap-1">
        {slides.map((item, position) => (
          <button key={item.id} type="button" aria-label={item.name} aria-pressed={position === index} onClick={() => setIndex(position)} className="flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-orange">
            <span className={`h-1.5 rounded-full transition-all ${position === index ? "w-7 bg-orange" : "w-3 bg-black/30"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
