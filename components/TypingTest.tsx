"use client";

import { useRef, useState } from "react";
import { Keyboard, RotateCcw, CheckCircle } from "lucide-react";

const PHRASE = "the quick brown fox jumps over the lazy dog";

type Phase = "idle" | "typing" | "done";

export default function TypingTest() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [input, setInput] = useState("");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const startTime = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(value: string) {
    if (phase === "done") return;

    if (phase === "idle") {
      startTime.current = Date.now();
      setPhase("typing");
    }

    setInput(value);

    if (value.length >= PHRASE.length) {
      const elapsed = (Date.now() - (startTime.current ?? Date.now())) / 1000;
      const wordsTyped = PHRASE.split(" ").length;
      const calcWpm = Math.round((wordsTyped / elapsed) * 60);

      let correct = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] === PHRASE[i]) correct++;
      }
      const calcAccuracy = Math.round((correct / value.length) * 100);

      setWpm(calcWpm);
      setAccuracy(calcAccuracy);
      setPhase("done");
    }
  }

  function reset() {
    setInput("");
    setPhase("idle");
    setWpm(0);
    setAccuracy(0);
    startTime.current = null;
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-surface1 bg-base shadow-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Keyboard className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-semibold text-ctp-text">Typing Speed</h3>
        </div>
        {phase !== "idle" && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs text-subtext0 hover:text-accent transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            reset
          </button>
        )}
      </div>

      {/* Reference text with character coloring */}
      <div className="font-mono text-sm select-none leading-relaxed">
        {PHRASE.split("").map((char, i) => {
          let cls = "text-subtext0";
          if (i < input.length) {
            cls = input[i] === char ? "text-ctp-green" : "text-ctp-red";
          }
          return (
            <span key={i} className={cls}>
              {char}
            </span>
          );
        })}
      </div>

      {phase !== "done" ? (
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={phase === "idle" ? "Start typing…" : undefined}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          className="w-full bg-transparent border-b border-surface1 focus:border-accent outline-none font-mono text-sm text-ctp-text py-1 transition-colors placeholder:text-overlay0"
        />
      ) : (
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-ctp-green" />
            <span className="font-mono text-sm font-semibold text-ctp-text">
              {wpm} WPM
            </span>
          </div>
          <span className="text-sm text-subtext0">{accuracy}% accuracy</span>
          <button
            onClick={reset}
            className="ml-auto flex items-center gap-1.5 rounded-lg border border-surface1 px-3 py-1 text-xs text-subtext0 hover:border-accent hover:text-accent transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
