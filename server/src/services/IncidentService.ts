import { Incident, IncidentToCreate } from "@itt/common";
import { validateIncident } from "@itt/common/src/validators";
import {
  incidentInterface,
  relayPointInterface,
  speciesInterface,
} from "../interfaces";

class IncidentService {
  async createIncident(incidentToCreate: IncidentToCreate) {
    validateIncident(incidentToCreate);
    const relayPoint = await relayPointInterface.getRelayPoint(
      incidentToCreate.relayPointId
    );

    const species = incidentToCreate.speciesId
      ? await speciesInterface.getSpeciesById(incidentToCreate.speciesId)
      : null;

    const incident: Incident = {
      ...incidentToCreate,
      date: new Date(incidentToCreate.date),
      relayPoint,
      ...(species && { species }),
    } as Incident;

    // todo change IncidentToCreate to Incident when validations are done
    return incidentInterface.insertIncident(incident);
  }
}

const incidentService = new IncidentService();

export { IncidentService, incidentService };
