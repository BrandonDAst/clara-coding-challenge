// "use client";

import { Currency } from "@/hooks/useMarkets";
import { useSearch, useSort } from "@/hooks/useTabelControls";
import { CoinMarket } from "@/types/coinMarket.type";
import { EmptyState } from "../ui/FeedbackStates";
import { CoinSearch } from "./CoinSearch";
import { MarketTableRow } from "./MarketTableRow";
import { SortHeader } from "./SortHeader";

interface MarketTableProps {
  coins: CoinMarket[];
  onSelectCoin: (coin: CoinMarket) => void;
  currency: Currency;
}

export function MarketTable({
  coins,
  onSelectCoin,
  currency,
}: MarketTableProps) {
  const { sorted, sort, toggleSort } = useSort(coins);
  const { filtered, query, setQuery } = useSearch(sorted);

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <CoinSearch
          value={query}
          onChange={setQuery}
          resultCount={filtered.length}
        />
        <p className="text-xs font-mono text-zinc-400 shrink-0">
          {query
            ? `${filtered.length} of ${coins.length} assets`
            : `${coins.length} assets · updates every 60s`}
        </p>
      </div>

      {/* Table wrapper — horizontal scroll on mobile */}
      <div className="rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
        <table
          role="table"
          className="w-full table-fixed min-w-0 border-collapse text-sm"
          aria-label="Cryptocurrency market overview, sortable by column"
        >
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th
                scope="col"
                className="w-9 px-2 py-3 sm:px-4 text-left text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400"
              >
                #
              </th>

              <SortHeader
                column="name"
                label="Asset"
                sortState={sort}
                onSort={toggleSort}
                className="min-w-0 w-[34%] max-w-38 sm:w-auto sm:max-w-none sm:min-w-[140px]"
              />

              <SortHeader
                column="current_price"
                label="Price"
                sortState={sort}
                onSort={toggleSort}
                className="text-right whitespace-nowrap w-[26%] sm:w-auto"
              />

              <SortHeader
                column="price_change_percentage_24h"
                label="24h"
                sortState={sort}
                onSort={toggleSort}
                className="text-right whitespace-nowrap w-[22%] sm:w-auto"
              />

              <SortHeader
                column="market_cap"
                label="Market Cap"
                sortState={sort}
                onSort={toggleSort}
                className="text-right hidden sm:table-cell"
              />

              <th
                scope="col"
                className="px-2 py-3 sm:px-4 text-right text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400 hidden md:table-cell"
              >
                7d
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((coin) => (
                <MarketTableRow
                  key={coin.id}
                  coin={coin}
                  onSelect={onSelectCoin}
                  currency={currency}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <EmptyState query={query} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
