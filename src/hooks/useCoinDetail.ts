import { coinGeckoFetch } from "@/lib/queryClient";
import { CoinDetail } from "@/types/coinDetail.type";
import { useQuery } from "@tanstack/react-query";

function getCoinDetailUrl(id: string) {
  return (
    `https://api.coingecko.com/api/v3/coins/${id}` +
    "?localization=false" +
    "&tickers=false" +
    "&community_data=false" +
    "&developer_data=false"
  );
}

function coinDetailQueryKey(id: string) {
  return ["coin", id] as const;
}

interface UseCoinDetailOptions {
  /** The coin id from CoinMarket.id — pass null/undefined when no coin is selected */
  coinId: string | null | undefined;
}

export function useCoinDetail({ coinId }: UseCoinDetailOptions) {
  return useQuery<CoinDetail, Error>({
    queryKey: coinId ? coinDetailQueryKey(coinId) : ["coin", null],
    queryFn: () => coinGeckoFetch<CoinDetail>(getCoinDetailUrl(coinId!)),
    // Only fetch when a coin is actually selected — avoids wasted API calls
    enabled: Boolean(coinId),
    // Detail data doesn't change as fast; keep it fresh for 2 minutes
    staleTime: 120_000,
  });
}
