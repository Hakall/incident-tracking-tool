import {
  incidentInterface,
  relayPointInterface,
  speciesInterface,
} from "../interfaces";
const insertData = async () => {
  const relayPoints = await relayPointInterface.getRelayPoints();
  if (!relayPoints || !relayPoints.length) {
    await relayPointInterface.insertRelayPointsFromFileData();
  }

  const species = await speciesInterface.getSpecies();
  if (!species || !species.length) {
    await speciesInterface.insertSpeciesFromFileData();
  }

  const incidents = await incidentInterface.getIncidents();
  if (!incidents || !incidents.length) {
    await incidentInterface.insertIncidentsFromFileData();
  }
};

export { insertData };
