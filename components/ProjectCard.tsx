"use client";

import figlet from "figlet";
import smallFont from "figlet/importable-fonts/Small.js";
import { Tag } from "lucide-react";
import Link from "next/link";
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
  const truncatedDesc =
    project.description.length > 130
      ? project.description.slice(0, 130).replace(/\s+\S*$/, "") + "…"
      : project.description;

  return (
    <Link href={`/projects/${slugify(project.title)}`} className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-surface0 bg-transparent shadow-lg transition-all hover:border-accent">
      <ViewTransition name={`project-terminal-${slugify(project.title)}`}>
      <div className="terminal-morph-el relative aspect-[5/4] w-full overflow-hidden bg-transparent">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <Terminal sequence={false} className="h-full w-full border-surface1 bg-mantle transition-transform duration-300 ease-out group-hover:scale-[1.05]">
            <div className="h-28 overflow-hidden">
              <AnimatedSpan startOnView>
                {finalLines.map((line, i) => (
                  <div key={i} className={ASCII_COLORS[i % ASCII_COLORS.length]}>
                    {line}
                  </div>
                ))}
              </AnimatedSpan>
            </div>
            <TypingAnimation startOnView delay={300} className="mt-4 text-ctp-text">
              $ cat README.md
            </TypingAnimation>
            <AnimatedSpan startOnView delay={1300} className="text-subtext0 mt-1 whitespace-normal break-words">
              {truncatedDesc}
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
