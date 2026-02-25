# ---- Builder Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the Vite app
ARG VITE_API_BASE_URL=http://localhost:5000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# ---- Production Stage (Nginx) ----
FROM nginx:1.25-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
