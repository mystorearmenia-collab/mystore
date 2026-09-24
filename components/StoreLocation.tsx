import { useLocale, useTranslations } from "next-intl";
import Reveal from "./Reveal";
import Logo from "./Logo";
import { store, storeAddress, storeCity } from "@/lib/catalog";
import type { Locale } from "@/i18n/routing";
import {
  ArrowUpRightIcon,
  ClockIcon,
  MailIcon,
  PhoneCallIcon,
  PinIcon,
} from "./icons";

export default function StoreLocation() {
  const t = useTranslations("store");
  const locale = useLocale() as Locale;

  return (
    <section className="section" id="store">
      <div className="shell grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        {/* Storefront plate */}
        <Reveal className="h-full">
          <div className="card relative h-full min-h-[340px] overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg,#1a1310 0%,#111010 52%,#0a0a0a 100%)",
              }}
            />
            {/* canopy + warm downlights, as on the real shopfront */}
            <div
              aria-hidden
              className="absolute left-[8%] right-[8%] top-[18%] h-2.5 rounded-sm bg-[#0b0b0b] shadow-[0_1px_0_rgba(255,255,255,0.07)]"
            />
            <div
              aria-hidden
              className="absolute left-[8%] right-[8%] top-[calc(18%+10px)] h-[58%]"
              style={{
                background: [
                  "radial-gradient(ellipse 62px 140px at 14% 0%, rgba(255,150,70,0.20), transparent 70%)",
                  "radial-gradient(ellipse 62px 140px at 38% 0%, rgba(255,150,70,0.20), transparent 70%)",
                  "radial-gradient(ellipse 62px 140px at 62% 0%, rgba(255,150,70,0.20), transparent 70%)",
                  "radial-gradient(ellipse 62px 140px at 86% 0%, rgba(255,150,70,0.20), transparent 70%)",
                ].join(","),
              }}
            />
            <div className="relative flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
              <Logo className="text-[clamp(1.9rem,4.4vw,3rem)] drop-shadow-[0_0_30px_rgba(255,255,255,0.12)]" />
              <p className="eyebrow">{t("flagship")}</p>
              <a
                href={store.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary group mt-2"
              >
                {t("directions")}
                <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Details */}
        <Reveal delay={90} className="h-full">
          <div className="card h-full p-[clamp(1.75rem,3.5vw,2.75rem)]">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="h2 mt-4">{t("title")}</h2>
            <p className="lede mt-4 max-w-[44ch]">{t("lede")}</p>

            <dl className="mt-9 grid gap-px overflow-hidden rounded-[var(--radius-sm)] border border-line bg-[var(--border)] sm:grid-cols-2">
              <div className="bg-background p-5">
                <dt className="flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] text-muted">
                  <PinIcon className="h-4 w-4 text-orange" />
                  {t("address")}
                </dt>
                <dd className="mt-2.5 text-[0.95rem]">
                  {storeAddress(locale)}
                  <span className="block text-muted">{storeCity(locale)}</span>
                </dd>
              </div>

              <div className="bg-background p-5">
                <dt className="flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] text-muted">
                  <ClockIcon className="h-4 w-4 text-orange" />
                  {t("hours")}
                </dt>
                <dd className="mt-2.5 space-y-1 text-[0.875rem]">
                  <span className="flex justify-between gap-4">
                    <span className="text-muted">{t("weekdays")}</span>
                    <span>10:00 — 20:00</span>
                  </span>
                  <span className="flex justify-between gap-4">
                    <span className="text-muted">{t("saturday")}</span>
                    <span>10:00 — 20:00</span>
                  </span>
                  <span className="flex justify-between gap-4">
                    <span className="text-muted">{t("sunday")}</span>
                    <span>11:00 — 18:00</span>
                  </span>
                </dd>
              </div>

              <div className="bg-background p-5">
                <dt className="flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] text-muted">
                  <PhoneCallIcon className="h-4 w-4 text-orange" />
                  {t("phone")}
                </dt>
                <dd className="mt-2.5 text-[0.95rem]">
                  <a
                    href={`tel:${store.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-orange"
                  >
                    {store.phone}
                  </a>
                </dd>
              </div>

              <div className="bg-background p-5">
                <dt className="flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] text-muted">
                  <MailIcon className="h-4 w-4 text-orange" />
                  {t("email")}
                </dt>
                <dd className="mt-2.5 text-[0.95rem]">
                  <a
                    href={`mailto:${store.email}`}
                    className="transition-colors hover:text-orange"
                  >
                    {store.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={store.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                {t("openMaps")}
              </a>
              <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="btn btn-secondary">
                {t("call")}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
