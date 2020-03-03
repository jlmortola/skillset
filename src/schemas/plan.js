import { gql } from 'apollo-server';

export default gql`
  type Plan {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    plan(id: ID!): Plan!
    plans: [Plan!]!
  }

  type Mutation {
    createPost(title: String!, content: String!): Plan!
  }
`;