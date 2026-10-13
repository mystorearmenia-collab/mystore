import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreLocation from "@/components/StoreLocation";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: `${t("title")} — MyStore`, description: t("lede") };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tCategory = await getTranslations("category");
  return (
    <>
      <Header />
      <main className="pt-[72px]">
        <div className="shell section pb-0">
          <Link href="/" className="mb-8 inline-flex text-[0.85rem] text-muted transition-colors hover:text-orange">← {tCategory("backHome")}</Link>
          <div className="max-w-[70ch]">
            <p className="eyebrow mb-3">MyStore</p>
            <h1 className="h2">{t("title")}</h1>
            <p className="lede mt-5">{t("lede")}</p>
            <p className="mt-6 leading-relaxed text-muted">{t("range")}</p>
            <p className="mt-4 leading-relaxed text-muted">{t("warrantyText")}</p>
            <p className="mt-4 leading-relaxed text-muted">{t("deliveryText")}</p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-orange">
              <Link href="/warranty" className="hover:underline">{t("warranty")}</Link>
              <Link href="/delivery" className="hover:underline">{t("delivery")}</Link>
              <Link href="/support" className="hover:underline">{t("support")}</Link>
            </div>
          </div>
        </div>
        <StoreLocation />
      </main>
      <Footer />
    </>
  );
}
