export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "CloudSync",
    description: "A real-time file synchronization tool built with WebSockets and end-to-end encryption for seamless cross-device workflows.",
    tags: ["TypeScript", "Node.js", "WebSocket", "Crypto"],
    github: "https://github.com",
  },
  {
    title: "DevMetrics",
    description: "Developer productivity dashboard that aggregates GitHub, Jira, and CI/CD pipeline data into actionable insights.",
    tags: ["React", "Next.js", "PostgreSQL", "GraphQL"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "TermFlow",
    description: "A modern terminal multiplexer with GPU-accelerated rendering and built-in AI code completion support.",
    tags: ["Rust", "OpenGL", "WASM"],
    github: "https://github.com",
  },
  {
    title: "APIForge",
    description: "Opinionated REST API scaffolding CLI that generates type-safe endpoints with automatic OpenAPI documentation.",
    tags: ["Go", "OpenAPI", "CLI", "Docker"],
    github: "https://github.com",
  },
];
