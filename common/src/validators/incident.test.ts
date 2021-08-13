import { validateIncident } from "./incident";
import { IncidentToCreate } from "../models";

const validIncident: IncidentToCreate = {
  date: "2021-09-09",
  type: "PRODUCT",
  cause: "SAND",
  speciesId: "123456",
  relayPointId: "123456",
  resolution: ["REFUND"],
  emails: [],
  refundAmount: 0,
};

const invalidIncident: IncidentToCreate = {
  date: "",
  type: "",
  cause: "",
  relayPointId: "",
  resolution: [],
  emails: [],
  refundAmount: -10,
};

describe("Incident validation", () => {
  it("valid", () => {
    let throwError = false;
    try {
      validateIncident(validIncident);
    } catch (e) {
      throwError = true;
    }
    expect(throwError).toBeFalsy();
  });

  it("invalid", () => {
    try {
      validateIncident(invalidIncident);
    } catch (e) {
      expect(e.toString().includes("is not a valid IncidentType")).toBeTruthy();
    }

    invalidIncident.type = "PRODUCT";

    try {
      validateIncident(invalidIncident);
    } catch (e) {
      expect(
        e.toString().includes("is not a valid IncidentCause")
      ).toBeTruthy();
    }

    invalidIncident.cause = "DELAY";

    try {
      validateIncident(invalidIncident);
    } catch (e) {
      expect(
        e.toString().includes("is not a valid IncidentResolution")
      ).toBeTruthy();
    }

    invalidIncident.resolution = ["REFUND"];

    try {
      validateIncident(invalidIncident);
    } catch (e) {
      expect(
        e
          .toString()
          .includes("is not a valid IncidentCause for IncidentType PRODUCT")
      ).toBeTruthy();
    }

    invalidIncident.cause = "SAND";

    try {
      validateIncident(invalidIncident);
    } catch (e) {
      expect(
        e
          .toString()
          .includes("Species was not specified for IncidentType PRODUCT")
      ).toBeTruthy();
    }

    invalidIncident.speciesId = "123456";

    try {
      validateIncident(invalidIncident);
    } catch (e) {
      expect(
        e
          .toString()
          .includes("Invalid value for RefundAmount for IncidentResolution")
      ).toBeTruthy();
    }

    invalidIncident.refundAmount = 123456;

    let throwError = false;
    try {
      validateIncident(validIncident);
    } catch (e) {
      throwError = true;
    }
    expect(throwError).toBeFalsy();
  });
});
