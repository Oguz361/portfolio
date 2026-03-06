import { Github, CalendarDays, Tag } from "lucide-react";
import { ProjectDetailHero } from "@/components/ProjectDetailHero";
import { projects } from "@/data/projects";
import { slugify } from "@/lib/slugify";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const TAG_COLORS = [
  "text-ctp-red",   "text-ctp-mauve", "text-ctp-blue",  "text-ctp-green",
  "text-ctp-peach", "text-ctp-teal",  "text-ctp-pink",  "text-ctp-yellow",
];

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: slugify(p.title) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => slugify(p.title) === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => slugify(p.title) === slug);
  if (!project) notFound();

  return (
    <section className="space-y-10 pt-20 pb-20">
      <ProjectDetailHero project={project} />

      <div className="max-w-2xl mx-auto w-full flex items-center gap-4 text-sm text-subtext0">
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
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        )}
      </div>

      <div className="max-w-2xl mx-auto w-full flex flex-wrap items-center gap-2">
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

      <div className="max-w-2xl mx-auto w-full space-y-3">
        <h2 className="text-2xl font-extrabold sm:text-3xl text-accent border-b border-surface0 pb-2">
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
    </section>
  );
}
