# syntax=docker/dockerfile:1.7
# -----------------------------------------------------------------------------
# Hope Motion — multi-stage build (Node.js 24 + pnpm via Corepack)
# Stages: base -> deps -> build -> runner (production) | base (development)
# -----------------------------------------------------------------------------

ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-alpine AS base
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    COREPACK_HOME=/pnpm/corepack \
    NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
WORKDIR /app

# ---- Dependencies -----------------------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ---- Build ------------------------------------------------------------------
FROM base AS build
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_GOFUNDME_URL=https://www.gofundme.com/f/ayuda-a-andrea-a-volver-a-caminar-sin-muletas
ARG NEXT_PUBLIC_CONTACT_WHATSAPP=
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_GOFUNDME_URL=${NEXT_PUBLIC_GOFUNDME_URL} \
    NEXT_PUBLIC_CONTACT_WHATSAPP=${NEXT_PUBLIC_CONTACT_WHATSAPP} \
    NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---- Production runner ------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
WORKDIR /app

COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

CMD ["node", "server.js"]
