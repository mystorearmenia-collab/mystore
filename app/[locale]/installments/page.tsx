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
  const t = await getTranslations({ locale, namespace: "installments" });
  return { title: `${t("title")} — MyStore`, description: t("lede") };
}

export default async function InstallmentsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("installments");
  const tCategory = await getTranslations("category");
  return (
    <>
      <Header />
      <main className="pt-[72px]">
        <div className="shell section">
          <Link href="/" className="mb-8 inline-flex text-[0.85rem] text-muted transition-colors hover:text-orange">← {tCategory("backHome")}</Link>
          <div className="max-w-[70ch]">
            <p className="eyebrow mb-3">MyStore</p>
            <h1 className="h2">{t("title")}</h1>
            <p className="lede mt-5">{t("lede")}</p>
            <section className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold">IDBank / Idram Rocket Line 0%</h2>
              <p className="mt-3 text-muted">{t("term")}</p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                {["downPayment", "annual", "service"].map((key) => <div key={key}><dt className="text-sm text-muted">{t(key)}</dt><dd className="mt-2 text-3xl font-semibold text-orange">0%</dd></div>)}
              </dl>
              <p className="mt-6 leading-relaxed text-muted">{t("rocketHow")}</p>
            </section>
            <section className="mt-8">
              <h2 className="text-xl font-semibold">{t("otherBanks")}</h2>
              <p className="mt-4 text-lg">AEB · ACBA · Ameriabank</p>
              <p className="mt-3 leading-relaxed text-muted">{t("otherTerms")}</p>
            </section>
            <p className="mt-6 leading-relaxed text-muted">{t("approval")}</p>
            <section className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold">{t("contactTitle")}</h2>
              <p className="mt-3 text-muted">{t("contact")}</p>
              <div className="mt-5 flex flex-wrap gap-4">
                <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="text-orange hover:underline">{store.phone}</a>
                <a href={store.whatsapp} target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">WhatsApp</a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
