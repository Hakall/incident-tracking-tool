import { db } from "../../loaders";
import { RelayPoint } from "@itt/common";

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
