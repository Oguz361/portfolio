import { FolderOpen } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <section className="space-y-6 pt-20">
      <div className="flex items-center gap-2">
        <FolderOpen className="h-7 w-7 text-accent" />
        <h2 className="text-3xl font-bold text-ctp-text">Projects</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
