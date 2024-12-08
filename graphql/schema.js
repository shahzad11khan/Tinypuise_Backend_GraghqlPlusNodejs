const { buildSchema } = require('graphql');

const schema = buildSchema(`
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

    type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

    type Query {
    users: [User!]!
    user(id: ID!): User
  }


  type Mutation {
    createUser(input: UserInput!): CreateUserResponse!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): DeleteResponse!
    login(email: String!, password: String!): AuthData!
  }
`);

module.exports = schema;
