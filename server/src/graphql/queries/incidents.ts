import { incidentInterface } from "../../interfaces";

interface IncidentsInput {
  pagination: {
    size: number;
    page: number;
  };
}

export const IncidentsResolver = (_: any, { pagination }: IncidentsInput) => {
  return incidentInterface.getIncidents(pagination.size, pagination.page);
};
