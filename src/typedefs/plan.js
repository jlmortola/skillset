import { gql } from 'apollo-server';

export default gql`
  type Plan {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  extend type Query {
    plan(id: ID!): Plan!
    plans: [Plan!]!
  }

  extend type Mutation {
    createPost(title: String!, content: String!): Plan!
  }
`;