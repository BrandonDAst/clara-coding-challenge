import { formatMarketCap, formatPercent, formatPrice } from "@/lib/formatter";
import { CoinMarket } from "@/types/coinMarket.type";
import { SparklineChart } from "./SparklineChart";

interface MarketTableRowProps {
  coin: CoinMarket;
  onSelect: (coin: CoinMarket) => void;
}

export function MarketTableRow({ coin, onSelect }: MarketTableRowProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  function handleActivate() {
    onSelect(coin);
  }

  return (
    <tr
      tabIndex={0}
      role="row"
      aria-label={`${coin.name}, price ${formatPrice(coin.current_price)}, ${formatPercent(coin.price_change_percentage_24h)} in 24 hours. Press Enter for details.`}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      className="
        group border-b border-white/5 cursor-pointer
        transition-colors duration-150
        hover:bg-white/5 focus:bg-white/5
        focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500/60
      "
    >
      {/* Rank */}
      <td className="px-4 py-3.5 text-zinc-500 text-sm font-mono tabular-nums">
        {coin.market_cap_rank}
      </td>

      {/* Name + Icon */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={coin.image}
            alt={`${coin.name} logo`}
            width={28}
            height={28}
            className="rounded-full shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-mono font-semibold text-zinc-100 truncate leading-tight">
              {coin.name}
            </p>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              {coin.symbol}
            </p>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-3.5 text-sm font-mono tabular-nums text-zinc-100 text-right">
        {formatPrice(coin.current_price)}
      </td>

      {/* 24h Change */}
      <td className="px-4 py-3.5 text-right font-mono">
        <span
          className={`
            inline-flex items-center justify-end gap-1 text-sm font-mono tabular-nums font-medium
            ${isPositive ? "text-emerald-400" : "text-red-400"}
          `}
          aria-label={`${isPositive ? "up" : "down"} ${Math.abs(coin.price_change_percentage_24h).toFixed(2)} percent`}
        >
          {/* Icon + text for color-blind accessibility */}
          <span aria-hidden="true">{isPositive ? "▲" : "▼"}</span>
          {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </span>
      </td>

      {/* Market Cap */}
      <td className="px-4 py-3.5 text-sm font-mono tabular-nums text-zinc-300 text-right hidden sm:table-cell">
        {formatMarketCap(coin.market_cap)}
      </td>

      {/* Sparkline */}
      <td className="px-4 py-3.5 text-right hidden md:table-cell">
        <div className="flex justify-end">
          <SparklineChart
            prices={coin.sparkline_in_7d.price}
            isPositive={isPositive}
          />
        </div>
      </td>
    </tr>
  );
}
