import { incidentInterface } from "../../interfaces";

interface IncidentsInput {
  pagination: {
    size: number;
    page: number;
  };
}

export const IncidentsByDateAndProductResolver = (
  _: any,
  { pagination }: IncidentsInput
) => {
  return incidentInterface.getIncidentsByDateAndProduct(
    pagination.size,
    pagination.page
  );
};
