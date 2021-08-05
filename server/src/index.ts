import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type RelayPoint {
    name: String
    day: String
  }

  type Query {
    relayPoints: [RelayPoint]
  }
`;

const relayPoints = [
  {
    name: "3 Ptits Pois",
    day: "mercredi",
  },
  {
    name: "3 Ptits Pois",
    day: "jeudi",
  },
];

const resolvers = {
  Query: {
    relayPoints: () => relayPoints,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
