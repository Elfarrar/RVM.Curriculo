import { LANG } from "./i18n-raw.js";

export type Locale = "pt" | "en";

export const t = LANG as Record<Locale, Record<string, string>>;

export function tr(locale: Locale, key: string, fallback?: string): string {
  return t[locale]?.[key] ?? fallback ?? key;
}
