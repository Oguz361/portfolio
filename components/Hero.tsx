import { Github, Linkedin } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
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
        {socials.map(({ icon: Icon, href, label }, index) => (
          <span key={label} className="flex items-center gap-3">
            {index > 0 && <span className="text-surface1 select-none">·</span>}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-subtext0 transition-colors hover:text-accent"
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm">{label}</span>
            </a>
          </span>
        ))}
      </div>
    </section>
  );
}
