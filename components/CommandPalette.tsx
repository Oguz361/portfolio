"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function CommandPalette() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="font-mono text-base text-subtext0">
      <Link href="/" className="text-accent hover:text-accent/40">~</Link>
      {segments.map((seg, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        return (
          <span key={href}>
            <span className="mx-0.5 inline-flex items-center">/</span>
            <Link href={href} className="hover:text-accent transition-colors">{seg}</Link>
          </span>
        );
      })}
      <span className="mx-0.5 inline-flex items-center">/</span>
      <span className="animate-blink ml-0.5 inline-block w-2 bg-accent text-transparent">_</span>
    </div>
  );
}
