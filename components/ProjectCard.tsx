"use client";

import figlet from "figlet";
import smallFont from "figlet/importable-fonts/Small.js";
import { Tag } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import type { Project } from "@/data/projects";
import { slugify } from "@/lib/slugify";
import { ViewTransition } from "react";

figlet.parseFont("Small", smallFont);

const TAG_COLORS = [
  "text-ctp-red",   "text-ctp-mauve", "text-ctp-blue",  "text-ctp-green",
  "text-ctp-peach", "text-ctp-teal",  "text-ctp-pink",  "text-ctp-yellow",
];
const ASCII_COLORS = TAG_COLORS;

export default function ProjectCard({ project }: { project: Project }) {
  const asciiArt = figlet.textSync(project.title, { font: "Small" });
  const asciiLines = asciiArt.split("\n").filter((line) => line.trim() !== "");
  const finalLines = asciiLines.length > 0 ? asciiLines : [project.title];

  const containerRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<HTMLDivElement>(null);
  const [asciiScale, setAsciiScale] = useState(1);

  useEffect(() => {
    const calculate = () => {
      if (!containerRef.current || !asciiRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const asciiWidth = asciiRef.current.scrollWidth;
      setAsciiScale(asciiWidth > containerWidth ? containerWidth / asciiWidth : 1);
    };
    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  return (
    <Link href={`/projects/${slugify(project.title)}`} className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-surface0 bg-transparent shadow-lg transition-all hover:border-accent">
      <ViewTransition name={`project-terminal-${slugify(project.title)}`}>
      <div className="terminal-morph-el relative aspect-[5/4] w-full overflow-hidden bg-transparent">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <Terminal sequence={false} className="h-full w-full max-w-none border-surface1 bg-mantle transition-transform duration-300 ease-out group-hover:scale-[1.05]">
            <div ref={containerRef} className="h-20 sm:h-24 lg:h-28 overflow-hidden text-[0.55rem] sm:text-xs lg:text-sm leading-[0.7rem] sm:leading-tight lg:leading-normal">
              <div ref={asciiRef} style={{ transform: `scaleX(${asciiScale})`, transformOrigin: "left top" }}>
                <AnimatedSpan startOnView>
                  {finalLines.map((line, i) => (
                    <div key={i} className={ASCII_COLORS[i % ASCII_COLORS.length]}>
                      {line}
                    </div>
                  ))}
                </AnimatedSpan>
              </div>
            </div>
            <TypingAnimation startOnView delay={300} className="mt-1 sm:mt-2 lg:mt-4 text-ctp-text">
              $ cat TAGLINE
            </TypingAnimation>
            <AnimatedSpan startOnView delay={1300} className="text-subtext0 mt-1 whitespace-normal break-words text-xs sm:text-sm overflow-hidden">
              {project.tagline}
              <span className="animate-pulse text-accent">█</span>
            </AnimatedSpan>
          </Terminal>
        </div>
      </div>
      </ViewTransition>
      <div className="flex flex-1 flex-col gap-3 px-4 pt-1 pb-4">
        <h3 className="text-lg font-semibold text-ctp-text transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-subtext0">
          {project.description}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="h-4 w-4 text-ctp-text" />
          {project.tags.map((tag, index) => (
            <span
              key={tag}
              className={`rounded-md bg-surface0/60 px-2.5 py-0.5 text-xs font-medium ${TAG_COLORS[index % TAG_COLORS.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
