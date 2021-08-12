import { gql } from "@apollo/client";

const CREATE_INCIDENT = gql`
  mutation CreateIncident(
    $emails: [String]!
    $type: IncidentType!
    $cause: IncidentCause!
    $resolution: [IncidentResolution]!
    $date: String!
    $relayPointId: String!
    $speciesId: String
    $refundAmount: Float
    $comment: String
  ) {
    createIncident(
      emails: $emails
      type: $type
      cause: $cause
      resolution: $resolution
      date: $date
      relayPointId: $relayPointId
      speciesId: $speciesId
      refundAmount: $refundAmount
      comment: $comment
    ) {
      _id
    }
  }
`;

export { CREATE_INCIDENT };
