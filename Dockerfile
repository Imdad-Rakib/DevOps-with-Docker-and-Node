# Stage 1: Base
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./


# Stage 2: Development
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]


# Stage 4: Production
FROM base AS production
ENV NODE_ENV=production
RUN npm install --only=production
COPY . .
EXPOSE 8000
CMD ["npm", "start"]