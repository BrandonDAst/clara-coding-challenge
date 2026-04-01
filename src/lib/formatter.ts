// ============================================================
// Formatters — all number/date formatting in one place
// ============================================================

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const USD_COMPACT = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});

/**
 * $45,231.12
 */
export function formatPrice(value: number): string {
  // For very small prices (e.g. SHIB), show more decimals
  if (value < 0.01) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 4,
      maximumFractionDigits: 8,
    }).format(value);
  }
  return USD.format(value);
}

/**
 * $1.2T, $340B, $4.5M
 */
export function formatMarketCap(value: number): string {
  return USD_COMPACT.format(value);
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
