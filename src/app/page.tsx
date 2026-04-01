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

  const modalOpen = selectedCoin !== null;

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#080b12] text-zinc-100 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b12]"
    >
      <div inert={modalOpen}>
        <a
          href="#main-content"
          className="
            sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:m-0
            focus:inline-block focus:h-auto focus:w-auto focus:overflow-visible focus:px-4 focus:py-2
            focus:whitespace-normal focus:rounded-lg focus:bg-[#0f1117] focus:text-sm focus:font-mono
            focus:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-400
          "
        >
          Skip to main content
        </a>

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
          <p className="text-sm font-mono text-zinc-400 ml-8">
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
        </div>
      </div>

      <CoinDetailModal
        coin={selectedCoin}
        onClose={() => setSelectedCoin(null)}
      />
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
