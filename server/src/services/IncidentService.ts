import { Incident, IncidentToCreate, IncidentType } from "@itt/common";
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

    const newIncident: Incident = {
      ...incidentToCreate,
      date: new Date(incidentToCreate.date),
      relayPoint,
      ...(species && { species }),
      _id: "",
    } as Incident;
    // todo change IncidentToCreate to Incident when validations are done
    return incidentInterface.insertIncident(incidentToCreate);
  }
}

const incidentService = new IncidentService();

export { IncidentService, incidentService };
