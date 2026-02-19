"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <nav className="relative font-mono text-sm font-medium tracking-normal text-subtext1">
      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-2">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="px-3 py-1.5 transition-colors hover:text-accent"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 transition-colors hover:text-accent"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <Menu size={24} />
      </button>

      {/* Mobile sidebar overlay — portaled out of header to avoid mask clipping */}
      {mounted && createPortal(
        <div
          className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar panel */}
          <div
            className={`absolute top-0 right-0 h-full w-64 bg-mantle border-l border-surface0 shadow-xl transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-surface0">
              <span className="text-accent font-mono text-lg font-semibold">Navigation</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 transition-colors hover:text-ctp-red"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav className="p-4">
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded p-2 transition-colors hover:bg-surface0"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
}
