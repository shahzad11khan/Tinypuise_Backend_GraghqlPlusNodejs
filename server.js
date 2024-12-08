// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const dotenv = require('dotenv');
// const connectDB = require('./db/index');
// const schema = require('./graphql/schema');
// const rootValue = require('./graphql/userResolver');

// // Load environment variables
// dotenv.config();

// // Initialize the app
// const app = express();

// // Connect to MongoDB
// connectDB();

// // Set up GraphQL endpoint
// app.use('/graphql', graphqlHTTP({
//   schema,
//   rootValue,
//   graphiql: process.env.NODE_ENV !== 'production', // Disable GraphiQL in production
// }));

// // Centralized Error Handling (Optional)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

require('module-alias/register');
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
  graphiql: process.env.NODE_ENV !== 'production', // Disable GraphiQL in production
}));

// Centralized Error Handling (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});