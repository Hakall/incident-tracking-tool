import { gql } from "@apollo/client";

const GET_RELAY_POINTS = gql`
  query GetRelayPoints {
    relayPoints {
      _id
      name
      day
    }
  }
`;

export { GET_RELAY_POINTS };
