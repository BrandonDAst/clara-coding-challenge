import { SortableColumn, SortState } from "@/types/coinGecko";
import { CoinMarket } from "@/types/coinMarket.type";
import { useEffect, useMemo, useState } from "react";

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
// useDebounce — retrasa un valor hasta que deje de cambiar
// ------------------------------------------------------------

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

// ------------------------------------------------------------
// useSearch — real-time filter by name or symbol
// ------------------------------------------------------------

export function useSearch(coins: CoinMarket[]) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const filtered = useMemo(() => {
    const normQuery = debouncedQuery.trim().toLowerCase();
    if (!normQuery) return coins;

    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(normQuery) ||
        coin.symbol.toLowerCase().includes(normQuery),
    );
  }, [coins, debouncedQuery]);

  return { filtered, query, setQuery };
}
