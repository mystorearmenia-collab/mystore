import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogSearch from "@/components/CatalogSearch";
import { ProductModalProvider } from "@/components/ProductModal";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalogSearch" });
  return { title: `${t("title")} — MyStore` };
}
export default async function SearchPage({ params }: PageProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("catalogSearch");
  return (
    <ProductModalProvider>
      <Header />
      <main className="pt-[72px]">
        <div className="shell section">
          <p className="eyebrow mb-3">MyStore</p>
          <h1 className="h2">{t("title")}</h1>
          <Suspense fallback={<p className="mt-8 text-muted">{t("hint")}</p>}>
            <CatalogSearch />
          </Suspense>
        </div>
      </main>
      <Footer />
    </ProductModalProvider>
  );
}
