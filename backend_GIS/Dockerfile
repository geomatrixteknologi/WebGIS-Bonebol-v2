# ============================
# 1️⃣ STAGE BUILD - Compile TypeScript
# ============================
FROM node:20-alpine AS builder

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
FROM node:20-alpine

WORKDIR /app

# Copy hanya hasil build dan dependency production
COPY package*.json ./
RUN npm install --omit=dev

# Copy hasil build dari stage pertama
COPY --from=builder /app/dist ./dist

# Expose port internal (sesuai di index.ts, misal 8030)
EXPOSE 8170

# Jalankan server
CMD ["npm", "run", "serve"]