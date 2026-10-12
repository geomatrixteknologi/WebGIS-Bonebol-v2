# ============================
# 1️⃣ STAGE BUILD - Compile TypeScript
# ============================
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Copy package dan install dependencies
COPY package*.json tsconfig*.json ./
RUN npm install

# Copy source code
COPY src ./src

# Build project (hasilnya ke folder dist)
RUN npm run build


# ============================
# 2️⃣ STAGE RUN - Production image
# ============================
FROM node:20-bookworm-slim

WORKDIR /app

# 1. Install libaio1 (Required by Oracle Client)
# Note: The Oracle Client files will be mounted via docker-compose.yml
RUN apt-get update && apt-get install -y --no-install-recommends \
    libaio1 \
    && rm -rf /var/lib/apt/lists/*

# Copy hanya hasil build dan dependency production
COPY package*.json ./
RUN npm install --omit=dev

# Copy hasil build dari stage pertama
COPY --from=builder /app/dist ./dist

# Expose port internal (sesuai di index.ts, misal 8030)
EXPOSE 8180

# Jalankan server
CMD ["npm", "run", "serve"]