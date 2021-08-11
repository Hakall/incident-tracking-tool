import { db } from "../loaders";
import { IncidentToCreate } from "@itt/common";

class IncidentService {
  async createIncident(incidentToCreate: IncidentToCreate) {
    // todo change IncidentToCreate to Incident when validations are done
    return new Promise<IncidentToCreate>((resolve, reject) => {
      db.incidents.insert(
        [incidentToCreate],
        (err: Error | null, docs: IncidentToCreate[]) => {
          const [doc] = docs;
          if (err || !doc) {
            reject(err);
          }
          resolve(doc);
        }
      );
    });
  }
}

const incidentService = new IncidentService();

export { IncidentService, incidentService };
