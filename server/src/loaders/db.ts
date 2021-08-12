import DataStore from "nedb";

const db = {
  relayPoints: new DataStore({
    filename: __dirname.replace("loaders", "data/relayPoints.db"),
    autoload: true,
  }),
  species: new DataStore({
    filename: __dirname.replace("loaders", "data/species.db"),
    autoload: true,
  }),
  incidents: new DataStore({
    filename: __dirname.replace("loaders", "data/incidents.db"),
    autoload: true,
  }),
};

export { db };
