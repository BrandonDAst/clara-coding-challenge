"use client";

import { useCoinDetail } from "@/hooks/useCoinDetail";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useMarketChart } from "@/hooks/useMarketChart";
import { formatDate, formatMarketCap, formatPrice } from "@/lib/formatter";
import { useDayRangeStore } from "@/store/useDayRange";
import { useCurrencyStore } from "@/store/useCurrency";
import { CoinMarket } from "@/types/coinMarket.type";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { CoinDescription, PriceHistoryChart } from "./CoinDetailSubComponents";

interface CoinDetailModalProps {
  coin: CoinMarket | null;
  onClose: () => void;
}

export function CoinDetailModal({ coin, onClose }: CoinDetailModalProps) {
  const isOpen = Boolean(coin);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const { currency } = useCurrencyStore();
  const { days } = useDayRangeStore();

  const { data: detail, isLoading: detailLoading } = useCoinDetail({
    coinId: coin?.id,
  });

  const { data: chartData = [], isLoading: chartLoading } = useMarketChart({
    coinId: coin?.id,
  });

  useFocusTrap(modalPanelRef, isOpen);

  useEffect(() => {
    if (isOpen && coin) {
      if (!returnFocusRef.current) {
        returnFocusRef.current = document.activeElement as HTMLElement;
      }
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      returnFocusRef.current?.focus?.();
      returnFocusRef.current = null;
    }
  }, [isOpen, coin]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !coin) return null;

  const isPositive = coin.price_change_percentage_24h >= 0;
  const marketData = detail?.market_data;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="
          fixed z-50 inset-0 flex items-center justify-center p-4
          pointer-events-none
        "
      >
        <div
          ref={modalPanelRef}
          className="
            relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
            bg-[#0f1117] border border-white/10 rounded-2xl shadow-2xl
            pointer-events-auto
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#0f1117] border-b border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              <Image
                src={coin.image}
                alt={`${coin.name} logo`}
                width={36}
                height={36}
                sizes="36px"
                className="rounded-full shrink-0"
              />
              <div className="min-w-0">
                <h2
                  id="modal-title"
                  className="text-base font-mono font-bold text-zinc-100 leading-tight truncate"
                >
                  {coin.name}
                </h2>
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  {coin.symbol}
                </p>
              </div>
            </div>

            <button
              type="button"
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close detail panel"
              className="
                shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                text-zinc-400 hover:text-zinc-100 hover:bg-white/10
                focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
                transition-colors duration-150
              "
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 2l12 12M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div id="modal-description" className="px-6 py-5 flex flex-col gap-6">
            {/* Price + 24h change */}
            <div className="flex items-end gap-4 flex-wrap">
              <span className="text-3xl font-bold font-mono tabular-nums text-zinc-100">
                {formatPrice(coin.current_price, currency)}
              </span>
              <span
                className={`
                  inline-flex items-center gap-1 text-sm font-mono font-semibold mb-1
                  ${isPositive ? "text-emerald-400" : "text-red-400"}
                `}
                aria-label={`${isPositive ? "up" : "down"} ${Math.abs(coin.price_change_percentage_24h).toFixed(2)} percent in 24 hours`}
              >
                <span aria-hidden="true">{isPositive ? "▲" : "▼"}</span>
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}% (24h)
              </span>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Market Cap",
                  value: formatMarketCap(coin.market_cap, currency),
                },
                {
                  label: "24h Volume",
                  value: marketData
                    ? formatMarketCap(
                        marketData.total_volume[currency.code],
                        currency,
                      )
                    : "—",
                },
                {
                  label: "ATH",
                  value: marketData
                    ? formatPrice(marketData.ath[currency.code], currency)
                    : "—",
                  sub: marketData
                    ? formatDate(marketData.ath_date[currency.code])
                    : undefined,
                },
                {
                  label: "ATL",
                  value: marketData
                    ? formatPrice(marketData.atl[currency.code], currency)
                    : "—",
                  sub: marketData
                    ? formatDate(marketData.atl_date[currency.code])
                    : undefined,
                },
              ].map(({ label, value, sub }) => (
                <div
                  key={label}
                  className="rounded-lg bg-white/5 border border-white/5 px-3 py-3"
                >
                  <p className="text-xs font-mono text-zinc-400 mb-1">
                    {label}
                  </p>
                  <p className="text-sm font-mono font-semibold text-zinc-100 tabular-nums">
                    {detailLoading &&
                    label !== "Market Cap" &&
                    label !== "24h Volume" ? (
                      <span className="inline-block w-20 h-3 rounded bg-white/10 animate-pulse" />
                    ) : (
                      value
                    )}
                  </p>
                  {sub && (
                    <p className="text-xs font-mono text-zinc-500 mt-0.5">
                      {sub}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Price history chart */}
            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400 mb-3">
                Price — last {days} {days === 1 ? "day" : "days"}
              </h3>
              <PriceHistoryChart data={chartData} isLoading={chartLoading} />
            </div>

            {/* Description */}
            {(detailLoading || detail?.description?.en) && (
              <div>
                <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                  About
                </h3>
                {detailLoading ? (
                  <div className="space-y-2">
                    {[100, 90, 60].map((w) => (
                      <div
                        key={w}
                        className={`h-3 rounded bg-white/10 animate-pulse`}
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>
                ) : (
                  <CoinDescription description={detail!.description.en} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
