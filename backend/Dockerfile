FROM node:22.16-slim AS base

# Set pnpm environment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

# Install corepack and pnpm
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

# Add non-root user
RUN useradd --create-home --shell /bin/bash appuser
WORKDIR /app

# Copy package manager files explicitly
COPY package.json pnpm-lock.yaml ./

# Install production dependencies
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Install all dependencies and build
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --chown=appuser:appuser . .
RUN pnpm run build

# Final runtime image
FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

COPY --chown=appuser:appuser . .

USER appuser
EXPOSE 8000
CMD ["pnpm", "start"]
