# Instagram Login Page Clone

This project is an Instagram login page clone that captures user credentials and stores them in a MongoDB database.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd insta_dummy
```

2. Install dependencies:
```
npm install
```

3. Configure environment variables:
- Rename `.env.example` to `.env` (or use the existing `.env` file)
- Update the MongoDB connection string if needed

4. Start MongoDB:
- If using a local MongoDB installation, make sure MongoDB service is running
- If using MongoDB Atlas, ensure your connection string in the `.env` file is correct

5. Start the application:
```
npm start
```

Or for development with auto-restart:
```
npm run dev
```

6. Access the application:
Open your browser and navigate to `http://localhost:3000`

## Features
- Exact replica of Instagram login page UI
- Captures user credentials (email/phone/username and password)
- Stores captured data in MongoDB database
- Redirects users to a success page after login

## Disclaimer
This application is meant for educational purposes only. Do not use this for any malicious activities or to collect user credentials without explicit permission. 