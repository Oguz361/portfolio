import { Tag } from "lucide-react";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal";
import type { Project } from "@/data/projects";

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

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-surface0 bg-transparent shadow-lg transition-all hover:border-accent">
      <div className="relative aspect-[5/3] w-full overflow-hidden bg-transparent">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <Terminal className="h-full w-full border-surface1 bg-mantle">
            <TypingAnimation>{`> cd ${project.title.toLowerCase()}`}</TypingAnimation>
            <AnimatedSpan>
              <span className="text-ctp-green">✔</span> Project loaded
            </AnimatedSpan>
            <AnimatedSpan>
              <span className="text-subtext0">
                Stack: {project.tags.join(", ")}
              </span>
            </AnimatedSpan>
          </Terminal>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-lg font-semibold text-ctp-text transition-colors group-hover:text-accent">{project.title}</h3>
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
    </div>
  );
}
