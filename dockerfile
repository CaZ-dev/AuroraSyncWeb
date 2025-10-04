# Step 1: Use the official Node.js image from the Docker Hub
FROM node:14

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of your application code into the container
COPY . .

# Step 5: Expose the port the app will run on
EXPOSE 3000

# Step 6: Define the command to run your app
CMD ["npm", "start"]
