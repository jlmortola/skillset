import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    name: String!
    lastName: String!
    chats: [Chat!]
    email: String
  }

  type DefaultMessage {
    message: String
  }

  extend type Query {
    me: User @auth
    user(id:ID): User @auth
    users: [User] @auth
  }

  extend type Mutation {
    editUser(id: ID!, name: String, lastName: String, email: String, password: String): User! @auth
    requestResetPasswordToken(email: String): DefaultMessage!
    resetPassword(email: String!, password: String!, token: String!): User!
    signIn(email: String!, password: String!): User
    signOut: DefaultMessage! @auth
    signUp(name: String!, lastName: String!, email: String!, password: String!): User
  }
`