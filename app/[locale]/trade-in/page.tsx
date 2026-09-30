import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeInCalculator from "@/components/TradeInCalculator";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { categories, pick, store } from "@/lib/catalog";
import { tradeInModels, tradeInProducts } from "@/lib/tradein";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tradeIn" });
  return { title: `${t("title")} — MyStore`, description: t("lede") };
}

export default async function TradeInPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("tradeIn");
  const tCategory = await getTranslations("category");

  const usedCategories = categories
    .filter((c) => tradeInProducts.some((p) => p.cats.includes(c.id)))
    .map((c) => ({ id: c.id, name: pick(c.name, locale as Locale) }));

  return (
    <>
      <Header />

      <main className="pt-[72px]">
        <div className="shell section">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[0.85rem] text-muted transition-colors hover:text-orange"
          >
            ← {tCategory("backHome")}
          </Link>

          <div className="mb-10 max-w-[60ch]">
            <p className="eyebrow mb-3">{t("eyebrow")}</p>
            <h1 className="h2">{t("title")}</h1>
            <p className="lede mt-5">{t("lede")}</p>
          </div>

          <TradeInCalculator
            categories={usedCategories}
            products={tradeInProducts}
            models={tradeInModels}
            whatsapp={store.whatsapp}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
