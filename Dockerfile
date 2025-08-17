# ----------- Stage 1: Build ------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Build the React app
RUN npm run build

# ----------- Stage 2: Final Image ------------
FROM nginx:alpine

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Clean default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Change ownership to non-root user
USER root
RUN mkdir -p /var/cache/nginx /var/run /etc/nginx \
    && chown -R appuser:appgroup /var/cache/nginx /var/run /etc/nginx /usr/share/nginx/html

# Use non-root user
USER appuser

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
