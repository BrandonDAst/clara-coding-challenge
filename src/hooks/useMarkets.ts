import { coinGeckoFetch } from "@/lib/queryClient";
import { CoinMarket } from "@/types/coinMarket.type";
import { useQuery } from "@tanstack/react-query";

const MARKETS_URL =
  "https://api.coingecko.com/api/v3/coins/markets" +
  "?vs_currency=usd" +
  "&order=market_cap_desc" +
  "&per_page=20" +
  "&page=1" +
  "&sparkline=true";

export const marketsQueryKey = ["markets"] as const;

export function useMarkets() {
  return useQuery<CoinMarket[], Error>({
    queryKey: marketsQueryKey,
    queryFn: () => coinGeckoFetch<CoinMarket[]>(MARKETS_URL),
    // Auto-refresh every 60 seconds without full page reload
    refetchInterval: 60_000,
    // Keep showing stale data while refetching in background
    placeholderData: (prev) => prev,
  });
}
