# Portfolio

Personal portfolio website built with modern web technologies.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Animation:** Motion
- **3D Globe:** COBE
- **React:** React 19

## Key Features

- Terminal-style cards
- Interactive 3D globe
- View Transitions API
- Catppuccin color theme
- CTF (Capture the Flag) easter egg

## Getting Started

```bash
git clone https://github.com/Oguz361/portfolio.git
cd portfolio
npm install
cp .env.example .env.local
npm run dev
```

Then fill in the values in `.env.local` (see below).

## Environment Variables

Create a `.env.local` file in the root of the project:

```env
# GitHub personal access token, scope: read:user
# Used by /api/github-commits for the weekly commit counter
GITHUB_TOKEN=

# Upstash Redis (REST), used by /api/views for the page view counter
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

Without these, the app still runs — the commit and view counters just return `0`.

If the project is linked to Vercel, pull the values instead of setting them by hand:

```bash
vercel env pull .env.local
```

## Deployment

Deployed via [Vercel](https://vercel.com).
