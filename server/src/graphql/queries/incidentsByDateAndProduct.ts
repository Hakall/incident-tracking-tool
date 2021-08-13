import { incidentInterface } from "../../interfaces";
import { PaginationInput } from "@itt/common/src/models/pagination";

interface IncidentsInput {
  pagination: PaginationInput;
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
