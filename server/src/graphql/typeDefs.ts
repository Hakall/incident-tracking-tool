import { gql } from "apollo-server";

export const typeDefs = gql`
  enum IncidentCause {
    LEAK
    OPEN
    DELAY
    LATE_NEXT_DAY
    MISSING_LOCKER
    TEMPERATURE
    PARTIAL_DELIVERY
    WRONG_ADDRESS
    UNDELIVERED
    EQUIPMENT
    CLOSING
    INVERSION
    WEIGHT
    LACK
    FRESHNESS
    MORTALITY
    CUTTING
    DIVERSITY
    NOT_EMPTIED
    TOWARDS
    SAND
    OVERSIGHT
    PAYMENT
    DISSATISFACTION
    BROWSER
    MAIL_NOT_RECEIVED
    IMPOSSIBLE_ORDER
    SHIPPING_COST
    OTHER
  }

  enum IncidentType {
    CONDITIONING
    DELIVERY
    RELAY_POINT
    PRODUCT
    CUSTOMER
    ETRADE
  }

  enum IncidentResolution {
    MAIL
    PHONE_CALL
    PARTIAL_REFUND
    REFUND
  }

  type Incident {
    _id: ID!
    date: String!
    emails: [String]!
    relayPoint: RelayPoint!
    type: IncidentType!
    cause: IncidentCause!
    resolution: [IncidentResolution]!
    species: Species
    refundAmount: Float
    comment: String
  }

  type RelayPoint {
    _id: ID!
    name: String!
    day: String!
  }

  type Species {
    _id: ID!
    name: String!
  }

  type Pagination {
    size: Int!
    page: Int!
    total: Int!
  }

  type Incidents {
    incidents: [Incident]
    pagination: Pagination
  }

  type IncidentsByDateAndProduct {
    incidents: [[Incident]]
    pagination: Pagination
  }

  input PaginationInput {
    size: Int!
    page: Int!
  }

  input SimilarIncident {
    emails: [String]
    date: String!
  }

  type Query {
    relayPoints: [RelayPoint]
    species: [Species]
    incidents(pagination: PaginationInput): Incidents
    incidentsByDateAndProduct(
      pagination: PaginationInput
    ): IncidentsByDateAndProduct
    findSimilarIncident(incident: SimilarIncident): [Incident]
  }

  type Mutation {
    createIncident(
      emails: [String]!
      type: IncidentType!
      resolution: [IncidentResolution]!
      cause: IncidentCause!
      date: String!
      relayPointId: String!
      speciesId: String
      refundAmount: Float
      comment: String
    ): Incident
  }
`;
