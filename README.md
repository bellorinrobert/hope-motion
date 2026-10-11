# Hope Motion

> An immersive, motion-driven fundraising experience built to support Andrea on her journey back to walking without crutches.

**Live campaign:** [GoFundMe — Ayuda a Andrea a volver a caminar sin muletas](https://www.gofundme.com/f/ayuda-a-andrea-a-volver-a-caminar-sin-muletas)

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8)](https://tailwindcss.com)
[![Motion](https://img.shields.io/badge/Motion-react-e11d48)](https://motion.dev)
[![Docker](https://img.shields.io/badge/Docker-Node_24-alpine)](https://www.docker.com)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

---

## Overview

Hope Motion is a public, portfolio-ready landing page for a solidarity campaign. It tells Andrea's story through a cinematic, scroll-driven narrative and offers two clear ways to donate:

1. **Pago Móvil (Venezuela)** — copyable transfer details with visual confirmation and a WhatsApp button to send the receipt.
2. **GoFundMe (international)** — a direct link to the official campaign.

The experience is designed mobile-first (from 320 px), fully in Spanish, accessible by keyboard, and respectful of `prefers-reduced-motion`.

## Key features

- **Full-screen hero** with expressive typography, staggered word-by-word text reveal and parallax on scroll.
- **Sticky storytelling** — a pinned visual column crossfades between chapters as the story scrolls.
- **Scroll choreography** powered by `motion/react`: `useScroll`, `useTransform`, `useSpring`, `useInView`, `useReducedMotion`, scroll progress bar, image scale-on-scroll, fade-in/slide-up reveals and staggered sequences.
- **Two donation channels** fully separated from presentation logic (`src/features/donations`), with centralized, editable configuration.
- **Copy-to-clipboard microinteractions** with live `aria-live` feedback and error states.
- **Floating donate CTA** on mobile that hides automatically while the donation section is visible.
- **SEO ready**: Metadata API, Open Graph image (generated at build time), Twitter Cards, `sitemap.xml`, `robots.txt`, semantic HTML and `next/image` / `next/font`.
- **Performance conscious**: no scroll listeners on every component, transform/opacity-only animations, IntersectionObserver-driven reveals, statically prerendered routes.

## Tech stack

| Layer        | Choice                                                     |
| ------------ | ---------------------------------------------------------- |
| Runtime      | Node.js 24 (Alpine, via Docker only)                       |
| Framework    | Next.js 16 (App Router, Server Components by default)      |
| Language     | TypeScript 5.x, `strict` mode                              |
| Styling      | Tailwind CSS 4 (CSS-first config)                          |
| Animation    | Motion (`motion/react`)                                    |
| Icons        | lucide-react                                               |
| Package mgr  | pnpm (pinned through Corepack)                             |
| Linting      | ESLint 9 + `eslint-config-next`                            |
| Containers   | Docker multi-stage builds + Docker Compose                 |

> **No local Node.js required.** Every `pnpm`, `next`, `tsc` and `eslint` command runs inside Docker.

## Architecture

```
src/
├── app/                    # App Router: layout, page, SEO routes, fonts, styles
├── components/
│   ├── animations/         # Reveal, TextReveal, ParallaxImage (Motion primitives)
│   ├── layout/             # Header, Footer, ScrollProgress, FloatingDonateButton
│   ├── sections/           # Hero, Story, Goal, Donation, FAQ (composition units)
│   └── ui/                 # Button, Card, SectionHeading, Accordion, ShareButton
├── features/
│   └── donations/          # Self-contained donation feature
│       ├── components/     # PagoMovilCard, GofundmeCard, CopyField
│       ├── config/         # pago-movil, goal-items, faq-items (editable data)
│       └── types/          # Feature contracts
├── hooks/                  # useClipboard, useActiveSection, useScrolled
├── lib/                    # site config, sharing helpers, utilities
└── types/                  # Shared types
```

Design principles applied: **SOLID**, **Clean Code**, **DRY**, single responsibility, separation between presentation / configuration / logic, Server Components by default and Client Components only where interactivity is required. `page.tsx` stays a pure composition file.

## Getting started

### Prerequisites

- Docker Desktop with Docker Compose v2 (no Node.js, npm or pnpm installation on the host).

### Development

```bash
docker compose up -d --build
```

Open **http://localhost:3000**.

The dev service bind-mounts the source, keeps `node_modules` and `.next` in named volumes, and hot-reloads on change.

### Quality gates (inside Docker)

```bash
docker compose exec web pnpm typecheck   # tsc --noEmit
docker compose exec web pnpm lint        # eslint .
```

### Production

```bash
docker compose -f compose.prod.yaml up -d --build
```

The production image is a multi-stage build with `output: "standalone"`, runs as a non-root user, ships only production dependencies, and exposes an HTTP healthcheck.

```bash
docker compose -f compose.prod.yaml ps   # STATUS should become "healthy"
```

### Useful commands

| Task                     | Command                                                 |
| ------------------------ | ------------------------------------------------------- |
| Start dev server         | `docker compose up -d --build`                          |
| Follow dev logs          | `docker compose logs -f web`                            |
| Type check               | `docker compose exec web pnpm typecheck`                |
| Lint                     | `docker compose exec web pnpm lint`                     |
| Lint (auto-fix)          | `docker compose exec web pnpm lint:fix`                 |
| Production build & start | `docker compose -f compose.prod.yaml up -d --build`     |
| Stop everything          | `docker compose down`                                   |
| Reset dev volumes        | `docker compose down -v`                                |

> **Windows + Docker Desktop note:** file watching uses polling (`WATCHPACK_POLLING=true`, `CHOKIDAR_USEPOLLING=true`) because bind mounts from Windows do not reliably propagate inotify events. Set them to `false` in `.env` if your setup does propagate events.

## Configuration

Copy the environment template and adjust values as needed:

```bash
cp .env.example .env
```

| Variable                        | Purpose                                     |
| ------------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Base URL for metadata, sitemap and robots   |
| `NEXT_PUBLIC_GOFUNDME_URL`      | Official campaign URL                       |
| `NEXT_PUBLIC_CONTACT_WHATSAPP`  | Contact number (international, digits only) |
| `WATCHPACK_POLLING`             | Dev file-watching fallback                  |

Campaign content lives in configuration files, never inside components:

- `src/features/donations/config/pago-movil.ts` — Pago Móvil bank details and WhatsApp message.
- `src/features/donations/config/goal-items.ts` — fundraising needs shown in the Goal section.
- `src/features/donations/config/faq-items.ts` — frequently asked questions.
- `src/lib/site-config.ts` — site name, description, campaign and contact links.

## Pending data for the official campaign

The repository is public, so all sensitive values ship as **placeholders** and are surfaced in the UI as “por confirmar”:

- Pago Móvil bank name, phone number, ID and account holder name.
- WhatsApp number for sending payment receipts.
- Verified fundraising amounts and goals (no figures are invented).
- Authorized photographs of Andrea (currently neutral SVG placeholders in `public/images/`).

Fill in the configuration files above — the UI enables copy buttons, receipts and badges automatically once the data is present.

## Privacy considerations

- The frontend never stores payment receipts, medical records or sensitive personal data.
- No card details are collected on this site; donations happen on GoFundMe or through the donor's own banking app.
- Environment files (`.env`) are excluded from Git.
- Contact channels are configurable and hidden until explicitly provided.

## License and content rights

The source code is licensed under the [MIT License](./LICENSE).

**The photographs, testimonials, personal data and campaign content are not covered by the MIT license.** They belong to their respective owners and may only be published with explicit authorization.

## Screenshots

Screenshots will be added once the authorized photographs are in place.

---

Made with purpose for Andrea. Every share moves the campaign forward.
