import { SortableColumn, SortState } from "@/types/coinGecko";
import { CoinMarket } from "@/types/coinMarket.type";
import { useState, useMemo } from "react";

// ------------------------------------------------------------
// useSort — client-side column sorting
// ------------------------------------------------------------

const DEFAULT_SORT: SortState = {
  column: "market_cap_rank",
  direction: "asc",
};

export function useSort(coins: CoinMarket[] | undefined) {
  const [sort, setSort] = useState<SortState>(DEFAULT_SORT);

  function toggleSort(column: SortableColumn) {
    setSort((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  }

  const sorted = useMemo(() => {
    if (!coins) return [];

    return [...coins].sort((a, b) => {
      const aVal = a[sort.column];
      const bVal = b[sort.column];

      let comparison = 0;

      if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else if (typeof aVal === "string" && typeof bVal === "string") {
        comparison = aVal.localeCompare(bVal);
      }

      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [coins, sort]);

  return { sorted, sort, toggleSort };
}

// ------------------------------------------------------------
// useSearch — real-time filter by name or symbol
// ------------------------------------------------------------

export function useSearch(coins: CoinMarket[]) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normQuery = query.trim().toLowerCase();
    if (!normQuery) return coins;

    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(normQuery) ||
        coin.symbol.toLowerCase().includes(normQuery),
    );
  }, [coins, query]);

  return { filtered, query, setQuery };
}
