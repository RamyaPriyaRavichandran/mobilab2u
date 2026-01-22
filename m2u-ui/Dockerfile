# Use Node.js 20 alpine image as builder
FROM node:20.15.0-alpine AS builder

# Set up working directory
RUN mkdir /app
WORKDIR /app

# Upgrade and install git
RUN apk --no-cache add git

# Copy essential files
COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY . .

# Install dependencies and build
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

# Set up the production image
FROM node:20.15.0-alpine
WORKDIR /app

# Copy build output from builder
COPY --from=builder /app .

# Expose port for health check with fly.io
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start"]
