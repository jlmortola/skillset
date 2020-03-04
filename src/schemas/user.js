import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!,
    name: String!,
    lastName: String!,
    email: String,
    createdAt: String!
  }

  type Query {
    user(id:ID): User,
    users: [User]
  }

  type Mutation {
    signUp(name: String!, lastName: String!, email: String!, password: String!): User,
    signIn(email: String!, password: String!): User
  }


`