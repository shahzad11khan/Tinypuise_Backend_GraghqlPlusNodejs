// // server.js
// const { ApolloServer } = require('apollo-server');
// const { graphqlHTTP } = require("express-graphql");
// const express = require('express');
// const connectDB = require('./db/index'); // Import the DB connection function
// const typeDefs = require('./typeDefs/userTypeDefs'); // Import the GraphQL type definitions
// const resolvers = require('./resolvers/userResolver'); // Import the resolvers

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Root endpoint to verify GraphQL connection
// app.get('/', (req, res) => {
//   res.send('GraphQL server is running and connected!');
// });


// // Set up Apollo Server with type definitions and resolvers
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//     playground: true,
//   introspection: true,
// });

// // Start the server and listen on a specified port
// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
//   console.log(`Server is running at ${url}`);
// });
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv');
const connectDB = require('./db/index');
const schema = require('./graphql/schema');
const rootValue = require('./graphql/userResolver');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true, // Enable GraphiQL interface for testing
}));

// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
