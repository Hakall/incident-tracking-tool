import { Species } from "@itt/common";
import { db } from "../loaders";
import { species } from "../data";

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

  async getSpeciesById(_id: string): Promise<Species> {
    return new Promise<Species>((resolve, reject) => {
      db.species.find({ _id }, (err: Error, docs: Species[]) => {
        if (err) {
          reject(err);
        }
        if (!docs.length) {
          reject(`No species for _id ${_id}`);
        }
        const [doc] = docs;
        resolve(doc);
      });
    });
  }

  async insertSpeciesFromFileData(): Promise<Species[]> {
    return new Promise<Species[]>((resolve, reject) => {
      db.species.insert(species, (err, newDocs) => {
        if (err) {
          reject(err);
        }
        resolve(newDocs);
      });
    });
  }
}

const speciesInterface = new SpeciesInterface();

export { SpeciesInterface, speciesInterface };
