"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import LocaleSwitch from "./LocaleSwitch";
import { navigation } from "@/lib/nav";
import {
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "./icons";

export default function Header() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(5,5,5,0.82)" : "rgba(5,5,5,0)",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        }}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="MyStore" className="shrink-0">
            <Logo className="text-[1.35rem]" />
          </Link>

          <nav className="hidden items-center gap-4 2xl:gap-6 xl:flex">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                data-active={index === 0}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <LocaleSwitch className="mr-1 hidden sm:flex" />
            <button className="icon-button" aria-label={t("header.search")}>
              <SearchIcon className="h-5 w-5" />
            </button>
            <button className="icon-button hidden sm:inline-grid" aria-label={t("header.account")}>
              <UserIcon className="h-5 w-5" />
            </button>
            <button className="icon-button hidden sm:inline-grid" aria-label={t("header.favorites")}>
              <HeartIcon className="h-5 w-5" />
            </button>
            <button
              className="icon-button xl:hidden"
              aria-label={t("header.menu")}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile navigation */}
      <div
        className={`fixed inset-0 z-[60] bg-background transition-[opacity,visibility] duration-400 xl:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between">
          <Logo className="text-[1.35rem]" />
          <button
            className="icon-button"
            aria-label={t("header.close")}
            onClick={() => setMenuOpen(false)}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="shell mt-6 flex flex-col">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between border-b border-line py-5 text-[1.6rem] font-medium tracking-[-0.03em] transition-[transform,opacity] duration-500"
              style={{
                transitionDelay: menuOpen ? `${80 + index * 35}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "none" : "translateY(14px)",
              }}
            >
              {t(`nav.${item.key}`)}
              <span className="text-muted transition-colors group-hover:text-orange">
                →
              </span>
            </Link>
          ))}
        </nav>

        <div className="shell mt-8">
          <LocaleSwitch className="mb-6 gap-2" />
          <div className="flex gap-3">
            <button className="btn btn-primary flex-1">{t("header.shopNow")}</button>
            <button className="btn btn-secondary flex-1">{t("header.account")}</button>
          </div>
        </div>
      </div>
    </>
  );
}
