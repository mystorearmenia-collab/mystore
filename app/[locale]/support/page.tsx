import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { store, storeAddress } from "@/lib/catalog";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "support" });
  return { title: `${t("title")} — MyStore`, description: t("lede") };
}

export default async function SupportPage({ params }: PageProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("support");
  const tCategory = await getTranslations("category");
  const contacts = [
    { label: t("phone"), value: store.phone, href: `tel:${store.phone.replace(/\s/g, "")}` },
    { label: "WhatsApp", value: t("message"), href: store.whatsapp },
    { label: "Telegram", value: t("message"), href: store.telegram },
    { label: "Email", value: store.email, href: `mailto:${store.email}` },
  ];
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
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {contacts.map(({ label, value, href }) => <a key={label} href={href} {...(href.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-orange">
                <h2 className="text-lg font-semibold">{label}</h2>
                <p className="mt-3 break-words text-orange">{value}</p>
              </a>)}
            </div>
            <section className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold">{t("visit")}</h2>
              <p className="mt-3 text-muted">{storeAddress(locale as Locale)}</p>
              <h3 className="mt-6 font-semibold">{t("hours")}</h3>
              <p className="mt-3 text-muted">{t("monSat")}: 10:00–21:00</p>
              <p className="mt-2 text-muted">{t("sunday")}: 11:00–20:00</p>
            </section>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-orange">
              <Link href="/warranty" className="hover:underline">{t("warranty")}</Link>
              <Link href="/delivery" className="hover:underline">{t("delivery")}</Link>
              <Link href="/returns" className="hover:underline">{t("returns")}</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
