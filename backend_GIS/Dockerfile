# ============================
# 1️⃣ STAGE BUILD - Compile TypeScript
# ============================
FROM node:24.22.1-bookworm-slim AS builder

WORKDIR /app

# Copy package dan install dependencies
COPY package*.json tsconfig*.json ./
RUN npm ci

# Copy source code
COPY src ./src

# Build project (hasilnya ke folder dist)
RUN npm run build


# ============================
# 2️⃣ STAGE RUN - Production image
# ============================
FROM node:24.22.1-bookworm-slim

WORKDIR /app

# Copy hanya hasil build dan dependency production
COPY package*.json ./
RUN npm ci --omit=dev \
    && npm cache clean --force

# Copy hasil build dari stage pertama
COPY --from=builder /app/dist ./dist

# Expose port internal (sesuai di index.ts, misal 8030)
EXPOSE 8170

# Jalankan server
CMD ["node", "dist/index.js"]