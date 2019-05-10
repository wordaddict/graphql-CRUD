const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type Company {
      id: ID!
      name: String
    }
    type Query {
      Companies: [Company]
      Company(id: ID!): Company
    }
    type Mutation {
      addCompany(name: String!): Company,
      updateCompany(id: ID!, name: String!): Company,
      deleteCompany(id: ID!): Company,
    }
    type Subscription {
      companyAdded: Company,
      companyEdited: Company,
      companyDeleted: Company
    }
    `;

const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;