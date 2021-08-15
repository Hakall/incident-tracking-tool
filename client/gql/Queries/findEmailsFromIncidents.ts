import { gql } from "@apollo/client";

const FIND_EMAILS_FROM_INCIDENTS = gql`
  query FindEmailsFromIncidents($email: String!) {
    findEmailsFromIncidents(email: $email)
  }
`;

export { FIND_EMAILS_FROM_INCIDENTS };
