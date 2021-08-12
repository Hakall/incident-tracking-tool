import { Incident, Species } from "@itt/common";
import { db } from "../loaders";
import { incidents } from "../data/incidents";
import { relayPointInterface } from "./RelayPointInterface";

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

  async getIncidents(size: number, page: number): Promise<Incident[]> {
    return new Promise<Incident[]>((resolve, reject) => {
      db.incidents
        .find({})
        .sort({ date: 1 })
        .skip((page - 1) * size)
        .limit(size)
        .exec((err: Error | null, docs: Incident[]) => {
          if (err) {
            reject(err);
          }
          resolve(docs);
        });
    });
  }

  async insertIncidentsFromFileData(): Promise<Incident[]> {
    const relayPoints = await relayPointInterface.getRelayPoints();
    return new Promise<Incident[]>((resolve, reject) => {
      db.incidents.insert(
        incidents(100, relayPoints),
        (err: Error | null, newDocs: Incident[]) => {
          if (err) {
            reject(err);
          }
          resolve(newDocs);
        }
      );
    });
  }
}

const incidentInterface = new IncidentInterface();

export { IncidentInterface, incidentInterface };
