# syntax=docker/dockerfile:1

FROM node:22.1-alpine AS dev

# System dependencies
RUN apk add --no-cache libc6-compat

# Issue: issue with outdated signatures in Corepack (https://github.com/nodejs/corepack/issues/612)
RUN npm install --global corepack@latest

# Use pnpm via corepack (stable version)
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

# Add a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
WORKDIR /app

# Copy package manager files
COPY --chown=appuser:appgroup package.json ./
COPY --chown=appuser:appgroup pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source
COPY --chown=appuser:appgroup . .

# Expose dev port
EXPOSE 3000

CMD ["pnpm", "dev"]
