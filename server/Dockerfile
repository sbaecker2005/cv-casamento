# Multi-stage build para reduzir tamanho e garantir build do better-sqlite3 em Node 22
FROM node:22-bookworm AS build
WORKDIR /app
# Dependências nativas necessárias para compilar better-sqlite3
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
# Copia somente node_modules (com binários compilados) e dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env* ./
# Copia diretório data se já existir com banco inicial
COPY --from=build /app/data ./data
EXPOSE 3001
CMD ["node","dist/server.js"]
