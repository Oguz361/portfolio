"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const PATH_LABELS: Record<string, string> = {
  "/about": "About",
  "/projects": "Projects",
  "/resume": "Resume",
};

export default function CommandPalette() {
  const pathname = usePathname();
  const label = PATH_LABELS[pathname];

  return (
    <div className="font-mono text-base text-subtext0">
      <Link href="/" className="text-accent hover:text-accent/40">~</Link>
      <span className="mx-0.5 inline-flex items-center">/</span>
      {label && (
        <>
          <span>{label}</span>
          <span className="mx-0.5 inline-flex items-center">/</span>
        </>
      )}
      <span className="animate-blink ml-0.5 inline-block w-2 bg-accent text-transparent">_</span>
    </div>
  );
}
