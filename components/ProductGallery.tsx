"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ProductVisual, { type ProductArt } from "./ProductVisual";

/**
 * Photo gallery for the product modal: swipe on touch, arrows on desktop,
 * thumbnails underneath. Falls back to the vector stand-in when there is no photo.
 * Remount it (via `key`) when the photo set changes so it starts at the first shot.
 */
export default function ProductGallery({
  photos,
  art,
  alt,
}: {
  photos: string[];
  art: ProductArt;
  alt: string;
}) {
  const t = useTranslations("product");
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(photos.length - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    setIndex(next);
  };

  if (photos.length === 0) {
    return (
      <div className="stage flex aspect-square items-center justify-center p-8 sm:aspect-auto sm:w-[42%] sm:shrink-0">
        <ProductVisual art={art} alt={alt} className="h-[80%] w-auto" />
      </div>
    );
  }

  const many = photos.length > 1;
  // Apple store shots come with their #f5f5f7 backdrop baked in: show them as-is on a
  // matching ground. White-background shots multiply into that same ground.
  const blend = (src: string) => (src.includes("as-images.apple.com") ? "normal" : "multiply");

  return (
    <div className="relative flex flex-col bg-[#f5f5f7] sm:w-[42%] sm:shrink-0">
      <div
        ref={track}
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="flex aspect-square w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] sm:aspect-auto sm:min-h-[340px] sm:flex-1 [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((src, i) => (
          <div key={src} className="grid w-full shrink-0 snap-center place-items-center p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={many ? `${alt} — ${i + 1}/${photos.length}` : alt}
              loading={i === 0 ? "eager" : "lazy"}
              referrerPolicy="no-referrer"
              className="h-full max-h-[420px] w-full object-contain"
              style={{ mixBlendMode: blend(src) }}
            />
          </div>
        ))}
      </div>

      {many && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label={t("prevPhoto")}
            className="absolute left-2 top-[45%] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white transition-opacity disabled:opacity-0 sm:grid"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === photos.length - 1}
            aria-label={t("nextPhoto")}
            className="absolute right-2 top-[45%] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white transition-opacity disabled:opacity-0 sm:grid"
          >
            ›
          </button>

          <div className="flex justify-center gap-2 px-4 pb-4">
            {photos.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => go(i)}
                aria-label={`${t("photo")} ${i + 1}`}
                aria-current={i === index}
                className="h-12 w-12 overflow-hidden rounded-[10px] border-2 bg-[#f5f5f7] transition-colors"
                style={{ borderColor: i === index ? "var(--orange)" : "transparent" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain"
                  style={{ mixBlendMode: blend(src) }}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
