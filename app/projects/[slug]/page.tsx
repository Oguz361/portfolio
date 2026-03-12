import React from "react";
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
        {(project.longDescription ?? project.description)
          .split(/\n\n+/)
          .map((block, i) => {
            if (block.startsWith("## ")) {
              const newlineIndex = block.indexOf("\n");
              const title = newlineIndex === -1 ? block.slice(3) : block.slice(3, newlineIndex);
              const body = newlineIndex === -1 ? null : block.slice(newlineIndex + 1);
              return (
                <React.Fragment key={i}>
                  <h3 className="text-accent font-semibold text-lg mt-6 mb-2">{title}</h3>
                  {body && (
                    <p className="text-subtext0 leading-relaxed whitespace-pre-line">{body}</p>
                  )}
                </React.Fragment>
              );
            }
            return (
              <p key={i} className="text-subtext0 leading-relaxed whitespace-pre-line">{block}</p>
            );
          })}
      </div>

      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <div className="max-w-2xl mx-auto w-full space-y-3">
          <h2 className="text-2xl font-extrabold sm:text-3xl text-accent border-b border-surface0 pb-2">
            Key Features
          </h2>
          <ul className="space-y-2 text-subtext0">
            {project.keyFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.note && (
        <div className="max-w-2xl mx-auto w-full rounded-md border border-surface0 bg-surface0/40 px-4 py-3 text-sm text-subtext0 italic">
          {project.note}
        </div>
      )}

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
