FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
# COPY .env .env  - we don't do that with docker-compose, it will handle it

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ["npm", "start"]