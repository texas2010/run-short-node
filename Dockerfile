FROM node:20

# Set workdir
WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./
COPY tsconfig.json ./
COPY vitest.config.ts ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Set shell to bash for better UX (optional)
SHELL ["/bin/bash", "-c"]

# Default: Run bash, so container stays alive for dev
CMD ["bash"]
