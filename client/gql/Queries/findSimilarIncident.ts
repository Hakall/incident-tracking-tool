import { gql } from "@apollo/client";

const FIND_SIMILAR_INCIDENT = gql`
  query GetIncidents($incident: SimilarIncident) {
    findSimilarIncident(incident: $incident) {
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

export { FIND_SIMILAR_INCIDENT };
