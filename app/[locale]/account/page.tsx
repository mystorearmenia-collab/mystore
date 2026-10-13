import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccountForm from "@/components/AccountForm";
import { routing, type Locale } from "@/i18n/routing";
export const dynamic = "force-dynamic";
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "account" });
  return { title: `${t("title")} — MyStore`, robots: { index: false, follow: false } };
}
export default async function AccountPage({ params }: PageProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("account");
  const enabled = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY && process.env.RESEND_API_KEY && process.env.REGISTRATION_EMAIL_FROM);
  return <><Header /><main className="pt-[72px]"><div className="shell section"><p className="eyebrow mb-3">MyStore</p><h1 className="h2">{t("title")}</h1><AccountForm enabled={enabled} /></div></main><Footer /></>;
}
