"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export default function LocaleSwitch({ className = "" }: { className?: string }) {
  const t = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={`flex items-center gap-0.5 ${className}`} role="group" aria-label={t("switch")}>
      {routing.locales.map((code) => (
        <button
          key={code}
          onClick={() => router.replace(pathname, { locale: code as Locale })}
          aria-current={locale === code}
          className="rounded-full px-2 py-1 text-[0.75rem] font-medium uppercase tracking-[0.04em] transition-colors duration-200"
          style={{
            color: locale === code ? "var(--orange)" : "var(--text-secondary)",
          }}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
