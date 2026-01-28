# --- ESTÁGIO BASE: Configurações Comuns ---
FROM node:24-slim AS base
RUN apt-get update -y && apt-get install -y \
    openssl \
    libssl-dev \
    ca-certificates \
    git \
    zsh \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN chsh -s $(which zsh) && touch ~/.zshrc

WORKDIR /app

# --- ESTÁGIO 1: Instalação ---
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
RUN pnpm install --frozen-lockfile

# --- ESTÁGIO 2: Build ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN pnpm run build

# --- ESTÁGIO 3: Runner ---
FROM base AS runner
ENV NODE_ENV=production

COPY --from=builder /app/prisma ./prisma 
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/src/main"]