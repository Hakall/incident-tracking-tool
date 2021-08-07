import DataStore from "nedb";

const db = {
  relayPoints: new DataStore(),
  species: new DataStore(),
};

export { db };
