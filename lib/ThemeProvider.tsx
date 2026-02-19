"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { palettes, type PaletteName, type AccentName, type CatppuccinPalette } from "./theme";

interface ThemeContextType {
  palette: PaletteName;
  accent: AccentName;
  setPalette: (p: PaletteName) => void;
  setAccent: (a: AccentName) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ].join(", ");
}

function applyTheme(palette: PaletteName, accent: AccentName) {
  const colors: CatppuccinPalette = palettes[palette];
  const root = document.documentElement;

  const colorKeys = Object.keys(colors) as (keyof CatppuccinPalette)[];
  for (const key of colorKeys) {
    root.style.setProperty(`--ctp-${key}`, colors[key]);
  }
  root.style.setProperty("--ctp-accent", colors[accent]);
  root.style.setProperty("--ctp-accent-rgb", hexToRgb(colors[accent]));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<PaletteName>("mocha");
  const [accent, setAccentState] = useState<AccentName>("peach");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedPalette = localStorage.getItem("ctp-palette") as PaletteName | null;
    const savedAccent = localStorage.getItem("ctp-accent") as AccentName | null;
    if (savedPalette) setPaletteState(savedPalette);
    if (savedAccent) setAccentState(savedAccent);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(palette, accent);
    localStorage.setItem("ctp-palette", palette);
    localStorage.setItem("ctp-accent", accent);
  }, [palette, accent, mounted]);

  const setPalette = (p: PaletteName) => setPaletteState(p);
  const setAccent = (a: AccentName) => setAccentState(a);

  return (
    <ThemeContext.Provider value={{ palette, accent, setPalette, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
