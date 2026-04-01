"use client";

import { CoinDetailModal } from "@/components/market/CoinModal";
import { MarketTable } from "@/components/market/MarketTable";
import { ErrorMessage, SkeletonTable } from "@/components/ui/FeedbackStates";
import { useMarkets } from "@/hooks/useMarkets";
import { queryClient } from "@/lib/queryClient";
import { CoinMarket } from "@/types/coinMarket.type";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// ── Inner component: has access to QueryClient context ──────

function Dashboard() {
  const [selectedCoin, setSelectedCoin] = useState<CoinMarket | null>(null);
  const { data: coins, isLoading, error, refetch } = useMarkets();

  return (
    <main className="min-h-screen bg-[#080b12] text-zinc-100">
      {/* Background grid texture */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <span
              className="text-emerald-400 font-mono text-lg"
              aria-hidden="true"
            >
              ◈
            </span>
            <h1 className="text-2xl font-mono font-bold tracking-tight text-zinc-100">
              Clara Market
            </h1>
          </div>
          <p className="text-sm font-mono text-zinc-500 ml-8">
            Top 20 cryptocurrencies by market cap
          </p>
        </header>

        {/* Main content */}
        {isLoading ? (
          <SkeletonTable />
        ) : error ? (
          <ErrorMessage error={error} onRetry={refetch} />
        ) : coins ? (
          <MarketTable coins={coins} onSelectCoin={setSelectedCoin} />
        ) : null}

        {/* Modal */}
        <CoinDetailModal
          coin={selectedCoin}
          onClose={() => setSelectedCoin(null)}
        />
      </div>
    </main>
  );
}

// ── Root export: provides QueryClient ───────────────────────

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
