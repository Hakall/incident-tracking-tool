import { Incident, RelayPoint } from "@itt/common";

const emails = [
  "luke.skywalker@rebels.org",
  "leia.skywalker@rebels.org",
  "anakin.skywalker@empire.com",
  "han.solo@rebels.org",
  "ben.solo@newempire.com",
  "jarjar.binks@wtf.lol",
  "dark.sidius@sith.us",
  "yoda@jedi.io",
];

const dates = [
  "2021-08-12",
  "2021-08-11",
  "2021-08-10",
  "2021-08-09",
  "2021-08-08",
  "2021-08-07",
];

const incidentsPrototypes = [
  { type: "DELIVERY", cause: "DELAY", resolution: "PHONE_CALL" },
  { type: "DELIVERY", cause: "UNDELIVERED", resolution: "REFUND" },
  { type: "RELAY_POINT", cause: "WRONG_ADDRESS", resolution: "PARTIAL_REFUND" },
  { type: "CUSTOMER", cause: "DISSATISFACTION", resolution: "PARTIAL_REFUND" },
];

const getRandomMails = (): string[] => {
  const numberOfMail = Math.floor(Math.random() * 3) + 1;
  const mails: string[] = [];
  for (let i = 0; i < numberOfMail; i++) {
    const mailIndex = Math.floor(Math.random() * emails.length);
    if (!mails.find((mail) => mail === emails[mailIndex])) {
      mails.push(emails[mailIndex]);
    }
  }
  return mails.sort();
};

export const incidents = (
  numberOfIncidents: number,
  relayPoints: RelayPoint[]
): Incident[] => {
  const incidents: Incident[] = [];
  for (let i = 0; i < numberOfIncidents; i++) {
    const mails = getRandomMails();
    const incidentPrototypeIndex = Math.floor(
      Math.random() * incidentsPrototypes.length
    );
    const dateIndex = Math.floor(Math.random() * dates.length);
    const relayPointIndex = Math.floor(Math.random() * relayPoints.length);
    incidents.push({
      emails: mails,
      date: dates[dateIndex],
      ...incidentsPrototypes[incidentPrototypeIndex],
      relayPoint: relayPoints[relayPointIndex],
      ...((incidentsPrototypes[incidentPrototypeIndex].resolution ===
        "PARTIAL_REFUND" ||
        incidentsPrototypes[incidentPrototypeIndex].resolution ===
          "REFUND") && {
        refundAmount: Math.floor(Math.random() * 1000),
      }),
    } as Incident);
  }
  return incidents;
};
