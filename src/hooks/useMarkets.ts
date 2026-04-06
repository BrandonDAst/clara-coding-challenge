import { coinGeckoFetch } from "@/lib/queryClient";
import { CoinMarket } from "@/types/coinMarket.type";
import { useQuery } from "@tanstack/react-query";

export type Currency = {
  code: string;
  label: string;
  symbol: string;
  locale: string;
};
export const CURRENCIES: Currency[] = [
  { code: "usd", label: "USD", symbol: "$", locale: "en-US" },
  { code: "mxn", label: "MXN", symbol: "$", locale: "es-MX" },
  { code: "eur", label: "EUR", symbol: "€", locale: "de-DE" },
  { code: "cop", label: "COP", symbol: "$", locale: "es-CO" },
];

const buildMarketsUrl = (currencyCode: string) =>
  "https://api.coingecko.com/api/v3/coins/markets" +
  `?vs_currency=${currencyCode}` +
  "&order=market_cap_desc" +
  "&per_page=20" +
  "&page=1" +
  "&sparkline=true";

export const marketsQueryKey = (currencyCode: string) =>
  ["markets", currencyCode] as const;

export function useMarkets(currencyCode: string = "usd") {
  return useQuery<CoinMarket[], Error>({
    queryKey: marketsQueryKey(currencyCode),
    queryFn: () => coinGeckoFetch<CoinMarket[]>(buildMarketsUrl(currencyCode)),
    refetchInterval: 60_000,
    placeholderData: (prev) => prev,
  });
}
