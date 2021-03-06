import { Incident } from "@itt/common";
import groupBy from "lodash/groupBy";
import uniq from "lodash/uniq";
import { db } from "../loaders";
import { incidents } from "../data/incidents";
import { relayPointInterface } from "./RelayPointInterface";
import { speciesInterface } from "./SpeciesInterface";

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

  async getIncidents(
    size: number,
    page: number
  ): Promise<{ incidents: Incident[]; pagination: any }> {
    const counter = await new Promise<number>((resolve, reject) => {
      db.incidents.count({}, (err: Error | null, count) => {
        if (err) {
          reject(err);
        }
        resolve(count);
      });
    });
    const incidents = await new Promise<Incident[]>((resolve, reject) => {
      db.incidents
        .find({})
        .sort({ date: 1, emails: 1 })
        .skip((page - 1) * size)
        .limit(size)
        .exec((err: Error | null, docs: Incident[]) => {
          if (err) {
            reject(err);
          }
          resolve(docs);
        });
    });

    return {
      incidents,
      pagination: {
        total: counter,
        page,
        size,
      },
    };
  }

  async getIncidentsByDateAndProduct(
    size: number,
    page: number
  ): Promise<{ incidents: Incident[][]; pagination: any }> {
    const incidents = await new Promise<Incident[]>((resolve, reject) => {
      db.incidents
        .find({
          type: "PRODUCT",
          refundAmount: { $exists: true },
          species: { $exists: true },
        })
        .sort({ date: 1, "species.name": 1 })
        .exec((err: Error | null, docs: Incident[]) => {
          if (err) {
            reject(err);
          }
          resolve(docs);
        });
    });

    const grouped = groupBy(
      incidents,
      (elem: Incident) => `${elem.species!._id}${elem.date}`
    );

    return {
      pagination: { total: Object.keys(grouped).length, page, size },
      incidents: Object.keys(grouped)
        .map((key) => grouped[key])
        .slice((page - 1) * size, page * size),
    };
  }

  async insertIncidentsFromFileData(): Promise<Incident[]> {
    const relayPoints = await relayPointInterface.getRelayPoints();
    const species = await speciesInterface.getSpecies(10);
    return new Promise<Incident[]>((resolve, reject) => {
      db.incidents.insert(
        incidents(800, relayPoints, species),
        (err: Error | null, newDocs: Incident[]) => {
          if (err) {
            reject(err);
          }
          resolve(newDocs);
        }
      );
    });
  }

  async findSimilarIncident(
    emails: string[],
    date: string
  ): Promise<Incident[]> {
    return new Promise<Incident[]>((resolve, reject) => {
      db.incidents
        .find({ emails, date })
        .sort({ date: -1 })
        .exec((err: Error | null, newDocs: Incident[]) => {
          if (err) {
            reject(err);
          }
          resolve(newDocs);
        });
    });
  }

  async findEmailsFromIncidents(email: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      db.incidents.find(
        {
          $where: function () {
            return (
              this.emails.filter((mail: string) => mail.startsWith(email))
                .length > 0
            );
          },
        },
        (err: Error | null, newDocs: Incident[]) => {
          if (err) {
            reject(err);
          }

          resolve(
            uniq(
              newDocs.flatMap((incident) => {
                return incident.emails.filter((mail: string) =>
                  mail.startsWith(email)
                );
              })
            )
          );
        }
      );
    });
  }
}

const incidentInterface = new IncidentInterface();

export { IncidentInterface, incidentInterface };
