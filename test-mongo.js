require('dotenv').config();
const mongoose = require('mongoose');
const config = require('./config');

console.log('====== MongoDB Connection Test ======');
console.log(`Attempting to connect to: ${config.MONGODB_URI.replace(/:([^:@]+)@/, ':****@')}`);
console.log('====================================');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000, // Timeout after 15 seconds
})
.then(() => {
  console.log('✅ MongoDB Connection SUCCESSFUL!');
  console.log('====================================');
  
  // Create a simple test schema
  const TestSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now }
  });
  
  const Test = mongoose.model('ConnectionTest', TestSchema);
  
  // Try to write a test document
  return Test.create({ name: 'connection-test' })
    .then(doc => {
      console.log('✅ Successfully wrote test document:');
      console.log(doc);
      return Test.deleteOne({ _id: doc._id }); // Clean up test document
    })
    .then(() => {
      console.log('✅ Test document deleted successfully');
      console.log('====================================');
      process.exit(0);
    });
})
.catch(err => {
  console.error('❌ MongoDB Connection FAILED:');
  console.error(err);
  console.log('\n====================================');
  console.log('Possible solutions:');
  console.log('1. Check if your MongoDB Atlas cluster is running');
  console.log('2. Verify your connection string (username, password, host)');
  console.log('3. Make sure your IP address is whitelisted in MongoDB Atlas Network Access');
  console.log('4. Check if your database user has the right permissions');
  console.log('====================================');
  process.exit(1);
}); 