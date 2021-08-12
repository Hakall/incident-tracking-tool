import { IncidentToCreate } from "@itt/common";
import { validateIncident } from "@itt/common/src/validators";
import { incidentInterface } from "../interfaces";

class IncidentService {
  async createIncident(incidentToCreate: IncidentToCreate) {
    validateIncident(incidentToCreate);
    // todo change IncidentToCreate to Incident when validations are done
    return incidentInterface.insertIncident(incidentToCreate);
  }
}

const incidentService = new IncidentService();

export { IncidentService, incidentService };
