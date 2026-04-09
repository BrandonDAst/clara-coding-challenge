import { formatMarketCap, formatPercent, formatPrice } from "@/lib/formatter";
import { useCurrencyStore } from "@/store/useCurrency";
import { CoinMarket } from "@/types/coinMarket.type";
import Image from "next/image";
import { SparklineChart } from "./SparklineChart";

interface MarketTableRowProps {
  coin: CoinMarket;
  onSelect: (coin: CoinMarket) => void;
}

export function MarketTableRow({ coin, onSelect }: MarketTableRowProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;
  const { currency } = useCurrencyStore();

  function handleActivate() {
    onSelect(coin);
  }

  return (
    <tr
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-label={`${coin.name}, price ${formatPrice(coin.current_price, currency)}, ${formatPercent(coin.price_change_percentage_24h)} in 24 hours. Press Enter or Space for details.`}
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
        focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400
      "
    >
      {/* Rank */}
      <td className="w-9 px-2 py-3.5 sm:px-4 text-zinc-400 text-sm font-mono tabular-nums">
        {coin.market_cap_rank}
      </td>

      {/* Name + Icon */}
      <td className="min-w-0 max-w-38 px-2 py-3.5 sm:px-4 sm:max-w-none">
        <div className="flex items-center gap-2 min-w-0 sm:gap-3">
          <Image
            src={coin.image}
            alt={`${coin.name} logo`}
            width={28}
            height={28}
            sizes="28px"
            className="size-6 shrink-0 rounded-full sm:size-7"
          />
          <div className="min-w-0">
            <p className="text-sm font-mono font-semibold text-zinc-100 truncate leading-tight">
              {coin.name}
            </p>
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider truncate">
              {coin.symbol}
            </p>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-2 py-3.5 sm:px-4 text-sm font-mono tabular-nums text-zinc-100 text-right whitespace-nowrap">
        {formatPrice(coin.current_price, currency)}
        <span className="ml-1 text-xs uppercase text-zinc-400 tracking-wider">{currency?.code ?? ""}</span>
      </td>

      {/* 24h Change */}
      <td className="px-2 py-3.5 sm:px-4 text-right font-mono whitespace-nowrap">
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
      <td className="px-2 py-3.5 sm:px-4 text-sm font-mono tabular-nums text-zinc-300 text-right hidden sm:table-cell whitespace-nowrap">
        {formatMarketCap(coin.market_cap, currency)}
      </td>

      {/* Sparkline */}
      <td className="px-2 py-3.5 sm:px-4 text-right hidden md:table-cell">
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
