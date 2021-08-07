import { ApolloServer, gql } from "apollo-server";
import { insertData } from "./scripts";
import { resolvers, typeDefs } from "./graphql";

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
  insertData();
});
