# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and bun.lockb to the container
COPY package.json bun.lockb ./

# Install Bun
RUN npm install -g bun

# Install project dependencies using Bun
RUN bun install

# Copy the rest of the application code to the container
COPY . .

# Build your SvelteKit application using Bun
RUN bun run build

# Expose the port your SvelteKit app will run on
ENV PORT=8080
EXPOSE $PORT

# Start the SvelteKit application
CMD ["bun", "./build/index.js"]