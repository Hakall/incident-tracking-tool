import {
  Incident,
  IncidentCause,
  IncidentResolution,
  IncidentType,
} from "@itt/common";

export const CreateIncidentResolver = () => {
  return new Promise<Incident>((resolve, reject) => {
    resolve({
      _id: "coucou",
      emails: ["coucou"],
      relayPoint: {
        name: "coucou",
        day: "coucoudi",
      },
      cause: IncidentCause.CLOSING,
      date: new Date(),
      type: IncidentType.CUSTOMER,
      resolution: IncidentResolution.REFUND,
    });
    // db.relayPoints.find({}, (err: Error, docs: RelayPoint[]) => {
    //     if (err) {
    //         reject(err);
    //     }
    //     resolve(docs);
    // });
  });
};
