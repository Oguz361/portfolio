import figlet from "figlet";
import smallFont from "figlet/importable-fonts/Small.js";
import { Github, CalendarDays, Tag } from "lucide-react";
import { Terminal, AnimatedSpan } from "@/components/ui/terminal";
import { projects } from "@/data/projects";
import { slugify } from "@/lib/slugify";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

figlet.parseFont("Small", smallFont);

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
    title: `${project.title} | Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Portfolio`,
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

  const asciiArt = figlet.textSync(project.title, { font: "Small" });
  const asciiLines = asciiArt.split("\n").filter((line) => line.trim() !== "");
  const finalLines = asciiLines.length > 0 ? asciiLines : [project.title];

  return (
    <section className="space-y-10 pt-20 pb-20">
      {/* Terminal header */}
      <div className="flex justify-center">
        <Terminal sequence={false} className="border-surface1 bg-mantle w-full max-w-2xl">
          <AnimatedSpan startOnView>
            {finalLines.map((line, i) => (
              <div key={i} className={TAG_COLORS[i % TAG_COLORS.length]}>
                {line}
              </div>
            ))}
          </AnimatedSpan>
          <AnimatedSpan startOnView delay={300} className="mt-4">
            <span className="text-accent">$</span>
            <span className="text-ctp-text ml-2">cat README.md</span>
          </AnimatedSpan>
          <AnimatedSpan startOnView delay={500} className="text-subtext0 mt-1 whitespace-normal break-words">
            {project.description}
            <span className="animate-pulse ml-1 text-accent">█</span>
          </AnimatedSpan>
        </Terminal>
      </div>

      {/* Date + GitHub */}
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

      {/* Tags */}
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

      {/* About */}
      <div className="max-w-2xl mx-auto w-full space-y-3">
        <h2 className="text-2xl font-extrabold sm:text-3xl text-accent border-b border-surface0 pb-2">
          {project.title}
        </h2>
        <p className="text-subtext0 leading-relaxed whitespace-pre-line">
          {project.longDescription ?? project.description}
        </p>
      </div>

      {/* Screenshots */}
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
