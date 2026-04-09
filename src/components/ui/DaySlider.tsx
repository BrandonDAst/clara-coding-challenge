"use client";

import { useChartDaysStore } from "@/store/useChartDays";

const MIN_DAYS = 1;
const MAX_DAYS = 7;

export function DaySlider() {
  const { days, setDays } = useChartDaysStore();

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 backdrop-blur-sm">
      <label
        htmlFor="day-slider"
        className="mt-1 block text-sm font-mono text-zinc-200"
      >
        Fetch {days} {days === 1 ? "day" : "days"}
      </label>

      <input
        id="day-slider"
        type="range"
        min={MIN_DAYS}
        max={MAX_DAYS}
        step={1}
        value={days}
        onChange={(event) => setDays(Number(event.target.value))}
        aria-label="Select how many days of data to fetch"
        className="day-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-emerald-400"
      />
    </div>
  );
}
