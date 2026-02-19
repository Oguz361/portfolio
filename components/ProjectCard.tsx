import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-surface1 bg-transparent transition-colors hover:border-accent/40">
      <div className="aspect-video w-full bg-mantle" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-ctp-text">{project.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-subtext0">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface1 px-2.5 py-0.5 text-xs text-subtext1"
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
