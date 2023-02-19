FROM node:16-alpine
WORKDIR /app

COPY package.json ./

# Copies project files to /app on container
COPY . .

# Install dependencies, see package.json
RUN npm install

# Builds the app, see package.json
RUN npm run build

# Just for documentation purposes
EXPOSE 3000

# DB connection string as ENV Var
CMD ["npm", "run", "start:prod"]