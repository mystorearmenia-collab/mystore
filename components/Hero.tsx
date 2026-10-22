import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";
import HeroCarousel from "./HeroCarousel";
import { ArrowRightIcon } from "./icons";
import { formatPrice, productImage, products } from "@/lib/catalog";
import { tradeInMax } from "@/lib/tradein";
import type { Locale } from "@/i18n/routing";

const HERO_PRODUCT_IDS = ["iphone-duo", "iphone-18-pro", "iphone-18-pro-max", "dyson-hs09-max"];

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;
  const slides = HERO_PRODUCT_IDS.flatMap((id) => {
    const product = products.find((p) => p.id === id);
    return product ? [{ id, name: product.name, image: productImage(product), art: product.art, price: product.price, href: `/${product.cats[0]}` }] : [];
  });

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
                  {t("tradeInNote")} <span className="text-orange">{formatPrice(tradeInMax, locale)}</span>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Product stage — the hero's visual anchor */}
        <Reveal delay={120} className="order-1 lg:order-2">
          <HeroCarousel slides={slides} />
        </Reveal>
      </div>
    </section>
  );
}
