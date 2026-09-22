import { Link } from "@/i18n/navigation";
import { brands } from "@/lib/catalog";

export default function BrandStrip() {
  return (
    <section className="border-y border-line">
      <div className="shell edge-fade">
        <ul className="rail items-center justify-between gap-x-10 py-7 md:gap-x-4">
          {brands.map((brand) => (
            <li key={brand}>
              <Link
                href={`/brand/${brand.toLowerCase()}`}
                className="block px-2 text-[1.05rem] font-medium tracking-[-0.02em] text-muted opacity-70 transition-[color,opacity] duration-300 hover:text-orange hover:opacity-100"
              >
                {brand}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
