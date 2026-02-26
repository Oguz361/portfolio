"use client";

import { useState, useEffect } from "react";
import { MousePointerClick } from "lucide-react";

export default function ClickCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("click-count");
    if (saved) setCount(parseInt(saved, 10));
  }, []);

  const handleClick = () => {
    const next = count + 1;
    setCount(next);
    localStorage.setItem("click-count", String(next));
  };

  return (
    <button
      onClick={handleClick}
      className="group flex items-center gap-3 rounded-xl border border-surface1 bg-base shadow-lg p-4 transition-all w-full"
    >
      <MousePointerClick className="h-5 w-5 text-accent" />
      <div className="text-left">
        <p className="text-sm font-medium text-ctp-text transition-colors group-hover:text-accent">Click me!</p>
        <p className="text-xs text-subtext0">
          you&apos;ve clicked {count} time{count !== 1 ? "s" : ""}
        </p>
      </div>
    </button>
  );
}
