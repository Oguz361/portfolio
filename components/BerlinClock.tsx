"use client";
import { useEffect, useState } from "react";

export default function BerlinClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("de-DE", {
          timeZone: "Europe/Berlin",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-end gap-0.5">
      <span className="font-mono text-sm tabular-nums text-subtext0">{time}</span>
      <span className="text-xs text-overlay1">Berlin</span>
    </div>
  );
}
