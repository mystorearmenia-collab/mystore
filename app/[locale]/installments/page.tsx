import { pageMetadata } from "@/lib/seo";
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
  return pageMetadata(locale, "/installments", `${t("title")} — MyStore Armenia`, t("lede"));
}

export default async function InstallmentsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("installments");
  const tCategory = await getTranslations("category");
  const sections = t.raw("sections") as { title: string; items: string[] }[];
  const list = (items: string[]) => (
    <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-muted">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
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
            {sections.map((section) => (
              <section key={section.title} className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                {list(section.items)}
              </section>
            ))}
            <section className="mt-10">
              <h2 className="text-xl font-semibold">{t("banksTitle")}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {(t.raw("banks") as string[]).map((bank) => (
                  <li key={bank} className="rounded-xl border border-line bg-surface p-5 text-lg font-medium">{bank}</li>
                ))}
              </ul>
              <p className="mt-4 leading-relaxed text-muted">{t("banksNote")}</p>
            </section>
            <section className="mt-10">
              <h2 className="text-xl font-semibold">{t("storeTitle")}</h2>
              <p className="mt-4 leading-relaxed text-muted">{t("storeText")}</p>
              <p className="mt-3 leading-relaxed text-muted">{t("reviewText")}</p>
            </section>
            <section className="mt-10 rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold">{t("onlineTitle")}</h2>
              <p className="mt-4 leading-relaxed text-muted">{t("onlineText")}</p>
              {list(t.raw("onlineItems") as string[])}
              <p className="mt-4 leading-relaxed text-muted">{t("onlineNote")}</p>
              <a href={store.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">WhatsApp · 093 80 80 11</a>
            </section>
            <section className="mt-10">
              <h2 className="text-xl font-semibold">{t("approvalTitle")}</h2>
              {list(t.raw("approvalItems") as string[])}
            </section>
            <section className="mt-10 rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold">{t("contactTitle")}</h2>
              <p className="mt-4 text-muted">{t("address")}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="text-orange hover:underline">{store.phone}</a>
                <a href={store.whatsapp} target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">WhatsApp</a>
                <Link href="/" className="text-orange hover:underline">mystorearmenia.am</Link>
              </div>
              <h3 className="mt-6 font-medium">{t("hoursTitle")}</h3>
              <ul className="mt-2 space-y-1 text-muted">
                {(t.raw("hours") as string[]).map((hours) => <li key={hours}>{hours}</li>)}
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
