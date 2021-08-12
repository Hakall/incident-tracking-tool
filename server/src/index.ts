import { ApolloServer } from "apollo-server";
import { insertData } from "./scripts";
import { resolvers, typeDefs } from "./graphql";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(async ({ url }) => {
  await insertData();
  console.log(`🚀  Server ready at ${url}`);
});
