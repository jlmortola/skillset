import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!,
    name: String!,
    lastName: String!,
    chats: [Chat!],
    email: String,
  }

  type Query {
    me: User,
    user(id:ID): User,
    users: [User]
  }

  type Mutation {
    editUser(id: ID!, name: String, lastName: String, email: String, password: String): User!,
    requestResetPasswordToken(email: String): Message!,
    resetPassword(email: String!, password: String!, token: String!): User!,
    signIn(email: String!, password: String!): User,
    signOut: Message!,
    signUp(name: String!, lastName: String!, email: String!, password: String!): User,
  }
`