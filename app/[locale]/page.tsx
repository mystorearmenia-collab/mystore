import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandStrip from "@/components/BrandStrip";
import SectionHeading from "@/components/SectionHeading";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import PromoBanner from "@/components/PromoBanner";
import Benefits from "@/components/Benefits";
import NewArrivals from "@/components/NewArrivals";
import StoreLocation from "@/components/StoreLocation";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ProductModalProvider } from "@/components/ProductModal";
import { categories, featuredProducts } from "@/lib/catalog";
import { routing, type Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("sections");

  return (
    <ProductModalProvider>
      <Header />

      <main>
        <Hero />
        <BrandStrip />

        <section className="section" id="categories">
          <div className="shell">
            <SectionHeading
              eyebrow={t("browseEyebrow")}
              title={t("categoriesTitle")}
              description={t("categoriesLede")}
              action={{ label: t("categoriesAction"), href: "/categories" }}
            />

            <div className="grid grid-cols-2 gap-[clamp(0.75rem,1.4vw,1.25rem)] lg:grid-cols-4">
              {categories.map((category, index) => (
                <Reveal key={category.id} delay={(index % 4) * 70}>
                  <CategoryCard category={category} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section pt-0" id="featured">
          <div className="shell">
            <SectionHeading
              eyebrow={t("featuredEyebrow")}
              title={t("featuredTitle")}
              description={t("featuredLede")}
              action={{ label: t("featuredAction"), href: "/products" }}
            />

            <div className="grid grid-cols-1 gap-[clamp(0.75rem,1.4vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product, index) => (
                <Reveal key={product.id} delay={(index % 4) * 70} className="h-full">
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <PromoBanner />
        <Benefits />
        <NewArrivals />
        <StoreLocation />
      </main>

      <Footer />
    </ProductModalProvider>
  );
}
