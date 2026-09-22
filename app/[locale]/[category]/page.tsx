import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { ProductModalProvider } from "@/components/ProductModal";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { categories, getCategory, pick, productsForCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((category) => ({ locale, category: category.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category: categoryId } = await params;
  const category = getCategory(categoryId);
  if (!category) return {};

  const name = pick(category.name, locale as Locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: `${name} — MyStore`, description: t("description") };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: categoryId } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  const category = getCategory(categoryId);
  if (!category) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("category");
  const items = productsForCategory(categoryId);
  const name = pick(category.name, locale as Locale);

  return (
    <ProductModalProvider>
      <Header />

      <main className="pt-[72px]">
        <div className="shell section">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[0.85rem] text-muted transition-colors hover:text-orange"
          >
            ← {t("backHome")}
          </Link>

          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">MyStore</p>
              <h1 className="h2">{name}</h1>
            </div>
            <p className="text-[0.9rem] text-muted">
              {items.length} {t("count")}
            </p>
          </div>

          {items.length === 0 ? (
            <p className="lede max-w-[46ch]">{t("empty")}</p>
          ) : (
            <div className="grid grid-cols-1 gap-[clamp(0.75rem,1.4vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-4">
              {items.map((product, index) => (
                <Reveal key={product.id} delay={(index % 4) * 70} className="h-full">
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </ProductModalProvider>
  );
}
