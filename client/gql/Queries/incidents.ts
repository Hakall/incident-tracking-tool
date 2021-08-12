import { gql } from "@apollo/client";

const GET_INCIDENTS = gql`
  query GetIncidents($pagination: Pagination) {
    incidents(pagination: $pagination) {
      _id
      date
      emails
      relayPoint {
        _id
        name
        day
      }
      type
      cause
      resolution
      species {
        _id
        name
      }
      refundAmount
      comment
    }
  }
`;

export { GET_INCIDENTS };
