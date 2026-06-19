const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typedefs_index = require("./src/graphql/typedefs_index");
const resolver_index = require("./src/graphql/resolver_index");

const app = express();
const port = 4298;

async function start_server() {
  const apolloServer = new ApolloServer({
    typeDefs: typedefs_index,
    resolvers: resolver_index,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  app.listen(port, () => {
    console.log(`🚀 erver running at http://localhost:${port}/graphql`);
  });
}

start_server();
