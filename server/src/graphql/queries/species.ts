import { db } from "../../loaders";
import { Species } from "../../models";

export const SpeciesResolver = () => {
  return new Promise<Species[]>((resolve, reject) => {
    db.species.find({}, (err: Error, docs: Species[]) => {
      if (err) {
        reject(err);
      }
      resolve(docs);
    });
  });
};
