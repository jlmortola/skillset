import { gql } from 'apollo-server';

export default gql`
  type Chat {
    id: ID!,
    users: [User!],
    lastMessage: Message,
    messages: [Message]
  }

  extend type Mutation {
    createChat(users: [ID!]): Chat!
  }
`
