import { incidentInterface } from "../../interfaces";
import { PaginationInput } from "@itt/common/src/models/pagination";

interface IncidentsInput {
  pagination: PaginationInput;
}

export const IncidentsResolver = (_: any, { pagination }: IncidentsInput) => {
  return incidentInterface.getIncidents(pagination.size, pagination.page);
};
