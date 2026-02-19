const links = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#" },
];

export default function Navigation() {
  return (
    <nav className="flex items-center gap-2 font-mono text-sm font-medium tracking-normal text-subtext1">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="px-3 py-1.5 transition-colors hover:text-accent"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
