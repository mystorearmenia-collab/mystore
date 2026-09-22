import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";
import ProductVisual from "./ProductVisual";
import { ArrowRightIcon } from "./icons";
import { formatPrice } from "@/lib/catalog";
import type { Locale } from "@/i18n/routing";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;

  return (
    <section className="relative overflow-hidden pt-[72px]">
      {/* single, restrained orange light source behind the product */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] h-[620px] w-[min(920px,92vw)] -translate-x-1/2 rounded-full opacity-[0.55] blur-[10px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--orange-glow), transparent 72%)",
        }}
      />

      <div className="shell relative grid items-center gap-10 pb-[clamp(3rem,7vw,6rem)] pt-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[1fr_1.05fr] lg:gap-6">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="eyebrow">{t("eyebrow")}</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display mt-5">
              {t("titleTop")}
              <br />
              <span className="text-muted">{t("titleBottom")}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="lede mt-6 max-w-[42ch]">{t("lede")}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/#featured" className="btn btn-primary">
                {t("shopNow")}
              </Link>
              <Link href="/#categories" className="btn btn-secondary">
                {t("viewProducts")}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-12 flex flex-wrap items-end gap-x-10 gap-y-5 border-t border-line pt-7">
              <div>
                <dt className="eyebrow">{t("from")}</dt>
                <dd className="price mt-1.5 text-[1.45rem] font-semibold">
                  {formatPrice(649000, locale)}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">{t("instalment")}</dt>
                <dd className="mt-1.5 text-[1.45rem] font-semibold">
                  {t("instalmentValue")}{" "}
                  <span className="text-muted text-base font-normal">
                    {t("instalmentNote")}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">{t("tradeIn")}</dt>
                <dd className="mt-1.5 text-[1.45rem] font-semibold">
                  {t("tradeInNote")} <span className="text-orange">{formatPrice(120000, locale)}</span>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Product stage — the hero's visual anchor */}
        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative mx-auto grid aspect-[4/4.4] w-full max-w-[560px] place-items-center sm:aspect-[4/3.8] lg:aspect-auto lg:h-[min(76vh,720px)]">
            <ProductVisual
              art="iphone"
              alt="iPhone 18 Pro"
              className="h-full w-auto max-w-full drop-shadow-[0_50px_90px_rgba(0,0,0,0.75)]"
            />
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-line bg-surface/80 px-4 py-2 text-xs text-muted backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
              iPhone 18 Pro
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
