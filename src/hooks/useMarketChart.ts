import { coinGeckoFetch } from "@/lib/queryClient";
import { ChartDataPoint, MarketChart } from "@/types/marketChart.type";
import { useQuery } from "@tanstack/react-query";

function getMarketChartUrl(id: string) {
  return (
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart` +
    "?vs_currency=usd" +
    "&days=7"
  );
}

export function marketChartQueryKey(id: string) {
  return ["coin", id, "chart"] as const;
}

/**
 * Transforms raw PricePoint[] into a shape Recharts can consume directly.
 * Keeps the transformation co-located with the fetch — components stay dumb.
 */
function transformChartData(raw: MarketChart): ChartDataPoint[] {
  return raw.prices.map(([timestamp, price]) => ({
    timestamp,
    date: new Date(timestamp).toLocaleDateString("en-US", {
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
  return useQuery<ChartDataPoint[], Error>({
    queryKey: coinId ? marketChartQueryKey(coinId) : ["coin", null, "chart"],
    queryFn: async () => {
      const raw = await coinGeckoFetch<MarketChart>(getMarketChartUrl(coinId!));
      return transformChartData(raw);
    },
    enabled: Boolean(coinId),
    // Chart data for 7 days doesn't change minute-to-minute
    staleTime: 300_000, // 5 minutes
  });
}
