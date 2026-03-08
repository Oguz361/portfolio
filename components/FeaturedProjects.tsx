import { Star, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-accent" />
          <h2 className="text-2xl font-bold text-ctp-text">Featured Projects</h2>
        </div>
        <a
          href="/projects"
          className="flex items-center gap-1 text-sm text-subtext0 transition-colors hover:text-accent"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.filter(p => p.featured).map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
