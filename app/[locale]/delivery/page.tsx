import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { store } from "@/lib/catalog";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "delivery" });
  return { title: `${t("title")} — MyStore`, description: t("lede") };
}

export default async function DeliveryPage({ params }: PageProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("delivery");
  const tCategory = await getTranslations("category");
  return (
    <>
      <Header />
      <main className="pt-[72px]">
        <div className="shell section">
          <Link href="/" className="mb-8 inline-flex text-[0.85rem] text-muted transition-colors hover:text-orange">
            ← {tCategory("backHome")}
          </Link>
          <div className="max-w-[70ch]">
            <p className="eyebrow mb-3">MyStore</p>
            <h1 className="h2">{t("title")}</h1>
            <p className="lede mt-5">{t("lede")}</p>
            <p className="mt-6 leading-relaxed text-muted">{t("details")}</p>
            <section className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold">{t("timeTitle")}</h2>
              <p className="mt-3 text-muted">{t("timeText")}</p>
              <p className="mt-6 text-muted">{t("contact")}</p>
              <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="mt-3 inline-flex text-orange hover:underline">{store.phone}</a>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
