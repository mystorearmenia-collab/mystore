import { useLocale, useTranslations } from "next-intl";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import NewArrivalCard from "./NewArrivalCard";
import { newArrivals } from "@/lib/catalog";
import type { Locale } from "@/i18n/routing";

export default function NewArrivals() {
  const locale = useLocale() as Locale;
  const t = useTranslations("sections");

  return (
    <section className="section" id="new">
      <div className="shell">
        <SectionHeading
          eyebrow={t("newEyebrow")}
          title={t("newTitle")}
          description={t("newLede")}
          action={{ label: t("newAction"), href: "/new" }}
        />
      </div>

      {/* Full-bleed rail: large photography, minimal chrome */}
      <Reveal>
        <div
          className="rail px-[var(--gutter)] pb-2"
          style={{ scrollPaddingInline: "var(--gutter)" }}
        >
          {newArrivals.map((product) => (
            <NewArrivalCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
