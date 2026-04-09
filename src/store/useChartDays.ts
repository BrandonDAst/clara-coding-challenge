import { create } from "zustand";

interface ChartDaysState {
  days: number;
  setDays: (days: number) => void;
}

export const useChartDaysStore = create<ChartDaysState>()((set) => ({
  days: 7,
  setDays: (days) => set({ days }),
}));
