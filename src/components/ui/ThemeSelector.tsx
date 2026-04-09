"use client";

import { ThemePreference, useThemeStore } from "@/store/useTheme";
import { useEffect } from "react";

const OPTIONS: Array<{ value: ThemePreference; label: string }> = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

function applyResolvedTheme(theme: ThemePreference) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const resolvedTheme =
    theme === "system" ? (media.matches ? "dark" : "light") : theme;

  const root = document.documentElement;
  root.classList.remove("theme-light", "theme-dark");
  root.classList.add(`theme-${resolvedTheme}`);
  root.classList.toggle("dark", resolvedTheme === "dark");
  root.style.colorScheme = resolvedTheme;
}

export function ThemeSelector() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    applyResolvedTheme(theme);

    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyResolvedTheme(theme);

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  return (
    <div
      role="radiogroup"
      aria-label="Seleccionar tema"
      className="flex flex-row items-stretch gap-1 rounded-lg border border-zinc-800 bg-zinc-900/60 p-1 backdrop-blur-sm justify-between"
    >
      {OPTIONS.map((option) => {
        const isActive = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setTheme(option.value)}
            className={`
              relative px-3 py-1 rounded-md font-mono text-xs font-bold
              transition-all duration-200 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-emerald-400
              ${
                isActive
                  ? "bg-emerald-400/10 text-emerald-400 shadow-[0_0_8px_0_rgba(52,211,153,0.15)]"
                  : "text-zinc-500 hover:text-zinc-300"
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
