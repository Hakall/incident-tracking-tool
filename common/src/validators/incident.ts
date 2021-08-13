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
      return Object.keys(IncidentCause);
  }
};

const isRefundAmountMandatory = (resolution: string[]): boolean => {
  if (
    resolution.some((_resolution) =>
      ["PARTIAL_REFUND", "REFUND"].includes(_resolution)
    )
  ) {
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
    !incident.resolution.length ||
    incident.resolution.some(
      (resolution) =>
        !IncidentResolution[resolution as keyof typeof IncidentResolution]
    )
  ) {
    const unvalid = incident.resolution.find(
      (resolution) =>
        !IncidentResolution[resolution as keyof typeof IncidentResolution]
    );
    throw new Error(`${unvalid} is not a valid IncidentResolution`);
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

  if (
    isRefundAmountMandatory(incident.resolution) &&
    (incident.refundAmount === undefined || incident.refundAmount < 0)
  ) {
    throw new Error(
      `Invalid value for RefundAmount for IncidentResolution ${incident.resolution}`
    );
  }
};

export { causesByType, validateIncident };
