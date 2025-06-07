# syntax=docker/dockerfile:1

FROM node:22.1-alpine AS dev

WORKDIR /app

# Ensure system dependencies
RUN apk add --no-cache libc6-compat

RUN npm install --global corepack@latest

# Enable Corepack and ensure correct pnpm version
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package manager config
COPY package.json pnpm-lock.yaml* .npmrc* ./

# Install dependencies
RUN pnpm install

# Copy application source
COPY . .

# Expose the default Next.js dev port
EXPOSE 3000

# Default command to start Next.js in development mode
CMD ["pnpm", "dev"]
