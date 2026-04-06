"use client";

import { Currency } from "@/hooks/useMarkets";

const CURRENCIES: { value: Currency; label: string; symbol: string }[] = [
  { value: "usd", label: "USD", symbol: "$" },
  { value: "mxn", label: "MXN", symbol: "$" },
  { value: "eur", label: "EUR", symbol: "€" },
];

interface CurrencyToggleProps {
  value: Currency;
  onChange: (currency: Currency) => void;
}

export function CurrencyToggle({ value, onChange }: CurrencyToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Select display currency"
      className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/60 p-1 backdrop-blur-sm"
    >
      {CURRENCIES.map((currency) => {
        const isActive = value === currency.value;
        return (
          <button
            key={currency.value}
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(currency.value)}
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
