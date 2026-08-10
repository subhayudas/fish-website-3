import type { Locale } from "@/lib/content";

export const LOCALE_STORAGE_KEY = "ps-locale";
export const LOCALE_SCROLL_KEY = "ps-scroll-y";

export function readStoredLocale(): Locale | null {
  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return value === "en" || value === "fr" ? value : null;
  } catch {
    return null;
  }
}

export function writeStoredLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore storage failures (private mode, blocked storage, etc.).
  }
}

export function stashScrollPosition() {
  try {
    window.sessionStorage.setItem(LOCALE_SCROLL_KEY, String(window.scrollY));
  } catch {
    // Ignore storage failures.
  }
}

export function restoreStashedScrollPosition() {
  try {
    const raw = window.sessionStorage.getItem(LOCALE_SCROLL_KEY);
    if (raw == null) return;
    window.sessionStorage.removeItem(LOCALE_SCROLL_KEY);
    const y = Number(raw);
    if (!Number.isFinite(y)) return;
    window.scrollTo(0, y);
  } catch {
    // Ignore storage failures.
  }
}
