"use client";

import { useState, useEffect } from "react";
import { XCircle, Send } from "lucide-react";
import { type CTFChallenge, type Difficulty, hashFlag } from "@/data/ctf";

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; color: string }
> = {
  easy: {
    label: "EASY",
    color: "text-ctp-green",
  },
  medium: {
    label: "MED",
    color: "text-ctp-yellow",
  },
  hard: {
    label: "HARD",
    color: "text-ctp-red",
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
  const [hintVisible, setHintVisible] = useState(false);

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
      className={`group border rounded-sm border-l-2 transition-all duration-300 ${
        solved
          ? "border-ctp-green/30 border-l-ctp-green bg-ctp-green/5"
          : "border-surface1 border-l-accent bg-base"
      } ${shaking ? "animate-shake" : ""}`}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        {/* Status char */}
        <span
          className={`shrink-0 font-mono text-sm select-none ${
            solved ? "text-ctp-green" : "text-overlay1"
          }`}
        >
          {solved ? "[✓]" : "[ ]"}
        </span>

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
            <span className={`font-mono text-xs ${diff.color}`}>
              [{diff.label}]
            </span>
            <span className="text-xs text-overlay0">{challenge.category}</span>
          </div>
        </div>

        {/* Expand/Collapse */}
        <span className="shrink-0 font-mono text-overlay1 select-none">
          {expanded ? "▴" : "▾"}
        </span>
      </button>

      {/* Expandable content */}
      {expanded && (
        <div className="border-t border-surface1 px-4 pb-4 pt-3 space-y-4">
          {/* Hint toggle */}
          <div className="space-y-1">
            <button
              onClick={() => setHintVisible((v) => !v)}
              className="font-mono text-xs text-overlay1 hover:text-subtext0 transition-colors"
            >
              {hintVisible ? "# hint ▴" : "# hint ▾"}
            </button>
            {hintVisible && (
              <p className="text-sm text-subtext0 italic pl-2">
                &quot;{challenge.hint}&quot;
              </p>
            )}
          </div>

          {/* Input or solved message */}
          {solved ? (
            <p className="font-mono text-sm text-ctp-green">// solved ✓</p>
          ) : (
            <div className="flex gap-2">
              <div className="relative flex-1 flex items-center">
                <span className="font-mono text-accent text-sm select-none mr-2">
                  $
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="FLAG{...}"
                  spellCheck={false}
                  className={`flex-1 rounded-sm border bg-mantle px-3 py-2 font-mono text-sm text-ctp-text placeholder:text-overlay0 outline-none transition-colors ${
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
                className="flex items-center gap-1.5 rounded-sm bg-accent px-4 py-2 text-sm font-medium text-base transition-opacity hover:opacity-90"
              >
                <Send className="h-3.5 w-3.5" />
                submit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
