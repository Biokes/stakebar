FROM node:20-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package definitions
COPY package.json ./
COPY pnpm-lock.yaml* ./

# Conditional install: if lockfile exists, use frozen mode; else install fresh
RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm install --frozen-lockfile; \
    else \
      pnpm install --no-frozen-lockfile; \
    fi

COPY . .

CMD ["pnpm", "start"]