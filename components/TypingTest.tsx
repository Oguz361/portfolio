"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const PHRASES = [
  "any fool can write code that a computer can understand, but good programmers write code that humans can understand",
  "always first solve the problem clearly in your head, then write the code to make it work",
  "experience is simply the name we give to our mistakes, and mistakes are how we truly learn",
  "in order to be truly irreplaceable, one must always be completely different from the rest",
  "java is to javascript what car is to carpet, they share a name but absolutely nothing else",
  "talk is cheap, show me the code and let the results speak for themselves in production",
  "the best error message is the one that never shows up at all in your production environment",
  "before software can be reusable it first has to be usable by at least one real person",
  "first make it work, then make it right, and only then think about making it fast enough",
  "simplicity is the soul of efficiency and the foundation of every great software design",
];

type Phase = "idle" | "typing" | "done";

export default function TypingTest() {
  const [phraseIndex, setPhraseIndex] = useState<number | null>(null);

  useEffect(() => {
    setPhraseIndex(Math.floor(Math.random() * PHRASES.length));
  }, []);
  const phrase = PHRASES[phraseIndex ?? 0];
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

    if (value.length >= phrase.length) {
      const elapsed = (Date.now() - (startTime.current ?? Date.now())) / 1000;
      const wordsTyped = phrase.split(" ").length;
      const calcWpm = Math.round((wordsTyped / elapsed) * 60);

      let correct = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] === phrase[i]) correct++;
      }
      const calcAccuracy = Math.round((correct / value.length) * 100);

      setWpm(calcWpm);
      setAccuracy(calcAccuracy);
      setPhase("done");
    }
  }

  function reset() {
    setPhraseIndex((prev) => {
      let next = prev ?? 0;
      while (next === prev) next = Math.floor(Math.random() * PHRASES.length);
      return next;
    });
    setInput("");
    setPhase("idle");
    setWpm(0);
    setAccuracy(0);
    startTime.current = null;
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  const liveWpm =
    phase === "typing" && startTime.current
      ? Math.round(
          (input.trim().split(/\s+/).filter(Boolean).length /
            ((Date.now() - startTime.current) / 1000)) *
            60
        )
      : 0;

  const progress = Math.min((input.length / phrase.length) * 100, 100);

  return (
    <div className="rounded-xl border border-surface1 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between bg-mantle px-4 py-2.5 border-b border-surface1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-ctp-red inline-block" />
            <span className="h-3 w-3 rounded-full bg-ctp-yellow inline-block" />
            <span className="h-3 w-3 rounded-full bg-ctp-green inline-block" />
          </div>
          <span className="font-mono text-xs text-overlay1">typing-test</span>
        </div>
        {phase !== "idle" && (
          <button
            onClick={reset}
            className="font-mono text-xs text-subtext0 hover:text-accent transition-colors cursor-pointer"
          >
            ↺ reset
          </button>
        )}
      </div>

      <div className="bg-mantle p-5">
        {phase !== "done" ? (
          <>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-overlay1 uppercase tracking-widest">
                phrase
              </span>
              {phase === "typing" && (
                <span className="font-mono text-xs text-overlay1">
                  ~{liveWpm} wpm
                </span>
              )}
            </div>

            <div className={`font-mono text-sm select-none leading-relaxed mb-4 transition-opacity duration-150 ${phraseIndex === null ? 'opacity-0' : 'opacity-100'}`}>
              {phrase.split("").map((char, i) => {
                let cls = "text-subtext0";
                if (i < input.length) {
                  cls = input[i] === char ? "text-ctp-green" : "text-ctp-red";
                }
                return (
                  <span key={i}>
                    <span className={cls}>{char}</span>
                  </span>
                );
              })}
            </div>

            <div className="h-0.5 bg-surface2 rounded-full mb-4">
              <div
                className="h-full bg-accent rounded-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="pt-3 flex items-center gap-2">
              <span className="font-mono text-sm text-accent select-none">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={phase === "idle" ? "start typing…" : undefined}
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                className="flex-1 bg-transparent outline-none font-mono text-sm text-ctp-text placeholder:text-overlay0"
              />
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-6 flex-wrap"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-2xl font-bold text-ctp-text">
                {wpm}
              </span>
              <span className="text-xs text-subtext0 uppercase tracking-widest">
                WPM
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span
                className={`font-mono text-2xl font-bold ${
                  accuracy >= 90 ? "text-ctp-green" : "text-accent"
                }`}
              >
                {accuracy}%
              </span>
              <span className="text-xs text-subtext0 uppercase tracking-widest">
                accuracy
              </span>
            </div>
            <button
              onClick={reset}
              className="ml-auto font-mono text-xs border border-surface1 rounded-lg px-3 py-1.5 text-subtext0 hover:border-accent hover:text-accent transition-colors cursor-pointer"
            >
              ↺ try again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
