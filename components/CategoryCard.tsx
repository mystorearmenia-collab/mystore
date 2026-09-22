import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ProductVisual from "./ProductVisual";
import { ArrowUpRightIcon } from "./icons";
import { pick, type Category } from "@/lib/catalog";
import type { Locale } from "@/i18n/routing";

export default function CategoryCard({ category }: { category: Category }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("product");

  return (
    <Link href={category.href} className="group card card-lift overflow-hidden">
      <div className="stage aspect-[4/3.2]">
        <ProductVisual
          art={category.art}
          alt={pick(category.name, locale)}
          className="stage-media h-[72%] w-auto"
        />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
        <div>
          <h3 className="text-[0.975rem] font-medium tracking-[-0.02em]">
            {pick(category.name, locale)}
          </h3>
          <p className="mt-0.5 text-[0.8rem] text-muted">
            {category.count} {t("models")}
          </p>
        </div>
        <ArrowUpRightIcon className="h-[18px] w-[18px] text-muted transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
      </div>
    </Link>
  );
}
