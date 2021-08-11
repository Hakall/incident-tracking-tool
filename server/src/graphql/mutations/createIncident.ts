import { IncidentToCreate } from "@itt/common/src/models/incident";
import { incidentService } from "../../services";

export const CreateIncidentResolver = async (
  _: any,
  args: IncidentToCreate
) => {
  return incidentService.createIncident(args);
};
