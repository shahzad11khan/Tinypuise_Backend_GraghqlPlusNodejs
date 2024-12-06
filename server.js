// server.js
const { ApolloServer } = require('apollo-server');
const express = require('express');
const connectDB = require('./db/index'); // Import the DB connection function
const typeDefs = require('./typeDefs/userTypeDefs'); // Import the GraphQL type definitions
const resolvers = require('./resolvers/userResolver'); // Import the resolvers

// Connect to MongoDB
connectDB();

const app = express();

// Root endpoint to verify GraphQL connection
app.get('/', (req, res) => {
  res.send('GraphQL server is running and connected!');
});
// Set up Apollo Server with type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
    playground: true,
  introspection: true,
});

// Start the server and listen on a specified port
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
