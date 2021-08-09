import { gql } from "@apollo/client";

const CREATE_INCIDENT = gql`
  mutation CreateIncident($emails: [String]!) {
    createIncident(emails: $emails) {
      _id
      emails
    }
  }
`;

export { CREATE_INCIDENT };
