// src/db/index.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

async function connectDB() {
  try {
    // Using environment variables directly for clarity
    const mongoURI = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;

    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit with failure
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

module.exports = connectDB;
