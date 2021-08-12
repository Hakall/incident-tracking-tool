import { IncidentToCreate } from "@itt/common";
import { db } from "../loaders";

class IncidentInterface {
  async insertIncident(
    incidentToCreate: IncidentToCreate
  ): Promise<IncidentToCreate> {
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

const incidentInterface = new IncidentInterface();

export { IncidentInterface, incidentInterface };
