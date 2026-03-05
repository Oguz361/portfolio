"use client";

import { useState, useEffect } from "react";
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

    window.addEventListener("storage", updateCount);

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
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-ctp-text">
          Hack This Portfolio
        </h1>
        <p className="max-w-2xl text-sm text-subtext0 leading-relaxed">
          There are hidden flags scattered across this site. Find them, decode
          them, and prove your skills. Each challenge tests a different aspect
          of web security and developer tools.
        </p>
      </section>

      <div className="border-t border-surface0" />

      <section className="border-l-2 border-accent pl-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-overlay0">[flags]</span>
          <span className="font-mono text-sm text-subtext0">
            {solvedCount}/{challenges.length}
          </span>
        </div>

        <div className="h-1.5 w-full bg-surface0 overflow-hidden">
          <div
            className={`h-full transition-all duration-700 ease-out ${
              allSolved ? "bg-ctp-yellow" : "bg-accent"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {allSolved && (
          <p className="text-ctp-green font-mono text-sm">
            // all flags captured.
          </p>
        )}
      </section>

      <div className="border-t border-surface0" />

      <section className="border-l-2 border-surface2 pl-4 space-y-3">
        <h2 className="font-mono font-semibold text-ctp-text">
          <span className="text-overlay0">#</span> rules_of_engagement
        </h2>
        <div className="text-sm text-subtext0 space-y-2 leading-relaxed">
          <p>
            <span className="font-mono text-overlay0 mr-2">&gt;</span>
            Flags follow the format{" "}
            <code className="rounded bg-surface0 px-1.5 py-0.5 font-mono text-accent">
              FLAG&#123;...&#125;
            </code>
            . Submit the entire string including the wrapper.
          </p>
          <p>
            <span className="font-mono text-overlay0 mr-2">&gt;</span>
            Your browser&apos;s DevTools is all you need — a terminal or other
            tools work just as well. All flags live on this site; no external
            brute-forcing required.
          </p>
          <p>
            <span className="font-mono text-overlay0 mr-2">&gt;</span>
            Challenges are ordered by difficulty. Each hint points you in the
            right direction without giving away the answer.
          </p>
        </div>
      </section>

      <div className="border-t border-surface0" />

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
