"use client";

import { useState, useEffect } from "react";
import { MapPin, Sun, Moon } from "lucide-react";
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
  markers: [{ location: [52.52, 13.405], size: 0.1 }],
};

export default function LocationWidget() {
  const [time, setTime] = useState("");
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("de-DE", {
          timeZone: "Europe/Berlin",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      const hour = Number(
        new Intl.DateTimeFormat("de-DE", {
          timeZone: "Europe/Berlin",
          hour: "numeric",
          hour12: false,
        }).format(now)
      );
      setIsDay(hour >= 6 && hour < 20);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-xl border border-surface1 bg-base shadow-lg transition-all">
      <div className="flex items-center gap-3 p-4">
        <MapPin className="h-5 w-5 text-accent" />
        <div>
          <p className="text-sm font-medium text-ctp-text transition-colors group-hover:text-accent">Currently based in Berlin, Germany</p>
          <p className="text-xs text-subtext0 flex items-center gap-1">
            {isDay
              ? <Sun className="h-3 w-3 text-yellow-400" />
              : <Moon className="h-3 w-3 text-blue-300" />}
            Local time: {time}
          </p>
        </div>
      </div>
      <div className="relative aspect-square w-full translate-y-[10%]">
        <Globe config={GLOBE_CONFIG as any} />
      </div>
    </div>
  );
}
