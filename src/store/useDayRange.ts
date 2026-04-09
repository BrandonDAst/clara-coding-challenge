import { create } from "zustand";

const MIN_DAYS = 1;
const MAX_DAYS = 7;

interface DayRangeState {
  days: number;
  setDays: (days: number) => void;
}

export const useDayRangeStore = create<DayRangeState>()((set) => ({
  days: 7,
  setDays: (days) =>
    set({
      days: Math.max(MIN_DAYS, Math.min(MAX_DAYS, Math.round(days))),
    }),
}));

