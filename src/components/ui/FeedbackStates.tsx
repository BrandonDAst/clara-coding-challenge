// ============================================================
// SkeletonTable
// ============================================================

export function SkeletonTable() {
  return (
    <div
      role="status"
      aria-label="Loading market data…"
      className="rounded-xl border border-white/10 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex gap-8">
        {["w-8", "w-24", "w-20", "w-16", "w-24"].map((w, i) => (
          <div
            key={i}
            className={`${w} h-3 rounded bg-white/10 animate-pulse`}
          />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="border-b border-white/5 px-4 py-4 flex items-center gap-4"
          // style={{ animationDelay: `${i * 50}ms` }}
        >
          <div className="w-5 h-3 rounded bg-white/10 animate-pulse shrink-0" />
          <div className="w-7 h-7 rounded-full bg-white/10 animate-pulse shrink-0" />
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="w-24 h-3 rounded bg-white/10 animate-pulse" />
            <div className="w-10 h-2 rounded bg-white/10 animate-pulse" />
          </div>
          <div className="w-20 h-3 rounded bg-white/10 animate-pulse ml-auto" />
          <div className="w-14 h-3 rounded bg-white/10 animate-pulse" />
          <div className="w-20 h-3 rounded bg-white/10 animate-pulse hidden sm:block" />
          <div className="w-20 h-6 rounded bg-white/10 animate-pulse hidden md:block" />
        </div>
      ))}

      <span className="sr-only">Loading…</span>
    </div>
  );
}

// ============================================================
// ErrorMessage
// ============================================================

interface ErrorMessageProps {
  error: Error;
  onRetry: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const isRateLimit = error.name === "RateLimitError";

  return (
    <div
      role="alert"
      className="rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-8 text-center"
    >
      <p className="text-2xl font-mono mb-3" aria-hidden="true">
        {isRateLimit ? "📫" : "⚠️"}
      </p>
      <h2 className="text-base font-mono font-semibold text-zinc-100 mb-1">
        {isRateLimit ? "API rate limit reached" : "Something went wrong"}
      </h2>
      <p className="text-sm font-mono text-zinc-400 mb-5 max-w-xs mx-auto">
        {error.message}
      </p>
      <button
        onClick={onRetry}
        className="
          inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
          bg-white/10 text-zinc-100 font-mono border border-white/10
          hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
          transition-colors duration-150
        "
      >
        <span aria-hidden="true">🔄</span> Try again
      </button>
    </div>
  );
}

// ============================================================
// EmptyState
// ============================================================

interface EmptyStateProps {
  query: string;
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="py-16 text-center" role="status">
      <p className="text-3xl mb-3" aria-hidden="true">
        🔍
      </p>
      <p className="text-sm font-mono font-medium text-zinc-300">
        No results for &ldquo;{query}&rdquo;
      </p>
      <p className="text-xs font-mono text-zinc-500 mt-1">
        Try searching by full name or ticker symbol
      </p>
    </div>
  );
}
