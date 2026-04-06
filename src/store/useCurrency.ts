import { CURRENCIES, Currency } from "@/hooks/useMarkets";
import { create } from "zustand";

interface CurrencyState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const useCurrencyStore = create<CurrencyState>()((set) => ({
  currency: CURRENCIES[0],
  setCurrency: (currency) => set({ currency }),
}));
