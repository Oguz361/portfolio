"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Flag, ArrowRight } from "lucide-react";
import { challenges } from "@/data/ctf";

export default function CTFWidget() {
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const solved = JSON.parse(
        localStorage.getItem("ctf-solved") || "[]",
      ) as string[];
      setSolvedCount(solved.length);
    };

    updateCount();
    const id = setInterval(updateCount, 1000);
    return () => clearInterval(id);
  }, []);

  const total = challenges.length;
  const allSolved = solvedCount === total;
  const progressPercent = (solvedCount / total) * 100;

  return (
    <Link
      href="/ctf"
      className="group flex flex-col gap-4 rounded-xl border border-surface1 bg-base shadow-lg p-4 transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent" />
          <h3 className="text-sm font-semibold text-ctp-text transition-colors group-hover:text-accent">
            Hack This Portfolio
          </h3>
        </div>
        <ArrowRight className="h-4 w-4 text-overlay1 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
      </div>

      <p className="text-sm text-subtext0 leading-relaxed">
        {allSolved
          ? "You've captured every flag. Impressive work!"
          : "Hidden flags are scattered across this site. Can you find them all?"}
      </p>

      <div className="space-y-2">
        <div className="h-1.5 w-full rounded-full bg-surface0 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              allSolved ? "bg-ctp-yellow" : "bg-accent"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Flag
            className={`h-3.5 w-3.5 ${
              allSolved ? "text-ctp-yellow" : "text-overlay1"
            }`}
          />
          <span className="font-mono text-sm text-subtext0">
            {solvedCount}/{total} flags captured
          </span>
        </div>
      </div>
    </Link>
  );
}
