import { gql } from 'apollo-server';

export default gql`
  type Message {
    id: ID!,
    user: User!,
    chat: Chat!,
    body: String!,
  }

  extend type Mutation {
    sendMessage(user: ID!, chat: ID!, body: String!): Message!
  }

`
