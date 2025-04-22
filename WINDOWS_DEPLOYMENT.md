# Deploying Instagram Clone on Windows

Follow these steps to deploy your Instagram clone on Windows systems.

## Setting Up MongoDB Atlas

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (free tier is sufficient)
3. Set up database access:
   - Go to Security > Database Access
   - Add a new database user with a secure password
4. Set up network access:
   - Go to Security > Network Access
   - Add `0.0.0.0/0` to allow access from anywhere (for testing purposes)
5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user's password
   - Replace `myFirstDatabase` with `instadummy`

## Option 1: Deploy to Render

Render is an excellent alternative to Heroku and works well for deploying Node.js applications.

1. Push your code to a GitHub repository:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin master
   ```

2. Sign up for Render at [https://render.com](https://render.com)

3. Create a new Web Service:
   - Connect your GitHub repository
   - Use these settings:
     - Name: instagram-clone (or your preferred name)
     - Environment: Node
     - Build Command: `npm install`
     - Start Command: `npm start`
   
4. Add environment variables:
   - Key: `MONGODB_URI`, Value: your MongoDB Atlas connection string
   - Key: `NODE_ENV`, Value: `production`

5. Click "Create Web Service"

## Option 2: Deploy to Railway

Railway is another excellent platform for Node.js deployments.

1. Push your code to GitHub:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin master
   ```

2. Sign up for Railway at [https://railway.app](https://railway.app)

3. Create a new project and select "Deploy from GitHub repo"

4. Select your repository

5. Add environment variables:
   - `MONGODB_URI`: your MongoDB Atlas connection string
   - `NODE_ENV`: production

6. Deploy the application

## Option 3: Deploy to Heroku on Windows

1. Install Heroku CLI from [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

2. Open PowerShell and login to Heroku:
   ```powershell
   heroku login
   ```

3. Navigate to your project directory:
   ```powershell
   cd path\to\insta_dummy
   ```

4. Create a new Heroku app:
   ```powershell
   heroku create instagram-clone-app
   ```

5. Set environment variables:
   ```powershell
   heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
   heroku config:set NODE_ENV="production"
   ```

6. Initialize Git and deploy:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku master
   ```

7. Open your deployed app:
   ```powershell
   heroku open
   ```

## Verifying Your Deployment

After deployment:
1. Open your application URL
2. Test the login form
3. Verify data is being saved to MongoDB Atlas:
   - Log into your MongoDB Atlas account
   - Go to Collections
   - Check the `users` collection in the `instadummy` database

## Troubleshooting Windows Deployment Issues

1. **Git Issues**:
   - Make sure Git is installed correctly on your Windows machine
   - If you encounter permission issues, try running PowerShell as Administrator

2. **Heroku CLI Issues**:
   - After installing, you may need to restart your PowerShell or computer
   - If you see errors about SSH keys, run `heroku keys:add`

3. **MongoDB Connection Issues**:
   - Double-check your connection string
   - Make sure you've allowed access from all IPs (0.0.0.0/0) in Network Access
   - Ensure your database user has the correct permissions 