const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Product {
    id: String!
    title: String
    count: Int
  }

  type Query {
    allProducts(filter: String): [Product]
    product(id: String!): Product
  }
`;

module.exports = typeDefs;
