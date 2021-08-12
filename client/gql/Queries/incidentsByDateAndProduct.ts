import { gql } from "@apollo/client";

const INCIDENTS_BY_DATE_AND_PRODUCT = gql`
  query GetIncidentsByDateAndProduct($pagination: Pagination) {
    incidentsByDateAndProduct(pagination: $pagination) {
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

export { INCIDENTS_BY_DATE_AND_PRODUCT };
