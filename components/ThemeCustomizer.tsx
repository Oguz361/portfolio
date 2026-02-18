"use client";

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
    <div className="rounded-xl border border-surface1 bg-surface0 p-5 space-y-4">
      <h3 className="text-sm font-semibold text-ctp-text">Theme</h3>
      <div className="flex flex-wrap gap-2">
        {paletteNames.map((p) => (
          <button
            key={p}
            onClick={() => setPalette(p)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
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
            className={`h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 ${
              accent === a ? "border-ctp-text scale-110" : "border-transparent"
            }`}
            style={{ backgroundColor: palettes[palette][a] }}
          />
        ))}
      </div>
    </div>
  );
}
