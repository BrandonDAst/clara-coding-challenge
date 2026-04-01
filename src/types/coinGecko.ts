// ============================================================
// CoinGecko API — Derived Types
// Source: https://www.coingecko.com/api/documentation
// Rule: No `any`. Ambiguous fields use `unknown` + narrowing.
// ============================================================

import { CoinMarket } from "./coinMarket.type";

/** Unix timestamp in milliseconds */
export type UnixMs = number;
/** ISO 8601 date string, e.g. "2021-11-10T14:24:11.849Z" */
export type ISODateString = string;

// Columns available for client-side sorting
export type SortableColumn = keyof Pick<
  CoinMarket,
  | "market_cap_rank"
  | "name"
  | "current_price"
  | "price_change_percentage_24h"
  | "market_cap"
>;

export type SortDirection = "asc" | "desc";

export interface SortState {
  column: SortableColumn;
  direction: SortDirection;
}

// ------------------------------------------------------------
// API error shape
// ------------------------------------------------------------

export interface CoinGeckoError {
  status: {
    error_code: number;
    error_message: string;
  };
}

export function isCoinGeckoError(value: unknown): value is CoinGeckoError {
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value &&
    typeof (value as CoinGeckoError).status?.error_code === "number"
  );
}
