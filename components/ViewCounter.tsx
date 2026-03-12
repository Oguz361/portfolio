"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/views", { method: "POST" })
      .then((r) => r.json())
      .then((data: { count: number }) => setCount(data.count))
      .catch(() => {
        // Fallback
        fetch("/api/views")
          .then((r) => r.json())
          .then((data: { count: number }) => setCount(data.count))
          .catch(() => setCount(null));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-surface1 bg-base shadow-lg p-4">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 text-accent" />
        <h3 className="text-sm font-semibold text-ctp-text">Page Views</h3>
      </div>

      {loading && (
        <p className="text-sm text-subtext0 animate-pulse">Loading…</p>
      )}

      {!loading && count !== null && (
        <div className="flex flex-col gap-1">
          <span className="font-mono text-4xl font-bold text-accent leading-none">
            {count.toLocaleString("de-DE")}
          </span>
          <span className="text-sm text-subtext0">total views</span>
        </div>
      )}

      {!loading && count === null && (
        <p className="text-sm text-ctp-red">Could not load views.</p>
      )}
    </div>
  );
}
