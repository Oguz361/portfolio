export interface Project {
  title: string;
  description: string;
  tagline: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
  longDescription?: string;
  techDetails?: { name: string; description: string }[];
  screenshots?: string[];
  githubRepo?: string;
  createdAt?: string;
  keyFeatures?: string[];
  note?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Portfolio",
    tagline: "Developer portfolio with terminal UI and 3D globe.",
    description: "A personal developer portfolio built with Next.js 16 and React 19, featuring animated project showcases, a 3D globe, and a terminal-style hero section.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Motion"],
    github: "https://github.com/Oguz361/portfolio",
    githubRepo: "Oguz361/portfolio",
    createdAt: "Mar 2026",
    longDescription: `This portfolio is the site you are currently viewing — a personal developer portfolio built to showcase projects, skills, and experience through a polished, terminal-inspired interface.

Each project card is wrapped in a custom Terminal component that plays a sequenced animation: the project title appears as ASCII art, followed by a typed-out shell command, and finally the project description with a blinking cursor. The interactive 3D globe in the hero section is built with COBE and can be freely dragged around with smooth, spring-based physics. Navigating from a project card to its detail page uses View Transitions to seamlessly morph the terminal window between routes.

The site runs on Next.js 16 with the App Router and React 19. All project detail pages are statically pre-rendered at build time. The color system is built on the Catppuccin Mocha palette, exposed as Tailwind CSS v4 custom tokens. A small inline script applies the user's saved theme before React hydrates, preventing any color flash on first load.

All content lives in a single TypeScript data file with a strict Project interface, so adding new projects requires no UI changes. The dashboard on the homepage aggregates widgets — GitHub activity, a typing test, a CTF counter, and a location map — into a grid alongside the project showcase.

The site also includes a built-in CTF challenge with four tasks of increasing difficulty — from Easy to Hard. The challenges span categories like source code analysis, DevTools inspection, encoding puzzles, and hidden API endpoints. Progress is tracked live in the dashboard, and the challenges are designed as a fun invitation for curious visitors to poke around and explore.`,
    keyFeatures: [
      "Terminal-window project cards with sequenced animation: ASCII art title → typed shell command → project description with blinking cursor.",
      "Interactive 3D globe powered by COBE with draggable spring-physics interaction and worldwide location markers.",
      "View Transitions that smoothly morph the terminal window between project cards and detail pages.",
      "Catppuccin Mocha color theme with Tailwind CSS v4 custom tokens and flash-free theme loading.",
      "All project detail pages statically pre-rendered at build time with dynamic OpenGraph metadata.",
      "Built-in CTF challenge with four tasks (Easy → Hard) spanning source code, DevTools, encoding, and API categories.",
      "Single TypeScript data file as the content layer — strict Project interface, no CMS needed.",
    ],
    techDetails: [
      { name: "Next.js 16", description: "App Router with React Server Components, file-based dynamic routing for project detail pages, and generateStaticParams for full static pre-rendering at build time" },
      { name: "React 19", description: "Latest React with concurrent features and View Transitions API integration for smooth route-level morphing animations" },
      { name: "TypeScript", description: "Strict type safety across all components, the Project data interface, slug generation, and dynamic page params" },
      { name: "Tailwind CSS v4", description: "New v4 PostCSS engine with @theme inline custom tokens; full Catppuccin Mocha palette in OkLch color space; custom @keyframes for blink, pulse-glow, and shake" },
      { name: "shadcn/ui", description: "Accessible, unstyled Radix UI component primitives; integrated via @import shadcn/tailwind.css alongside Tailwind v4" },
      { name: "Motion", description: "Framer Motion v12 — animated text reveals, spring-based globe interaction, and scroll-triggered entrance animations" },
      { name: "COBE", description: "WebGL 3D globe with worldwide location markers and smooth spring-physics drag interaction" },
    ],
  },
  {
    title: "Driving School",
    tagline: "Freelance driving school management with role-based access.",
    description: "A full-stack freelance web app for a driving school client — a public landing page combined with a role-based internal management system for scheduling, students, and audit logging.",
    tags: ["Next.js 14", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    github: "https://github.com/Oguz361/driving-school-manager",
    githubRepo: "Oguz361/driving-school-manager",
    createdAt: "Feb 2026",
    longDescription: `Driving School is a full-stack web application I built as a freelance project for a driving school client — developed from scratch, covering initial database design, application architecture, and deployment. The project ships as two distinct surfaces: a public-facing landing page presenting the school's services, pricing tiers, and contact details; and a password-protected internal management system used daily by the school's staff.

The management system implements a role-based access control model with two roles — admin and instructor. Admins have full system access including user management and the audit log; instructors see a scoped view limited to their own schedule and assigned students, ensuring sensitive administrative data is never exposed to the wrong role. The appointment scheduling module is the operational core: instructors and admins create and manage driving lessons through an interactive calendar. Conflict detection is enforced at the application layer — if a requested time slot is already occupied, the booking is rejected outright. The override was deliberately omitted to make data integrity architectural rather than procedural.

The backend uses Next.js 14 App Router with server actions and React Server Components for data fetching, keeping round-trips minimal. Prisma ORM provides a type-safe data access layer over PostgreSQL, with a relational schema covering users, roles, students, appointments, and an append-only activity log. All notable system actions are recorded in this audit log, giving admins a traceable history of what happened and when.

The entire application — management system and landing page alike — is built mobile-first with Tailwind CSS and adapts seamlessly across phones, tablets, and desktops without loss of functionality.`,
    keyFeatures: [
      "Role-based access control with two roles (admin / instructor) — each with scoped views and permissions enforced at the application layer.",
      "Interactive calendar-based appointment scheduling with server-side conflict detection: overlapping bookings are rejected, not warned.",
      "Append-only audit log recording all notable system actions — gives admins a full, tamper-evident history of activity.",
      "Student records module with create/view/update flows, kept intentionally simple for usability and maintainability.",
      "Per-role dashboards with summary widgets: upcoming appointments, recent activity, and quick-access navigation.",
      "Public landing page alongside the management system — presents services, pricing tiers, and contact details adapted to the client's branding.",
    ],
    techDetails: [
      { name: "Next.js 14", description: "App Router with React Server Components for data fetching and server actions for mutations — cleanly separates server and client boundaries without a separate API layer" },
      { name: "TypeScript", description: "End-to-end type safety across server actions, Prisma model types, form validation, and UI components" },
      { name: "Prisma ORM", description: "Type-safe database client with a relational schema covering users, roles, students, appointments, and the activity log; migrations managed via Prisma Migrate" },
      { name: "PostgreSQL", description: "Relational data store for all application state — user accounts, student records, appointment slots, and the append-only audit log" },
      { name: "Tailwind CSS", description: "Mobile-first utility styling; the full application and landing page are fully responsive across phones, tablets, and desktops" },
    ],
  },
  {
    title: "Bachelor Thesis",
    tagline: "AI-powered adaptive learning with deep knowledge tracing.",
    description: "A full-stack adaptive learning platform exploring deep learning-based knowledge tracing translated into actionable pedagogical recommendations for classroom teachers.",
    tags: ["Next.js 14", "TypeScript", "FastAPI", "PyTorch", "SQLAlchemy", "shadcn/ui", "Zustand"],
    github: "https://github.com/Oguz361/Knowledge_Tracing_RecommandationSystem",
    githubRepo: "Oguz361/Knowledge_Tracing_RecommandationSystem",
    createdAt: "Jul 2025",
    longDescription: `A full-stack adaptive learning platform developed as a bachelor's thesis, exploring whether deep learning-based knowledge tracing can be meaningfully translated into actionable pedagogical recommendations for classroom teachers. The project serves as a proof of concept for a planned joint study between Berliner Hochschule für Technik (BHT) and a partner institution, investigating the practical applicability of AI-driven learning analytics in real educational settings.

At the core of the system is an Attentive Knowledge Tracing (AKT) model — a transformer-based architecture that processes a student's full interaction history across problems and skills to produce continuous mastery probability estimates. Raw AKT output probabilities are post-processed into interpretable skill-level mastery profiles, which are then mapped to a three-tier recommendation framework grounded in established learning theory: Practice for consolidation, Optimal for the Zone of Proximal Development, and Challenge for stretch tasks — grounded in established learning theory.

The backend is built with FastAPI and SQLAlchemy on SQLite, exposing a fully authenticated REST API with JWT-based auth, class/student management, CSV interaction import with duplicate detection and error reporting, and an AKT inference service loaded as a singleton at startup. The frontend, built with Next.js 14 and shadcn/ui, provides teachers with a dashboard for managing classes and students, importing data, and viewing per-student recommendation reports with configurable visualizations — radar charts, bar charts, or tables — exportable as formatted PDFs via jsPDF and html2canvas.

A small user study with three teachers found the mastery transformation concept promising, but raised concerns around AI transparency and explainability — a known challenge in deploying black-box models in educational contexts, and an area identified for future work.`,
    keyFeatures: [
      "Attentive Knowledge Tracing (AKT) transformer model for continuous per-skill mastery probability estimation.",
      "Three-tier recommendation framework (Practice / Optimal / Challenge) grounded in Vygotsky's ZPD and Bloom's mastery learning.",
      "FastAPI backend with JWT authentication, class/student management, and CSV import with duplicate detection.",
      "Next.js 14 teacher dashboard with configurable report visualizations: radar charts, bar charts, and tables.",
      "PDF export of per-student recommendation reports via jsPDF and html2canvas.",
      "User study with three teachers evaluating pedagogical applicability and AI transparency.",
    ],
    techDetails: [
      { name: "PyTorch", description: "AKT transformer model implementation for knowledge tracing and mastery probability inference" },
      { name: "FastAPI", description: "REST API with JWT auth, SQLAlchemy ORM, CSV import pipeline, and singleton AKT inference service" },
      { name: "Next.js 14", description: "App Router frontend with shadcn/ui components, TanStack Query for data fetching, and Zustand for state" },
      { name: "SQLAlchemy / SQLite", description: "Relational data model for classes, students, interactions, and skill mastery snapshots" },
      { name: "Recharts", description: "Configurable radar charts, bar charts, and table views for per-student recommendation reports" },
      { name: "jsPDF / html2canvas", description: "Client-side PDF generation for exportable teacher reports" },
    ],
  },
  {
    title: "PixelSwap",
    tagline: "Decentralized token exchange on the Polygon testnet.",
    description: "A decentralized exchange on the Polygon Amoy Testnet using an AMM model with token swaps, liquidity provision, and live market data.",
    tags: ["Next.js", "TypeScript", "Solidity", "Thirdweb", "Recharts"],
    github: "https://github.com/Oguz361/PixelSwap",
    githubRepo: "Oguz361/PixelSwap",
    createdAt: "Jul 2024",
    longDescription: `PixelSwap is a fully functional decentralized exchange built on the Polygon Amoy Testnet, developed as a university project to explore the architecture of DeFi protocols and on-chain smart contract interactions.

The platform allows users to swap between MATIC and a custom ERC-20 token (SWP) using an Automated Market Maker (AMM) model with a 0.3% fee mechanism — modelled after Uniswap V1. Real-time price calculation uses a constant-product formula, ensuring accurate slippage estimates before every trade.

Users can also provide liquidity to the pool and receive LP tokens proportional to their share, which entitle them to a cut of all trading fees. Removal burns LP tokens and returns the underlying assets. A live market data panel fetches MATIC price and a 7-day sparkline chart from the CoinGecko API, and a crypto news feed on the Explore page keeps traders informed.

Wallet connectivity is handled by ThirdwebProvider, supporting MetaMask and WalletConnect out of the box. The custom Solidity smart contract is deployed directly on-chain on Polygon Amoy.`,
    techDetails: [
      { name: "Next.js 14", description: "App Router with React Server Components for the dashboard shell; client components for wallet-connected swap and liquidity flows" },
      { name: "TypeScript", description: "End-to-end type safety across UI components, contract ABI bindings, and CoinGecko API responses" },
      { name: "Solidity", description: "Custom AMM smart contract implementing constant-product pricing, 0.3% fee collection, and LP token minting/burning" },
      { name: "Thirdweb SDK", description: "ThirdwebProvider for wallet connection (MetaMask & WalletConnect) and contract interaction hooks" },
      { name: "Recharts", description: "7-day sparkline price charts built with Recharts, data sourced from the CoinGecko API" },
    ],
  },
  {
    featured: true,
    title: "Home Lab",
    tagline: "Proxmox hypervisor hardened with Blue Team principles.",
    description: "A Cyber Security Home Lab built on a bare-metal Proxmox VE hypervisor, hardened step by step following common Blue Team principles — from forensic logging and intrusion prevention to network segmentation and identity management.",
    tags: ["Proxmox VE", "Linux", "Auditd", "Fail2Ban", "Firewall", "IAM"],
    createdAt: "Mar 2026",
    longDescription: `As a hands-on learning project, I built a Proxmox VE hypervisor on a bare-metal laptop and hardened it step by step following common Blue Team principles. The focus wasn't just on the setup itself, but on the reasoning behind every decision.

## Patch Management & System Availability
Proxmox is configured by default to use a paid enterprise repository. Without a valid license, updates fail with a 401 error — leaving the system frozen on a potentially vulnerable state. The fix was reconfiguring it to use the free pve-no-subscription repository, followed by a full system upgrade. Since the hardware is a laptop, systemd-logind was also configured to ignore the lid-close event, preventing the system from entering suspend mode — without this change, every physical interaction with the device would have taken all running VMs offline.

## Forensic Logging with Auditd
Instead of relying on standard syslogs, auditd was deployed — a logging subsystem built directly into the Linux kernel. Rather than using resource-heavy watch rules, optimized syscall rules were defined at the 64-bit architecture level to keep the performance overhead on the hypervisor minimal. Write access to critical paths is monitored: /etc/passwd and /etc/shadow for privilege escalation, /etc/ssh/sshd_config for SSH backdoors, /etc/pve/ for VM configuration tampering, and /etc/fail2ban/ for attempts to disable the IPS. Each event generates a uniquely tagged log entry, forming the foundation for a future SIEM integration.

## Intrusion Prevention with Fail2Ban
The Proxmox Web GUI isn't covered by default IPS rule sets. A custom Fail2Ban filter was developed using a tailored regex to detect authentication failures from the pvedaemon service, reading directly from the systemd journal for better performance. Configured thresholds: 3 failed attempts within 10 minutes trigger a one-hour IP ban — strict enough for real protection, without permanently locking out legitimate administrators.

## Network Hardening & Firewall (Default Deny)
A static IP was assigned to the management workstation and stored in a logical IP set (Management_IPs), decoupling the firewall rules from specific addresses. The Proxmox firewall was enabled with a strict Default Drop policy: all incoming traffic is blocked by default, except SSH (port 22) and the Web GUI (port 8006) from the defined management IP set. An Nmap scan from elsewhere on the home network shows the host as unreachable — a concrete, verifiable result.

## Identity & Access Management (IAM)
Three IAM measures were combined: TOTP MFA for root via the Proxmox Web GUI, a dedicated PVE-realm user for day-to-day administration (PVE users exist exclusively at the application layer — even if compromised, no direct shell access is possible), and passwordless SSH via Ed25519 key pairs with password authentication fully disabled.`,
    keyFeatures: [
      "Patch Management & System Availability — enterprise repo replaced with pve-no-subscription; systemd-logind configured to prevent suspend on lid close.",
      "Forensic Logging with Auditd — optimized 64-bit syscall rules monitoring /etc/passwd, /etc/shadow, /etc/ssh/sshd_config, /etc/pve/, and /etc/fail2ban/ with unique tags for future SIEM integration.",
      "Intrusion Prevention with Fail2Ban — custom regex filter for pvedaemon auth failures read from the systemd journal; 3 failures in 10 minutes triggers a one-hour ban.",
      "Network Hardening & Firewall (Default Deny) — static management IP set, Proxmox firewall with Default Drop policy; only SSH and Web GUI open to the management workstation.",
      "Identity & Access Management — TOTP MFA for root, dedicated PVE-realm user with no shell access, and passwordless Ed25519 SSH with password auth disabled.",
    ],
    techDetails: [
      { name: "Proxmox VE", description: "Bare-metal Type 1 hypervisor on Debian — hosts all VMs and provides the management API and web GUI" },
      { name: "Auditd", description: "Kernel-level audit framework with optimized 64-bit syscall rules monitoring critical system paths for forensic traceability" },
      { name: "Fail2Ban", description: "Custom IPS filter for pvedaemon auth failures, reading from systemd journal with configurable ban thresholds" },
      { name: "Proxmox Firewall", description: "Default Drop policy with logical IP sets; only SSH (22) and Web GUI (8006) open to the management workstation" },
      { name: "SSH / Ed25519", description: "Passwordless key-based authentication with Ed25519; password auth fully disabled in sshd_config" },
      { name: "TOTP MFA", description: "Time-based one-time password for Proxmox Web GUI root access — second factor against credential theft" },
    ],
    note: "No public repository — this is a live infrastructure project running on bare-metal hardware. This project is ongoing. Planned next steps include SIEM integration with Wazuh, red team simulations using a dedicated Kali VM, and DevSecOps pipelines for automated vulnerability scanning.",
  },
  {
    featured: true,
    title: "Charité AI",
    tagline: "Clinical ML system for surgery complication detection.",
    description: "A clinical ML system for detecting and classifying surgery-related complications, built during an internship at Charité – Universitätsmedizin Berlin.",
    tags: ["Python", "TensorFlow", "scikit-learn", "pandas", "NumPy"],
    createdAt: "Feb 2024",
    longDescription: `During an internship at the Department of Urology at Charité – Universitätsmedizin Berlin, I developed a Python-based AI system for the text-based detection and classification of iatrogenic, surgery-related complications. The tool was built as a quality component for a planned joint study between BHT and Charité, and tested against pseudonymized patient records extracted from the hospital's clinical information system (KIS).

The system trains a separate deep neural network for each of five complication types — including ureter fistula, bladder fistula, and urinoma — since each has its own distinct risk profile and class imbalance characteristics. A key challenge was the extreme rarity of some complications (< 2% of cases), which was addressed through SMOTE oversampling, per-class weight tuning, and individually calibrated decision thresholds. Selected flagged cases are subsequently reviewed by urologists for clinical validation.`,
    keyFeatures: [
      "Per-complication neural network models with individually tuned hyperparameters.",
      "SMOTE-based oversampling combined with class weighting to handle severe data imbalance.",
      "Stratified k-fold cross-validation for robust performance evaluation.",
      "Feature importance analysis via Random Forest to identify the strongest clinical risk factors.",
      "Full data preprocessing pipeline: ICD-10 code parsing, BMI calculation, median imputation, and outlier handling.",
      "CLI-based interface (stdin/stdout) for integration into clinical research workflows.",
    ],
    note: "No public repository is available for this project. A confidentiality agreement was signed as part of the internship at Charité – Universitätsmedizin Berlin.",
    techDetails: [
      { name: "Python", description: "Core language for the entire ML pipeline, preprocessing, and CLI interface" },
      { name: "TensorFlow / Keras", description: "Per-complication deep neural networks with individually tuned hyperparameters and calibrated decision thresholds" },
      { name: "scikit-learn", description: "Stratified k-fold cross-validation, Random Forest for feature importance analysis, and pipeline utilities" },
      { name: "imbalanced-learn", description: "SMOTE oversampling combined with class weighting to handle severe class imbalance (< 2% positive cases)" },
      { name: "pandas / NumPy", description: "Full preprocessing pipeline: ICD-10 code parsing, BMI calculation, median imputation, and outlier handling" },
    ],
  },
];
