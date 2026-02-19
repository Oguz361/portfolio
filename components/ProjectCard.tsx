import { Github, ExternalLink, Tag } from "lucide-react";
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
    <div className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-surface0 bg-base shadow-lg transition-all hover:border-accent">
      <div className="aspect-video w-full bg-mantle" />
      <div className="flex flex-1 flex-col gap-3 p-5">
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
        <div className="flex items-center gap-2 pt-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-1.5 text-subtext0 transition-colors hover:bg-surface1 hover:text-accent"
              aria-label={`${project.title} GitHub`}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-1.5 text-subtext0 transition-colors hover:bg-surface1 hover:text-accent"
              aria-label={`${project.title} demo`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
