import { relayPointInterface, speciesInterface } from "../interfaces";

const insertData = async () => {
  const relayPoints = await relayPointInterface.getRelayPoints();
  if (!relayPoints || !relayPoints.length) {
    await relayPointInterface.insertRelayPointsFromFileData();
  }

  const species = await speciesInterface.getSpecies();
  if (!species || !species.length) {
    await speciesInterface.insertSpeciesFromFileData();
  }

  //  todo add incidents for charts
};

export { insertData };
