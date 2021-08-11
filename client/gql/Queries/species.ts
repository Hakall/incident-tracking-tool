import { gql } from "@apollo/client";

const GET_SPECIES = gql`
  query GetSpecies {
    species {
      _id
      name
    }
  }
`;

export { GET_SPECIES };
