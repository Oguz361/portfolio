"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { X, CalendarDays, Github, Tag } from "lucide-react";
import figlet from "figlet";
import smallFont from "figlet/importable-fonts/Small.js";
import { Terminal, AnimatedSpan } from "@/components/ui/terminal";
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
const ASCII_COLORS = TAG_COLORS;

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const asciiArt = figlet.textSync(project.title, { font: "Small" });
  const asciiLines = asciiArt.split("\n").filter((line) => line.trim() !== "");
  const finalLines = asciiLines.length > 0 ? asciiLines : [project.title];

  const truncatedDesc =
    project.description.length > 120
      ? project.description.slice(0, 117) + "..."
      : project.description;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          className="relative flex flex-col w-full max-w-2xl max-h-[90vh] rounded-2xl border border-surface0 bg-base shadow-2xl pointer-events-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 rounded-lg p-1.5 text-subtext0 transition-colors hover:bg-surface0 hover:text-ctp-text"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex-shrink-0 flex flex-col gap-4 p-6 pb-4">
            <Terminal
              key={project.title}
              sequence={true}
              startOnView={false}
              className="w-full border-surface1 bg-mantle"
            >
              <AnimatedSpan>
                {finalLines.map((line, i) => (
                  <div
                    key={i}
                    className={ASCII_COLORS[i % ASCII_COLORS.length]}
                  >
                    {line}
                  </div>
                ))}
              </AnimatedSpan>
              <AnimatedSpan className="mt-4">
                <span className="flex items-center">
                  <span className="text-accent">$</span>
                  <span className="text-ctp-text ml-2">cat README.md</span>
                </span>
              </AnimatedSpan>
              <AnimatedSpan className="text-subtext0 mt-1 whitespace-normal break-words">
                {truncatedDesc}
                <span className="animate-pulse ml-1 text-accent">█</span>
              </AnimatedSpan>
            </Terminal>

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-ctp-text">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-subtext0">
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
                    className="flex items-center gap-1.5 transition-colors hover:text-accent"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="mx-6 border-t border-surface0" />

          <div className="flex-1 overflow-y-auto p-6 pt-4 flex flex-col gap-4">
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

            <p className="text-sm leading-relaxed text-subtext0">
              {project.longDescription ?? project.description}
            </p>
          </div>
        </motion.div>
      </div>
    </>,
    document.body,
  );
}
