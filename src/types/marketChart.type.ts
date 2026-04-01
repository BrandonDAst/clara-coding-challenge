import { UnixMs } from "./coinGecko";

export type PricePoint = [UnixMs, number];
export type VolumePoint = [UnixMs, number];
export type MarketCapPoint = [UnixMs, number];

export interface MarketChart {
  prices: PricePoint[];
  market_caps: MarketCapPoint[];
  total_volumes: VolumePoint[];
}

/**
 * Transformed shape used by the chart component — easier to work with in Recharts.
 */
export interface ChartDataPoint {
  timestamp: UnixMs;
  /** Formatted date label, e.g. "Apr 25" */
  date: string;
  price: number;
}
