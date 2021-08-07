import { db } from "../../loaders";
import { RelayPoint } from "../../models";

export const RelayPointsResolver = () => {
  return new Promise<RelayPoint[]>((resolve, reject) => {
    db.relayPoints.find({}, (err: Error, docs: RelayPoint[]) => {
      if (err) {
        reject(err);
      }
      resolve(docs);
    });
  });
};
