"use client";

import figlet from "figlet";
import smallFont from "figlet/importable-fonts/Small.js";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import type { Project } from "@/data/projects";
import { slugify } from "@/lib/slugify";
import { ViewTransition } from "react";

figlet.parseFont("Small", smallFont);

const TAG_COLORS = [
  "text-ctp-red",   "text-ctp-mauve", "text-ctp-blue",  "text-ctp-green",
  "text-ctp-peach", "text-ctp-teal",  "text-ctp-pink",  "text-ctp-yellow",
];

export function ProjectDetailHero({ project }: { project: Project }) {
  const asciiArt = figlet.textSync(project.title, { font: "Small" });
  const asciiLines = asciiArt.split("\n").filter((line) => line.trim() !== "");
  const finalLines = asciiLines.length > 0 ? asciiLines : [project.title];

  return (
    <ViewTransition name={`project-terminal-${slugify(project.title)}`}>
    <div className="terminal-morph-el flex justify-center">
      <Terminal sequence={false} className="border-surface1 bg-mantle w-full max-w-2xl">
        <AnimatedSpan startOnView>
          {finalLines.map((line, i) => (
            <div key={i} className={TAG_COLORS[i % TAG_COLORS.length]}>
              {line}
            </div>
          ))}
        </AnimatedSpan>
        <TypingAnimation startOnView delay={300} className="mt-4 text-ctp-text">
          $ cat README.md
        </TypingAnimation>
        <AnimatedSpan startOnView delay={1300} className="text-subtext0 mt-1 whitespace-normal break-words">
          {project.description}
          <span className="animate-pulse text-accent">█</span>
        </AnimatedSpan>
      </Terminal>
    </div>
    </ViewTransition>
  );
}
