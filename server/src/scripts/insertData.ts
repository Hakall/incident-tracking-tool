import { db } from "../loaders";
import { relayPoints, species } from "../data";
import { RelayPoint, Species } from "@itt/common";

const insertData = async () => {
  await new Promise<RelayPoint[]>((resolve, reject) => {
    db.relayPoints.insert(relayPoints, (err, newDocs) => {
      if (err) {
        reject(err);
      }
      resolve(newDocs);
    });
  });

  await new Promise<Species[]>((resolve, reject) => {
    db.species.insert(species, (err, newDocs) => {
      if (err) {
        reject(err);
      }
      resolve(newDocs);
    });
  });
};

export { insertData };
