import { Species } from "@itt/common";
import { db } from "../loaders";

class SpeciesInterface {
  async getSpecies(): Promise<Species[]> {
    return new Promise<Species[]>((resolve, reject) => {
      db.species.find({}, (err: Error, docs: Species[]) => {
        if (err) {
          reject(err);
        }
        resolve(docs);
      });
    });
  }
}

const speciesInterface = new SpeciesInterface();

export { SpeciesInterface, speciesInterface };
