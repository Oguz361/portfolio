"use client";

import figlet from "figlet";
import smallFont from "figlet/importable-fonts/Small.js";
import { motion } from "motion/react";
import { useEffect } from "react";
import { X, Github, CalendarDays, Tag } from "lucide-react";
import { Terminal, AnimatedSpan } from "@/components/ui/terminal";
import { slugify } from "@/lib/slugify";
import type { Project } from "@/data/projects";

figlet.parseFont("Small", smallFont);

const TAG_COLORS = [
  "text-ctp-red",
  "text-ctp-mauve",
  "text-ctp-blue",
  "text-ctp-green",
  "text-ctp-peach",
  "text-ctp-teal",
  "text-ctp-pink",
  "text-ctp-yellow",
];

export default function ProjectDetailOverlay({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const asciiArt = figlet.textSync(project.title, { font: "Small" });
  const asciiLines = asciiArt.split("\n").filter((line) => line.trim() !== "");
  const finalLines = asciiLines.length > 0 ? asciiLines : [project.title];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        layoutId={`project-card-${slugify(project.title)}`}
        className="fixed inset-x-4 top-16 bottom-6 z-50 overflow-y-auto rounded-xl border border-surface0 bg-base shadow-2xl
                   sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-overlay1 hover:text-ctp-text cursor-pointer transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-6 p-6 pt-4">
          <Terminal
            sequence={false}
            className="border-surface1 bg-mantle w-full"
          >
            <AnimatedSpan>
              {finalLines.map((line, i) => (
                <div key={i} className={TAG_COLORS[i % TAG_COLORS.length]}>
                  {line}
                </div>
              ))}
            </AnimatedSpan>
            <AnimatedSpan delay={300} className="mt-4">
              <span className="text-accent">$</span>
              <span className="text-ctp-text ml-2">cat README.md</span>
            </AnimatedSpan>
            <AnimatedSpan
              delay={500}
              className="text-subtext0 mt-1 whitespace-normal break-words"
            >
              {project.description}
              <span className="animate-pulse ml-1 text-accent">█</span>
            </AnimatedSpan>
          </Terminal>

          <div className="flex items-center gap-4 text-sm text-subtext0">
            {project.createdAt && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {project.createdAt}
              </span>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-accent transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-ctp-text" />
            {project.tags.map((tag, index) => (
              <span
                key={tag}
                className={`rounded-md bg-surface0/60 px-3 py-1 text-sm font-medium ${TAG_COLORS[index % TAG_COLORS.length]}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-3 mt-10">
            <h2 className="text-2xl font-extrabold text-accent border-b border-surface0 pb-2">
              {project.title}
            </h2>
            <p className="text-subtext0 leading-relaxed whitespace-pre-line">
              {project.longDescription ?? project.description}
            </p>
          </div>

          {project.screenshots && project.screenshots.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-ctp-text border-b border-surface0 pb-2">
                Screenshots
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full rounded-lg border border-surface0 object-cover"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
