import { Github, Linkedin, Twitter } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com", label: "X" },
];

export default function Hero() {
  return (
    <section id="about" className="space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-ctp-text sm:text-4xl">
        Hey! I&apos;m <span className="text-accent">Oguz Kaan Öztürk</span>
      </h1>
      <p className="text-lg text-subtext1">
        Full-Stack Developer &amp; Software Engineer
      </p>
      <p className="max-w-2xl leading-relaxed text-subtext0">
        I build modern web applications and developer tools. Passionate about
        clean architecture, open source, and creating seamless user experiences
        with cutting-edge technologies.
      </p>
      <div className="flex items-center gap-3">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="rounded-lg p-2 text-subtext0 transition-colors hover:bg-surface0 hover:text-accent"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </section>
  );
}
