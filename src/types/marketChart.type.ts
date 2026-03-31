export type MarketChartPoint = [timestampMs: number, value: number];

export interface MarketChart {
  prices: MarketChartPoint[];
  market_caps: MarketChartPoint[];
  total_volumes: MarketChartPoint[];
}
