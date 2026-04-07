import { coinGeckoFetch } from "@/lib/queryClient";
import { useCurrencyStore } from "@/store/useCurrency";
import { ChartDataPoint, MarketChart } from "@/types/marketChart.type";
import { useQuery } from "@tanstack/react-query";

function getMarketChartUrl(id: string, currencyCode: string) {
  return (
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart` +
    `?vs_currency=${currencyCode}` +
    "&days=7"
  );
}

/**
 * Transforms raw PricePoint[] into a shape Recharts can consume directly.
 * Keeps the transformation co-located with the fetch — components stay dumb.
 */
function transformChartData(
  raw: MarketChart,
  currencyLocale: string,
): ChartDataPoint[] {
  return raw.prices.map(([timestamp, price]) => ({
    timestamp,
    date: new Date(timestamp).toLocaleDateString(currencyLocale, {
      month: "short",
      day: "numeric",
    }),
    price,
  }));
}

interface UseMarketChartOptions {
  coinId: string | null | undefined;
}

export function useMarketChart({ coinId }: UseMarketChartOptions) {
  const { currency } = useCurrencyStore();

  return useQuery<ChartDataPoint[], Error>({
    queryKey: coinId
      ? ["coin", coinId, "chart", currency.code]
      : ["coin", null, "chart", currency.code],
    queryFn: async () => {
      const raw = await coinGeckoFetch<MarketChart>(
        getMarketChartUrl(coinId!, currency.code),
      );
      return transformChartData(raw, currency.locale);
    },
    enabled: Boolean(coinId),
    // Chart data for 7 days doesn't change minute-to-minute
    staleTime: 300_000, // 5 minutes
  });
}
