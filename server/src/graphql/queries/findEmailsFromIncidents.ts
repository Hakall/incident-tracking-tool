import { incidentInterface } from "../../interfaces";

interface Input {
  email: string;
}

export const FindEmailsFromIncidentsResolver = (_: any, { email }: Input) => {
  return incidentInterface.findEmailsFromIncidents(email);
};
