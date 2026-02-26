"use client";

import { useState, useEffect } from "react";
import { Shield, Trophy, Terminal as TerminalIcon } from "lucide-react";
import { challenges } from "@/data/ctf";
import CTFChallengeCard from "@/components/CTFChallengeCard";

export default function CTFPage() {
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const solved = JSON.parse(
        localStorage.getItem("ctf-solved") || "[]",
      ) as string[];
      setSolvedCount(solved.length);
    };

    updateCount();

    // Listen for localStorage changes from CTFChallengeCard
    window.addEventListener("storage", updateCount);

    // Also poll briefly so same-tab updates are reflected
    const id = setInterval(updateCount, 500);
    return () => {
      window.removeEventListener("storage", updateCount);
      clearInterval(id);
    };
  }, []);

  const allSolved = solvedCount === challenges.length;
  const progressPercent = (solvedCount / challenges.length) * 100;

  return (
    <div className="space-y-10 pt-20 pb-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="h-7 w-7 text-accent" />
          <h1 className="text-3xl font-extrabold tracking-tight text-ctp-text">
            Hack This Portfolio
          </h1>
        </div>
        <p className="max-w-2xl text-subtext0 leading-relaxed">
          Think you&apos;ve got what it takes? There are hidden flags scattered
          across this site. Find them, decode them, and prove your skills. Each
          challenge tests a different aspect of web security and developer
          tools.
        </p>
      </section>

      {/* Progress */}
      <section className="rounded-xl border border-surface1 bg-base shadow-lg p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy
              className={`h-5 w-5 ${allSolved ? "text-ctp-yellow" : "text-accent"}`}
            />
            <h2 className="font-semibold text-ctp-text">
              {allSolved ? "All flags captured!" : "Your Progress"}
            </h2>
          </div>
          <span className="font-mono text-sm text-subtext0">
            {solvedCount}/{challenges.length} flags
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2.5 w-full rounded-full bg-surface0 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              allSolved ? "bg-ctp-yellow" : "bg-accent"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {allSolved && (
          <div className="rounded-lg bg-ctp-yellow/10 p-3">
            <p className="text-sm text-ctp-yellow">
              Impressive! You&apos;ve captured every flag. You clearly know your
              way around web security.
            </p>
          </div>
        )}
      </section>

      {/* Rules */}
      <section className="rounded-xl border border-surface1 bg-base shadow-lg p-5 space-y-3">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-5 w-5 text-accent" />
          <h2 className="font-semibold text-ctp-text">Rules of Engagement</h2>
        </div>
        <div className="text-sm text-subtext0 space-y-2 leading-relaxed">
          <p>
            Flags follow the format{" "}
            <code className="rounded bg-surface0 px-1.5 py-0.5 font-mono text-accent">
              FLAG&#123;...&#125;
            </code>
            . Submit the entire string including the wrapper.
          </p>
          <p>
            Use your browser&apos;s DevTools, terminal, or any tools you like.
            Everything you need is on this site — no external brute-forcing
            required.
          </p>
          <p>
            Challenges are ordered by difficulty. Each hint points you in the
            right direction without giving away the answer.
          </p>
        </div>
      </section>

      {/* Challenges */}
      <section className="space-y-4">
        {challenges.map((challenge, i) => (
          <CTFChallengeCard
            key={challenge.id}
            challenge={challenge}
            index={i}
          />
        ))}
      </section>
    </div>
  );
}
