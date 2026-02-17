# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src/ ./src/

RUN NODE_OPTIONS="--max-old-space-size=2048" npx tsc

# Stage 2: Runtime
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist/ ./dist/

# Config files are bind-mounted at /config/ by the caller.
# In rootless Podman, container root maps to the unprivileged host user,
# so no extra USER directive is needed for security.
ENV CONTAINER=true

ENTRYPOINT ["node", "dist/index.js"]
