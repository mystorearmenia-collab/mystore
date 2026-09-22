import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import { LockIcon, ShieldIcon, TruckIcon, VerifiedIcon } from "./icons";

const items = [
  { icon: ShieldIcon, titleKey: "warrantyTitle", textKey: "warrantyText" },
  { icon: TruckIcon, titleKey: "deliveryTitle", textKey: "deliveryText" },
  { icon: VerifiedIcon, titleKey: "originalTitle", textKey: "originalText" },
  { icon: LockIcon, titleKey: "paymentTitle", textKey: "paymentText" },
] as const;

export default function Benefits() {
  const t = useTranslations("benefits");

  return (
    <section className="section border-y border-line bg-surface">
      <div className="shell">
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, titleKey, textKey }, index) => (
            <Reveal key={titleKey} delay={index * 70} className="h-full">
              <div className="group h-full bg-background p-7 transition-colors duration-400 hover:bg-surface-secondary">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-line text-orange transition-[box-shadow,border-color] duration-400 group-hover:border-[var(--orange-line)] group-hover:shadow-[0_0_0_6px_var(--orange-soft)]">
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                <h3 className="mt-6 text-[1rem] font-medium tracking-[-0.02em]">
                  {t(titleKey)}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                  {t(textKey)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
