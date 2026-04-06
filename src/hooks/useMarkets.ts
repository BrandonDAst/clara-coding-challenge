import { coinGeckoFetch } from "@/lib/queryClient";
import { CoinMarket } from "@/types/coinMarket.type";
import { useQuery } from "@tanstack/react-query";

export type Currency = "usd" | "mxn" | "eur";

const buildMarketsUrl = (currency: Currency) =>
  "https://api.coingecko.com/api/v3/coins/markets" +
  `?vs_currency=${currency}` +
  "&order=market_cap_desc" +
  "&per_page=20" +
  "&page=1" +
  "&sparkline=true";

export const marketsQueryKey = (currency: Currency) =>
  ["markets", currency] as const;

export function useMarkets(currency: Currency = "usd") {
  return useQuery<CoinMarket[], Error>({
    queryKey: marketsQueryKey(currency),
    queryFn: () => coinGeckoFetch<CoinMarket[]>(buildMarketsUrl(currency)),
    refetchInterval: 60_000,
    placeholderData: (prev) => prev,
  });
}
