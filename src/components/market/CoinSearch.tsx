"use client";

interface CoinSearchProps {
  value: string;
  onChange: (val: string) => void;
  resultCount: number;
}

export function CoinSearch({ value, onChange, resultCount }: CoinSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      {/* Search icon */}
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
        aria-hidden="true"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M11 11l3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or symbol…"
        aria-label="Filter cryptocurrencies by name or symbol"
        className="
          w-full pl-9 pr-4 py-2.5 rounded-lg text-sm font-mono
          bg-white/5 border border-white/10
          text-zinc-100 placeholder-zinc-500
          focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
          transition-all duration-150
        "
      />

      {/* Screen-reader only announces result count changes */}
      <span className="sr-only" role="status" aria-live="polite">
        {value
          ? `${resultCount} result${resultCount !== 1 ? "s" : ""} found`
          : ""}
      </span>
    </div>
  );
}
