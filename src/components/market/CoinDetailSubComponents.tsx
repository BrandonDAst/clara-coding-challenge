"use client";

import { formatPrice } from "@/lib/formatter";
import { ChartDataPoint } from "@/types/marketChart.type";
import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ============================================================
// PriceHistoryChart
// ============================================================

interface PriceHistoryChartProps {
  data: ChartDataPoint[];
  isLoading: boolean;
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: ChartDataPoint }>;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0];
  return (
    <div className="rounded-lg border border-white/10 bg-zinc-900/95 backdrop-blur-sm px-3 py-2 shadow-xl text-xs">
      <p className="text-zinc-100">{point.payload.date}</p>
      <p className="font-semibold font-mono text-zinc-100 mt-0.5">
        {formatPrice(point.value)}
      </p>
    </div>
  );
}

export function PriceHistoryChart({ data, isLoading }: PriceHistoryChartProps) {
  if (isLoading) {
    return (
      <div
        className="h-48 rounded-lg bg-white/5 animate-pulse"
        aria-label="Loading price chart…"
        role="status"
      />
    );
  }

  // Determine if price trended up or down over 7 days
  const isPositive =
    data.length >= 2 ? data[data.length - 1].price >= data[0].price : true;
  const color = isPositive ? "#10b981" : "#ef4444";

  return (
    <div aria-label="7-day price history chart">
      <ResponsiveContainer width="100%" height={192}>
        <AreaChart
          data={data}
          margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 8, fill: "#71717a" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            fontFamily="var(--font-mono)"
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 8, fill: "#71717a" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) =>
              v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v.toFixed(2)}`
            }
            width={64}
            fontFamily="var(--font-mono)"
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill="url(#priceGradient)"
            dot={false}
            activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================
// CoinDescription
// ============================================================

interface CoinDescriptionProps {
  description: string;
}

const MAX_LENGTH = 300;

// Strip basic HTML tags that CoinGecko includes in descriptions
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

export function CoinDescription({ description }: CoinDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const cleaned = stripHtml(description);

  if (!cleaned.trim()) {
    return (
      <p className="text-sm font-mono text-zinc-500 italic">
        No description available.
      </p>
    );
  }

  const isLong = cleaned.length > MAX_LENGTH;
  const displayed =
    expanded || !isLong ? cleaned : cleaned.slice(0, MAX_LENGTH) + "…";

  return (
    <div>
      <p className="text-sm font-mono text-zinc-400 leading-relaxed">
        {displayed}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 transition-colors focus:outline-none focus-visible:underline"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
