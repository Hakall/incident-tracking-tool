import { RelayPoint } from "@itt/common";
import { db } from "../loaders";

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
}

const relayPointInterface = new RelayPointInterface();

export { RelayPointInterface, relayPointInterface };
