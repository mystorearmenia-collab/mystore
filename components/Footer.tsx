import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import { navigation, store } from "@/lib/catalog";
import {
  FacebookIcon,
  InstagramIcon,
  PowerIcon,
  WhatsAppIcon,
} from "./icons";

const socials = [
  { label: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
  { label: "Facebook", icon: FacebookIcon, href: "https://facebook.com" },
  { label: "WhatsApp", icon: WhatsAppIcon, href: "https://wa.me/37410500900" },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const serviceLinks = t.raw("serviceLinks") as string[];
  const infoLinks = t.raw("infoLinks") as string[];
  const productLinks = navigation
    .filter((item) => item.key !== "home" && item.key !== "accessories")
    .map((item) => tNav(item.key));

  const columns = [
    { title: t("products"), links: productLinks },
    { title: t("service"), links: serviceLinks },
    { title: t("information"), links: infoLinks },
  ];

  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell py-[clamp(3rem,6vw,5rem)]">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)_1.1fr]">
          <div>
            <Logo className="text-[1.35rem]" />
            <p className="mt-4 max-w-[30ch] text-[0.85rem] leading-relaxed text-muted">
              {t("tagline")}
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-[color,border-color] duration-300 hover:border-[var(--orange-line)] hover:text-orange"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="text-[0.875rem] text-muted transition-colors duration-250 hover:text-ink"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              {t("contact")}
            </h3>
            <ul className="mt-5 space-y-3 text-[0.875rem]">
              <li className="text-muted">{store.address}</li>
              <li>
                <a
                  href={`tel:${store.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-orange"
                >
                  {store.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${store.email}`}
                  className="text-muted transition-colors hover:text-orange"
                >
                  {store.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
          <p className="flex items-center gap-2 text-[0.78rem] text-muted">
            <PowerIcon className="h-3.5 w-3.5 text-orange" />
            © {new Date().getFullYear()} MyStore. {t("rights")}
          </p>
          <p className="text-[0.78rem] text-muted">{t("reseller")}</p>
        </div>
      </div>
    </footer>
  );
}
