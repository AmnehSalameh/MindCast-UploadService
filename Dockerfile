# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app listens on (replace with your app's port)
EXPOSE 3001

# Define the command to start your application
CMD ["yarn", "start"]

#How to run
#docker build -t upload-video-service .
#docker run -p 3000:3000 -d upload-video-service