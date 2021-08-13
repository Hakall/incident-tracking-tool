import { shallow } from "enzyme";
import React from "react";
import { IncidentsList } from "../components/IncidentsList";
import { IncidentCause, IncidentResolution, IncidentType } from "@itt/common";

const incident = {
  date: "2021-09-09",
  type: "PRODUCT" as IncidentType,
  cause: "SAND" as IncidentCause,
  species: { _id: "123456", name: "Fake fish" },
  relayPoint: {
    _id: "123456",
    name: "Fake relay point",
    day: "dimanche",
  },
  resolution: ["REFUND" as IncidentResolution],
  emails: [],
  refundAmount: 100,
};

describe("IncidentsList component", () => {
  it("should render correctly one line, with correct enum label", () => {
    const list = shallow(<IncidentsList incidents={[incident]} />);
    const line = list.find("tbody").children("tr");
    expect(line).toHaveLength(1);
    expect(line.html().includes(IncidentType.PRODUCT)).toBeTruthy();
    expect(line.html().includes(IncidentCause.SAND)).toBeTruthy();
    expect(line.html().includes(IncidentResolution.REFUND)).toBeTruthy();
  });

  it("should render correctly 3 lines", () => {
    const list = shallow(
      <IncidentsList incidents={[incident, incident, incident]} />
    );
    const line = list.find("tbody").children("tr");
    expect(line).toHaveLength(3);
  });

  it("should render no line", () => {
    const list = shallow(<IncidentsList incidents={[]} />);
    const line = list.find("tbody").children("tr");
    expect(line).toHaveLength(0);
  });
});

export {};
