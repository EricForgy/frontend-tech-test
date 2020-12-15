const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { addResolversToSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("apollo-server");
const path = require("path");

const resolvers = require("./resolvers");
const dataSources = require("./data-sources");

const schemaFilepath = path.join(path.dirname(__filename), "../schema.graphql");

const schemaFile = loadSchemaSync(schemaFilepath, {
  loaders: [new GraphQLFileLoader()],
});

const schema = addResolversToSchema({
  schema: schemaFile,
  resolvers,
});

exports.server = new ApolloServer({ schema, dataSources });
