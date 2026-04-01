// "use client";

import { useSearch, useSort } from "@/hooks/useTabelControls";
import { CoinMarket } from "@/types/coinMarket.type";
import { EmptyState } from "../ui/FeedbackStates";
import { CoinSearch } from "./CoinSearch";
import { MarketTableRow } from "./MarketTableRow";
import { SortHeader } from "./SortHeader";

interface MarketTableProps {
  coins: CoinMarket[];
  onSelectCoin: (coin: CoinMarket) => void;
}

export function MarketTable({ coins, onSelectCoin }: MarketTableProps) {
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
        <p className="text-xs font-mono text-zinc-500 shrink-0">
          {query
            ? `${filtered.length} of ${coins.length} assets`
            : `${coins.length} assets · updates every 60s`}
        </p>
      </div>

      {/* Table wrapper — horizontal scroll on mobile */}
      <div className="rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
        <table
          role="table"
          className="w-full min-w-[540px] border-collapse text-sm"
          aria-label="Cryptocurrency market overview, sortable by column"
        >
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-mono font-semibold uppercase tracking-widest text-zinc-500 w-12"
              >
                #
              </th>

              <SortHeader
                column="name"
                label="Asset"
                sortState={sort}
                onSort={toggleSort}
                className="min-w-[160px]"
              />

              <SortHeader
                column="current_price"
                label="Price"
                sortState={sort}
                onSort={toggleSort}
                className="text-right"
              />

              <SortHeader
                column="price_change_percentage_24h"
                label="24h"
                sortState={sort}
                onSort={toggleSort}
                className="text-right"
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
                className="px-4 py-3 text-right text-xs font-mono font-semibold uppercase tracking-widest text-zinc-500 hidden md:table-cell"
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
