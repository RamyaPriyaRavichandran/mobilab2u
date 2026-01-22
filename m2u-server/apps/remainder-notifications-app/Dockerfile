
# Use Node.js 20 alpine image as builder
FROM node:20.15.0-alpine
# Set up working directory
RUN mkdir /app
WORKDIR /app

# Copy essential files
COPY . .

# Install dependencies and build
RUN npm install
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "dev"]
