"use client";

import { useEffect, useState } from "react";
import { GitCommitHorizontal } from "lucide-react";

export default function GitHubActivity() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github-commits")
      .then((r) => r.json())
      .then((data: { count: number }) => {
        setCount(data.count);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-surface1 bg-base shadow-lg p-4">
      <div className="flex items-center gap-2">
        <GitCommitHorizontal className="h-4 w-4 text-accent" />
        <h3 className="text-sm font-semibold text-ctp-text">GitHub Activity</h3>
      </div>

      {loading && (
        <p className="text-sm text-subtext0 animate-pulse">Loading…</p>
      )}

      {error && !loading && (
        <p className="text-sm text-ctp-red">Could not fetch activity.</p>
      )}

      {!loading && !error && (
        <div className="flex flex-col gap-1">
          <span className="font-mono text-4xl font-bold text-accent leading-none">
            {count}
          </span>
          <span className="text-sm text-subtext0">commits in the last 7 days</span>
        </div>
      )}
    </div>
  );
}
