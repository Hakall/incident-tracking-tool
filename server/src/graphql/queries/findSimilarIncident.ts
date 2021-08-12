import { incidentInterface } from "../../interfaces";

interface Input {
  incident: {
    emails: string[];
    date: string;
  };
}

export const FindSimilarIncidentResolver = (_: any, { incident }: Input) => {
  return incidentInterface.findSimilarIncident(incident.emails, incident.date);
};
