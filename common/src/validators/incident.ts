import {
  IncidentCause,
  IncidentResolution,
  IncidentToCreate,
  IncidentType,
} from "../models";

const causesByType = (type: string) => {
  switch (type) {
    case "CONDITIONING":
      return ["LEAK", "OPEN"];
    case "DELIVERY":
      return [
        "DELAY",
        "LATE_NEXT_DAY",
        "MISSING_LOCKER",
        "TEMPERATURE",
        "PARTIAL_DELIVERY",
        "WRONG_ADDRESS",
        "UNDELIVERED",
        "EQUIPMENT",
      ];
    case "RELAY_POINT":
      return ["CLOSING", "WRONG_ADDRESS"];
    case "PRODUCT":
      return [
        "INVERSION",
        "WEIGHT",
        "LACK",
        "FRESHNESS",
        "MORTALITY",
        "CUTTING",
        "DIVERSITY",
        "NOT_EMPTIED",
        "TOWARDS",
        "SAND",
      ];
    case "CUSTOMER":
      return ["OVERSIGHT", "PAYMENT", "DISSATISFACTION"];
    case "ETRADE":
      return [
        "PAYMENT",
        "BROWSER",
        "MAIL_NOT_RECEIVED",
        "IMPOSSIBLE_ORDER",
        "SHIPPING_COST",
        "OTHER",
      ];
    default:
      return null;
  }
};

const isRefundAmountMandatory = (resolution: string): boolean => {
  if (["PARTIAL_REFUND", "REFUND"].includes(resolution)) {
    return true;
  }
  return false;
};

const validateIncident = (incident: IncidentToCreate) => {
  if (!IncidentType[incident.type as keyof typeof IncidentType]) {
    throw new Error(`${incident.type} is not a valid IncidentType`);
  }

  if (!IncidentCause[incident.cause as keyof typeof IncidentCause]) {
    throw new Error(`${incident.cause} is not a valid IncidentCause`);
  }

  if (
    !IncidentResolution[incident.resolution as keyof typeof IncidentResolution]
  ) {
    throw new Error(`${incident.resolution} is not a valid IncidentResolution`);
  }

  if (!causesByType(incident.type)) {
    throw new Error(`No cause found for ${incident.type} IncidentType`);
  }

  if (
    causesByType(incident.type) &&
    !causesByType(incident.type)!.find((cause) => incident.cause === cause)
  ) {
    throw new Error(
      `${incident.cause} is not a valid IncidentCause for IncidentType ${incident.type}`
    );
  }

  if (incident.type === "PRODUCT" && !incident.speciesId) {
    throw new Error(
      `Species was not specified for IncidentType ${incident.type}`
    );
  }

  if (isRefundAmountMandatory(incident.resolution) && !incident.refundAmount) {
    throw new Error(
      `RefundAmount was not specified for IncidentResolution ${incident.resolution}`
    );
  }
};

export { causesByType, validateIncident };
