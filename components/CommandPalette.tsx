"use client";

import { useState, useEffect } from "react";

const SECTION_MAP: Record<string, string> = {
  about: "About",
  projects: "Projects",
};

export default function CommandPalette() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = Object.keys(SECTION_MAP);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    let observedSection = "";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observedSection = entry.target.id;
            break;
          }
        }

        // If near the top, always show ~/
        if (window.scrollY < 100) {
          setActiveSection("");
        } else {
          setActiveSection(observedSection);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      } else {
        setActiveSection(observedSection);
      }
    };

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="font-mono text-base text-subtext0">
      <a href="#" className="text-accent hover:text-accent/40">~</a>
      <span className="mx-0.5 inline-flex items-center">/</span>
      {activeSection && (
        <>
          <span>{SECTION_MAP[activeSection]}</span>
          <span className="mx-0.5 inline-flex items-center">/</span>
        </>
      )}
      <span className="animate-blink ml-0.5 inline-block w-2 bg-accent text-transparent">_</span>
    </div>
  );
}
