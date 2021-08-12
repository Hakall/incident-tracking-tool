import { RelayPoint } from "@itt/common";
import { db } from "../loaders";
import { relayPoints } from "../data";

class RelayPointInterface {
  async getRelayPoints(): Promise<RelayPoint[]> {
    return new Promise<RelayPoint[]>((resolve, reject) => {
      db.relayPoints.find({}, (err: Error, docs: RelayPoint[]) => {
        if (err) {
          reject(err);
        }
        resolve(docs);
      });
    });
  }

  async getRelayPoint(_id: string): Promise<RelayPoint> {
    return new Promise<RelayPoint>((resolve, reject) => {
      db.relayPoints.find({ _id }, (err: Error, docs: RelayPoint[]) => {
        if (err) {
          reject(err);
        }
        if (!docs.length) {
          reject(`No relayPoint for _id ${_id}`);
        }
        const [doc] = docs;
        resolve(doc);
      });
    });
  }

  async insertRelayPointsFromFileData(): Promise<RelayPoint[]> {
    return new Promise<RelayPoint[]>((resolve, reject) => {
      db.relayPoints.insert(relayPoints, (err, newDocs) => {
        if (err) {
          reject(err);
        }
        resolve(newDocs);
      });
    });
  }
}

const relayPointInterface = new RelayPointInterface();

export { RelayPointInterface, relayPointInterface };
