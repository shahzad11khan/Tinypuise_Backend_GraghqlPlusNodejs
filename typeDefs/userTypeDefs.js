// typeDefs/userTypeDefs.js
const { gql } = require('apollo-server');

// GraphQL schema for User
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type CreateUserResponse {
    message: String
    id: ID
  }

  type DeleteResponse {
    message: String
    id: ID
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput!): CreateUserResponse!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): DeleteResponse!
  }
`;

module.exports = typeDefs;
