"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const mainLinks = [
  { label: "~", href: "/" },
  { label: "/", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Posts", href: "#" },
  { label: "Pics", href: "#" },
];

const moreLinks = [
  { label: "Resume", href: "#" },
  { label: "Tutorials", href: "#" },
  { label: "Notes", href: "#" },
  { label: "Terminal", href: "#" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="flex items-center gap-1 font-mono text-sm text-subtext0">
      {mainLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="rounded-md px-2 py-1 transition-colors hover:bg-surface0 hover:text-accent"
        >
          {link.label}
        </a>
      ))}
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-surface0 hover:text-accent"
        >
          More
          <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-lg border border-surface1 bg-surface0 py-1 shadow-lg">
            {moreLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-1.5 text-sm text-subtext0 transition-colors hover:bg-surface1 hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
