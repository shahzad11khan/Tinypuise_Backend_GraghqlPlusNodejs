// src/db/index.js
const { DB_NAME } = require('../constant');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

 async function connectDB() {
  try {
    mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}

module.exports = connectDB;


// local url
// import mongoose from "mongoose";

// export async function connect() {
//   try {
//     // Replace 'localhost' with your actual local MongoDB host if different
//     const uri = `mongodb://localhost:27017/${process.env.DATABASE_NAME}`;

//     // Connect to MongoDB
//     await mongoose.connect(uri);

//     const connection = mongoose.connection;

//     connection.on("connected", () => {
//       console.log("MongoDB connected successfully");
//     });

//     connection.on("error", (err) => {
//       console.log(
//         "MongoDB connection error. Please make sure MongoDB is running. " + err
//       );
//       process.exit();
//     });
//   } catch (error) {
//     console.log("Something went wrong!");
//     console.log(error);
//   }
// }