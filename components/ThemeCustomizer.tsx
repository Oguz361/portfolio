"use client";

import { motion } from "motion/react";
import { useTheme } from "@/lib/ThemeProvider";
import { palettes, paletteNames, accentNames, type PaletteName, type AccentName } from "@/lib/theme";

const paletteLabels: Record<PaletteName, string> = {
  latte: "Latte",
  frappe: "Frappe",
  macchiato: "Macchiato",
  mocha: "Mocha",
};

export default function ThemeCustomizer() {
  const { palette, accent, setPalette, setAccent } = useTheme();

  return (
    <div className="group rounded-xl border border-surface1 bg-base shadow-lg p-4 space-y-4 transition-all">
      <h3 className="text-sm font-semibold text-ctp-text transition-colors group-hover:text-accent">Theme</h3>
      <div className="flex flex-wrap gap-2">
        {paletteNames.map((p) => (
          <button
            key={p}
            onClick={() => setPalette(p)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              palette === p
                ? "bg-accent text-base"
                : "bg-surface1 text-subtext0 hover:text-ctp-text"
            }`}
          >
            {paletteLabels[p]}
          </button>
        ))}
      </div>
      <h3 className="text-sm font-semibold text-ctp-text">Accent</h3>
      <div className="flex flex-wrap gap-2">
        {accentNames.map((a) => (
          <button
            key={a}
            onClick={() => setAccent(a)}
            title={a}
            className={`relative h-6 w-6 rounded-md transition-transform cursor-pointer hover:scale-110 ${
              accent === a ? "scale-110" : ""
            }`}
            style={{ backgroundColor: palettes[palette][a] }}
          >
            {accent === a && (
              <motion.div
                layoutId="accent-ring"
                className="absolute -inset-[1px] rounded-md ring-1 pointer-events-none"
                style={{ '--tw-ring-color': palettes[palette][a] } as React.CSSProperties}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
