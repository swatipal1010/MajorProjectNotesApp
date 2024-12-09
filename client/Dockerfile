# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json first to leverage Docker's caching
COPY package.json package-lock.json /app/

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . /app/

# Build the production version of the app using Vite
RUN npm run build

# Expose the port that Vite serves on
EXPOSE 4173

# Define the command to start the Vite preview server
CMD ["npm", "run", "preview", "--", "--host"]

