export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
  longDescription?: string;
  techDetails?: { name: string; description: string }[];
  screenshots?: string[];
  githubRepo?: string;
  createdAt?: string;
}

export const projects: Project[] = [
  {
    title: "CloudSync",
    description: "A real-time file synchronization tool built with WebSockets and end-to-end encryption for seamless cross-device workflows.",
    tags: ["TypeScript", "Node.js", "WebSocket", "Crypto"],
    github: "https://github.com/oguz361/cloudSync",
    githubRepo: "oguz361/cloudSync",
    createdAt: "Jan 2024",
    longDescription: `CloudSync is a production-grade file synchronization daemon that keeps your files in perfect harmony across all your devices in real time. At its core, it uses a persistent WebSocket connection to push delta-encoded changesets — only the bytes that changed travel over the wire, not the entire file.

Every file is encrypted client-side with AES-256-GCM before it ever leaves your machine. The server sees only ciphertext; your keys never leave your device. A BLAKE3 content-addressable store deduplicates blocks across users, slashing storage costs without compromising privacy.

Conflict resolution follows a last-writer-wins strategy with full version history, so you can always roll back to any previous state. The CLI ships with watch mode, selective sync filters, and a live bandwidth meter.`,
    techDetails: [
      { name: "TypeScript", description: "Strict mode end-to-end — client daemon, server, and shared protocol types in one monorepo" },
      { name: "Node.js", description: "Event-loop-driven file watcher using chokidar with debounced batch uploads" },
      { name: "WebSocket", description: "Full-duplex binary protocol over ws — custom framing keeps overhead under 8 bytes per message" },
      { name: "Crypto", description: "AES-256-GCM client-side encryption; BLAKE3 for content hashing and deduplication" },
    ],
  },
  {
    title: "DevMetrics",
    description: "Developer productivity dashboard that aggregates GitHub, Jira, and CI/CD pipeline data into actionable insights.",
    tags: ["React", "Next.js", "PostgreSQL", "GraphQL"],
    github: "https://github.com/oguz361/devmetrics",
    demo: "https://devmetrics.vercel.app",
    githubRepo: "oguz361/devmetrics",
    createdAt: "Mar 2024",
    longDescription: `DevMetrics turns the noise of daily engineering work into a clear, glanceable signal. It ingests events from GitHub webhooks, the Jira REST API, and your CI provider (GitHub Actions, CircleCI, or Jenkins) and normalises them into a unified timeline stored in PostgreSQL.

The GraphQL API lets the frontend query exactly the slices it needs — PR cycle times, review turnaround, deployment frequency, and mean time to recovery — without over-fetching. Aggregation windows are pre-computed by a background worker using pg_cron, keeping dashboard load times under 200 ms even at 10 k events/day.

A role-based access model lets managers see team-level rollups while individual contributors see only their own metrics, protecting psychological safety.`,
    techDetails: [
      { name: "React", description: "Component library built on Radix UI primitives with Recharts for all data visualisations" },
      { name: "Next.js", description: "App Router with React Server Components for zero-JS metric cards and streaming Suspense boundaries" },
      { name: "PostgreSQL", description: "Partitioned events table, materialised views for aggregations, and pg_cron for scheduled roll-ups" },
      { name: "GraphQL", description: "Pothos schema-builder with Dataloader batching — eliminates N+1 queries across team/member/repo joins" },
    ],
  },
  {
    title: "TermFlow",
    description: "A modern terminal multiplexer with GPU-accelerated rendering and built-in AI code completion support.",
    tags: ["Rust", "OpenGL", "WASM"],
    github: "https://github.com/oguz361/termflow",
    githubRepo: "oguz361/termflow",
    createdAt: "Jun 2024",
    longDescription: `TermFlow reimagines the terminal multiplexer for the GPU era. While tmux and screen redraw the entire viewport on each update, TermFlow maintains a dirty-rectangle tracking system and uploads only changed cells to the GPU as a vertex buffer — cutting CPU-to-GPU bandwidth by up to 90 % on typical workloads.

The renderer is written in safe Rust backed by wgpu (WebGPU-native) so it runs natively on macOS, Linux, and Windows, and compiles to WebAssembly for in-browser use with zero native dependencies.

The built-in AI layer streams completions from a local Ollama instance or the OpenAI API, inlining ghost-text suggestions directly into the shell prompt. A tree-sitter grammar library provides language-aware syntax highlighting for 40+ languages at 60 fps.`,
    techDetails: [
      { name: "Rust", description: "Memory-safe core with async Tokio runtime for PTY I/O and IPC between panes" },
      { name: "OpenGL / wgpu", description: "GPU cell renderer with instanced draw calls — handles a 200×50 grid at 60 fps on integrated graphics" },
      { name: "WASM", description: "wasm-pack target lets TermFlow run inside any modern browser with shared-memory PTY bridge" },
      { name: "Tree-sitter", description: "Incremental parsing for syntax highlighting; grammar hot-reload without restart" },
    ],
  },
  {
    title: "APIForge",
    description: "Opinionated REST API scaffolding CLI that generates type-safe endpoints with automatic OpenAPI documentation.",
    tags: ["Go", "OpenAPI", "CLI", "Docker"],
    github: "https://github.com/oguz361/apiforge",
    githubRepo: "oguz361/apiforge",
    createdAt: "Sep 2024",
    longDescription: `APIForge is a code-generation CLI that takes a concise YAML schema and emits a production-ready Go REST API — router, handlers, middleware, database migrations, Dockerfile, and OpenAPI 3.1 spec — in under a second.

The generated code uses net/http with chi for routing, sqlc for type-safe SQL, and oapi-codegen for request/response validation tied directly to the OpenAPI spec. This keeps the spec and the code permanently in sync: changing the schema regenerates both the types and the docs atomically.

A watch mode detects schema changes and hot-regenerates only the affected files, leaving hand-written business logic untouched. The Docker output is a two-stage build that produces a ~8 MB scratch-based image.`,
    techDetails: [
      { name: "Go", description: "Template engine built on text/template with a custom AST walk for idiomatic, gofmt-clean output" },
      { name: "OpenAPI 3.1", description: "Spec is the single source of truth — request validation, response types, and docs all generated from it" },
      { name: "CLI", description: "Cobra + Viper CLI with interactive scaffolding wizard and non-interactive CI mode" },
      { name: "Docker", description: "Multi-stage Dockerfile output with layer caching hints; final image is scratch-based at ~8 MB" },
    ],
  },
];
