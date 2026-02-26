"use client";

import { useState, useEffect } from "react";
import {
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";
import { type CTFChallenge, type Difficulty, hashFlag } from "@/data/ctf";

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; color: string; bg: string }
> = {
  easy: {
    label: "Easy",
    color: "text-ctp-green",
    bg: "bg-ctp-green/10",
  },
  medium: {
    label: "Medium",
    color: "text-ctp-yellow",
    bg: "bg-ctp-yellow/10",
  },
  hard: {
    label: "Hard",
    color: "text-ctp-red",
    bg: "bg-ctp-red/10",
  },
};

interface Props {
  challenge: CTFChallenge;
  index: number;
}

export default function CTFChallengeCard({ challenge, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [solved, setSolved] = useState(false);
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
  const [shaking, setShaking] = useState(false);

  // Load solved state from localStorage
  useEffect(() => {
    const solvedFlags = JSON.parse(
      localStorage.getItem("ctf-solved") || "[]",
    ) as string[];
    if (solvedFlags.includes(challenge.id)) {
      setSolved(true);
    }
  }, [challenge.id]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const hashed = await hashFlag(input.trim());

    if (hashed === challenge.flagHash) {
      setSolved(true);
      setFeedback("success");
      setInput("");

      // Persist to localStorage
      const solvedFlags = JSON.parse(
        localStorage.getItem("ctf-solved") || "[]",
      ) as string[];
      if (!solvedFlags.includes(challenge.id)) {
        solvedFlags.push(challenge.id);
        localStorage.setItem("ctf-solved", JSON.stringify(solvedFlags));
      }
    } else {
      setFeedback("error");
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setFeedback(null);
      }, 1500);
    }
  };

  const diff = DIFFICULTY_CONFIG[challenge.difficulty];

  return (
    <div
      className={`group rounded-xl border transition-all duration-300 ${
        solved
          ? "border-ctp-green/50 bg-ctp-green/5"
          : "border-surface1 bg-base"
      } ${shaking ? "animate-shake" : ""}`}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        {/* Index & Status Icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            solved ? "bg-ctp-green/20" : "bg-surface0"
          }`}
        >
          {solved ? (
            <Unlock className="h-5 w-5 text-ctp-green" />
          ) : (
            <Lock className="h-5 w-5 text-overlay1" />
          )}
        </div>

        {/* Title & Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-overlay0 font-mono">
              #{String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className={`font-semibold truncate ${
                solved
                  ? "text-ctp-green"
                  : "text-ctp-text group-hover:text-accent"
              } transition-colors`}
            >
              {challenge.title}
            </h3>
          </div>
          <div className="mt-1 flex items-center gap-3">
            <span
              className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${diff.color} ${diff.bg}`}
            >
              {diff.label}
            </span>
            <span className="text-xs text-overlay0">{challenge.category}</span>
          </div>
        </div>

        {/* Expand/Collapse */}
        <div className="shrink-0 text-overlay1">
          {expanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </button>

      {/* Expandable content */}
      {expanded && (
        <div className="border-t border-surface0 px-4 pb-4 pt-3 space-y-4">
          {/* Hint */}
          <div className="rounded-lg bg-surface0/50 p-3">
            <p className="text-xs font-semibold text-overlay1 mb-1">Hint</p>
            <p className="text-sm text-subtext0 italic">
              &quot;{challenge.hint}&quot;
            </p>
          </div>

          {/* Input or solved message */}
          {solved ? (
            <div className="flex items-center gap-2 rounded-lg bg-ctp-green/10 p-3">
              <CheckCircle2 className="h-5 w-5 text-ctp-green shrink-0" />
              <p className="text-sm text-ctp-green font-medium">
                Challenge solved!
              </p>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="FLAG{...}"
                  spellCheck={false}
                  className={`w-full rounded-lg border bg-mantle px-3 py-2 font-mono text-sm text-ctp-text placeholder:text-overlay0 outline-none transition-colors ${
                    feedback === "error"
                      ? "border-ctp-red"
                      : "border-surface1 focus:border-accent"
                  }`}
                />
                {feedback === "error" && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <XCircle className="h-4 w-4 text-ctp-red" />
                  </div>
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-base transition-opacity hover:opacity-90"
              >
                <Send className="h-4 w-4" />
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
