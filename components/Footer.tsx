import { Github, Linkedin } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface1 py-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4 text-sm text-subtext0">
          <span>&copy; {new Date().getFullYear()} Oguz Kaan Öztürk</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-ctp-green" />
            All Systems Operational
          </span>
        </div>
        <div className="flex items-center gap-2">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md p-1.5 text-subtext0 transition-colors hover:text-accent"
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
