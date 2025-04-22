# Deployment Guide for Instagram Clone

This guide will help you deploy your Instagram login clone to various platforms.

## Prerequisites
- Git installed on your local machine
- Node.js and npm installed
- MongoDB Atlas account (for database)
- Heroku, Render, or Railway account (for hosting)

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (the free tier is sufficient)
3. Set up database access:
   - Go to Security > Database Access
   - Add a new database user with a secure password
4. Set up network access:
   - Go to Security > Network Access
   - Add a new IP address (you can allow access from anywhere with 0.0.0.0/0 for testing)
5. Get your connection string:
   - Go to Clusters > Connect > Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user's password
   - Replace `myFirstDatabase` with `instadummy`

## Option 1: Deploy to Heroku

1. Install Heroku CLI:
   ```
   npm install -g heroku
   ```

2. Login to Heroku:
   ```
   heroku login
   ```

3. Create a new Heroku app:
   ```
   heroku create instagram-clone-app
   ```
   (Replace `instagram-clone-app` with your preferred app name)

4. Set environment variables:
   ```
   heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
   heroku config:set NODE_ENV="production"
   ```

5. Deploy to Heroku:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku master
   ```

6. Open your app:
   ```
   heroku open
   ```

## Option 2: Deploy to Render

1. Create a new account on [Render](https://render.com) if you don't have one

2. Create a new Web Service:
   - Connect your GitHub/GitLab repository
   - Select the repository containing your Instagram clone

3. Configure the web service:
   - Name: `instagram-clone` (or your preferred name)
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. Add environment variables:
   - MONGODB_URI: your MongoDB Atlas connection string
   - NODE_ENV: production

5. Click "Create Web Service"

## Option 3: Deploy to Railway

1. Create a new account on [Railway](https://railway.app) if you don't have one

2. Start a new project and select "Deploy from GitHub repo"

3. Select your repository

4. Add environment variables:
   - MONGODB_URI: your MongoDB Atlas connection string
   - NODE_ENV: production

5. Deploy the application

## Verifying Deployment

After deployment, open your application URL and test the login functionality. Make sure:

1. The login page loads correctly
2. You can enter credentials
3. The data is being saved to MongoDB Atlas
4. The success page appears after login

## Troubleshooting

If you encounter issues:

1. Check application logs:
   - On Heroku: `heroku logs --tail`
   - On Render: Go to your service dashboard > Logs
   - On Railway: Go to your project dashboard > Logs

2. Common issues:
   - MongoDB connection errors: Check your connection string and network access settings
   - Application crashes: Check for errors in your code
   - Port issues: Make sure your app uses the PORT environment variable 