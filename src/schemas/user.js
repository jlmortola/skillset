import { gql } from 'apollo-server';

export default gql`
  type Message {
    message: String!,
  }

  type User {
    id: ID!,
    name: String!,
    lastName: String!,
    email: String,
    createdAt: String!
  }

  type Query {
    me: User,
    user(id:ID): User,
    users: [User]
  }

  type Mutation {
    editUser(id: ID!, name: String, lastName: String, email: String, password: String): User!,
    signIn(email: String!, password: String!): User,
    signOut: Message!,
    signUp(name: String!, lastName: String!, email: String!, password: String!): User,
  }
`