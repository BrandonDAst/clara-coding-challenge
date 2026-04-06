"use client";

import { CURRENCIES, Currency } from "@/hooks/useMarkets";

interface CurrencyToggleProps {
  selectedCurrency: Currency;
  onChange: (currency: Currency) => void;
}

export function CurrencyToggle({
  selectedCurrency,
  onChange,
}: CurrencyToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Select display currency"
      className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/60 p-1 backdrop-blur-sm"
    >
      {CURRENCIES.map((currency) => {
        const isActive = selectedCurrency.code === currency.code;
        return (
          <button
            key={currency.code}
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(currency)}
            className={`
              relative px-3 py-1 rounded-md font-mono text-xs font-medium
              transition-all duration-200 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-emerald-400
              ${
                isActive
                  ? "bg-emerald-400/10 text-emerald-400 shadow-[0_0_8px_0_rgba(52,211,153,0.15)]"
                  : "text-zinc-500 hover:text-zinc-300"
              }
            `}
          >
            {currency.label}
          </button>
        );
      })}
    </div>
  );
}
