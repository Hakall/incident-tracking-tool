import { Incident } from "@itt/common";
import { db } from "../loaders";

class IncidentInterface {
  async insertIncident(incident: Incident): Promise<Incident> {
    return new Promise<Incident>((resolve, reject) => {
      db.incidents.insert([incident], (err: Error | null, docs: Incident[]) => {
        const [doc] = docs;
        if (err || !doc) {
          reject(err || "Unable to create Incident");
        }
        resolve(doc);
      });
    });
  }
}

const incidentInterface = new IncidentInterface();

export { IncidentInterface, incidentInterface };
