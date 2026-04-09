import { coinGeckoFetch } from "@/lib/queryClient";
import { CoinMarket } from "@/types/coinMarket.type";
import { useQuery } from "@tanstack/react-query";
import { useCurrencyStore } from "../store/useCurrency";

export type Currency = {
  code: string;
  label: string;
  symbol: string;
  locale: string;
};

export const CURRENCIES: Currency[] = [
  { code: "usd", label: "USD 🇺🇸", symbol: "$", locale: "en-US" },
  { code: "mxn", label: "MXN 🇲🇽", symbol: "$", locale: "es-MX" },
  { code: "eur", label: "EUR 🇪🇸", symbol: "€", locale: "de-DE" },
  // { code: "inr", label: "INR 🇮🇳", symbol: "₹", locale: "en-IN" },
  // { code: "jpy", label: "JPY 🇯🇵", symbol: "¥", locale: "ja-JP" },
  // { code: "gbp", label: "GBP 🇬🇧", symbol: "£", locale: "en-GB" },
  // { code: "cop", label: "COP", symbol: "$", locale: "es-CO" },
];

const buildMarketsUrl = (currencyCode: string) =>
  "https://api.coingecko.com/api/v3/coins/markets" +
  `?vs_currency=${currencyCode}` +
  "&order=market_cap_desc" +
  "&per_page=20" +
  "&page=1" +
  "&sparkline=true";

export function useMarkets() {
  const { currency } = useCurrencyStore();

  return useQuery<CoinMarket[], Error>({
    queryKey: ["markets", currency.code],
    queryFn: () => coinGeckoFetch<CoinMarket[]>(buildMarketsUrl(currency.code)),
    refetchInterval: 60_000,
    placeholderData: (prev) => prev,
  });
}
