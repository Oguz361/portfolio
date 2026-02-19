"use client";

import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

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
    <div className="flex items-center gap-3 rounded-xl border border-surface1 bg-transparent p-5">
      <MapPin className="h-5 w-5 text-accent" />
      <div>
        <p className="text-sm font-medium text-ctp-text">Germany</p>
        <p className="text-xs text-subtext0">Local time: {time}</p>
      </div>
    </div>
  );
}
