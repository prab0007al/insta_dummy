#!/bin/bash

# This script helps deploy the Instagram clone to Heroku

# Initialize git repository if it doesn't exist
if [ ! -d .git ]; then
  echo "Initializing Git repository..."
  git init
  git add .
  git commit -m "Initial commit"
else
  echo "Git repository already initialized."
  git add .
  git commit -m "Deployment update"
fi

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
  echo "Heroku CLI is not installed. Please install it first."
  exit 1
fi

# Check if already logged in to Heroku
if ! heroku auth:whoami &> /dev/null; then
  echo "Please login to Heroku:"
  heroku login
fi

# Check if Heroku app exists
if ! heroku apps | grep -q "instagram-clone-app"; then
  echo "Creating Heroku app..."
  heroku create instagram-clone-app
else
  echo "Heroku app already exists."
fi

# Set environment variables
echo "Setting environment variables..."
read -p "Enter your MongoDB Atlas connection string: " mongo_uri
heroku config:set MONGODB_URI="$mongo_uri" -a instagram-clone-app
heroku config:set NODE_ENV="production" -a instagram-clone-app

# Deploy to Heroku
echo "Deploying to Heroku..."
git push heroku master

# Open the app
echo "Deployment complete. Opening app..."
heroku open -a instagram-clone-app 