// ============================================================
// Formatters — all number/date formatting in one place
// ============================================================

import { Currency } from "@/hooks/useMarkets";

const LOCALE_MAP: Record<Currency, string> = {
  usd: "en-US",
  mxn: "es-MX",
  eur: "de-DE",
};

/**
 * $45,231.12
 */
export function formatPrice(value: number, currency: Currency): string {
  const locale = LOCALE_MAP[currency];
  const fractionDigits =
    value < 0.01
      ? { minimumFractionDigits: 4, maximumFractionDigits: 8 }
      : { minimumFractionDigits: 2, maximumFractionDigits: 2 };

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
    ...fractionDigits,
  }).format(value);
}

/**
 * $1.2T, $340B, $4.5M
 */
/**
 * $1.2T / $340B MXN / 1,2 Mrd. €
 */
export function formatMarketCap(value: number, currency: Currency): string {
  return new Intl.NumberFormat(LOCALE_MAP[currency], {
    style: "currency",
    currency: currency.toUpperCase(),
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * +2.45% / -1.23%
 */
export function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Nov 10, 2021
 */
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Truncates description to n chars, respecting word boundaries
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  // Remove trailing whitespace and add ellipsis
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}
