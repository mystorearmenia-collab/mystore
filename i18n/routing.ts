import { defineRouting } from "next-intl/routing";

/**
 * MyStore is a Yerevan shop first — Armenian is the default and un-prefixed
 * (`/`, not `/hy`), Russian and English live under their own prefix.
 */
export const routing = defineRouting({
  locales: ["hy", "ru", "en"],
  defaultLocale: "hy",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
