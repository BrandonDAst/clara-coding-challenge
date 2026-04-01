import { SortableColumn, SortState } from "@/types/coinGecko";

interface SortHeaderProps {
  column: SortableColumn;
  label: string;
  sortState: SortState;
  onSort: (col: SortableColumn) => void;
  className?: string;
}

export function SortHeader({
  column,
  label,
  sortState,
  onSort,
  className = "",
}: SortHeaderProps) {
  const isActive = sortState.column === column;
  const isAsc = isActive && sortState.direction === "asc";

  return (
    <th
      scope="col"
      aria-sort={isActive ? (isAsc ? "ascending" : "descending") : "none"}
      className={`px-4 py-3 text-left text-xs font-mono font-semibold uppercase tracking-widest select-none ${className}`}
    >
      <button
        onClick={() => onSort(column)}
        className={`
          inline-flex items-center gap-1.5 transition-colors duration-150
          ${isActive ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"}
        `}
        aria-label={`Sort by ${label} ${isActive && isAsc ? "(currently ascending)" : isActive ? "(currently descending)" : ""}`}
      >
        {label}
        <span className="text-[10px] leading-none" aria-hidden="true">
          {isActive ? (isAsc ? "↑" : "↓") : "↕"}
        </span>
      </button>
    </th>
  );
}
