import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";
import ProductVisual from "./ProductVisual";
import { ArrowRightIcon } from "./icons";

export default function PromoBanner() {
  const t = useTranslations("promo");

  return (
    <section className="section">
      <div className="shell">
        <Reveal>
          <div className="card relative isolate overflow-hidden rounded-[var(--radius-lg)] bg-surface">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-[12%] top-1/2 -z-10 h-[560px] w-[560px] -translate-y-1/2 rounded-full opacity-60 blur-[6px]"
              style={{
                background:
                  "radial-gradient(closest-side, var(--orange-glow), transparent 70%)",
              }}
            />

            <div className="grid items-center gap-8 p-[clamp(1.75rem,4vw,4rem)] md:grid-cols-[1.15fr_1fr]">
              <div>
                <p className="eyebrow">{t("eyebrow")}</p>
                <h2 className="h2 mt-5">{t("title")}</h2>
                <p className="lede mt-5 max-w-[44ch]">{t("lede")}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/#store" className="btn btn-primary">
                    {t("primary")}
                  </Link>
                  <Link href="/#featured" className="btn btn-secondary group">
                    {t("secondary")}
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="relative grid place-items-center">
                <ProductVisual
                  art="macbook"
                  alt="MacBook Pro"
                  className="h-[min(38vw,300px)] w-auto drop-shadow-[0_40px_70px_rgba(0,0,0,0.7)]"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
