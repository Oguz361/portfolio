"use client";

import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Globe } from "@/components/ui/globe";

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 1.8,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1] as [number, number, number],
  markerColor: [0, 0, 0] as [number, number, number],
  glowColor: [1, 1, 1] as [number, number, number],
  scale: 1.1,
  markers: [{ location: [51.1657, 10.4515], size: 0.1 }],
};

export default function LocationWidget() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }));
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-xl border border-surface1 bg-base shadow-lg transition-all">
      {/* Text-Content */}
      <div className="flex items-center gap-3 p-4">
        <MapPin className="h-5 w-5 text-accent" />
        <div>
          <p className="text-sm font-medium text-ctp-text transition-colors group-hover:text-accent">Currently based in Berlin, Germany</p>
          <p className="text-xs text-subtext0">Local time: {time}</p>
        </div>
      </div>
      {/* Globe */}
      <div className="relative aspect-square w-full translate-y-[10%]">
        <Globe config={GLOBE_CONFIG as any} />
      </div>
    </div>
  );
}
