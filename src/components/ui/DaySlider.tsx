"use client";

import { useDayRangeStore } from "@/store/useDayRange";

export function DaySlider() {
  const { days, setDays } = useDayRangeStore();

  return (
    <div className="flex flex-col gap-1 rounded-lg border border-zinc-800 bg-zinc-900/60 p-2 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <label htmlFor="day-slider" className="text-xs font-mono text-zinc-400">
          Days to fetch
        </label>
        <span className="text-xs font-mono font-bold text-emerald-400 tabular-nums">
          {days}
        </span>
      </div>

      <input
        id="day-slider"
        type="range"
        min={1}
        max={7}
        step={1}
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        aria-label="Select number of days to fetch"
        className="w-full accent-emerald-400"
      />
    </div>
  );
}
