import React from "react";
import { IncidentToCreate } from "../form";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import { GET_RELAY_POINTS } from "../../gql/Queries";
import { RelayPoint } from "@itt/common";

interface RelayPointsSelectProps {
  onChange: (val: any) => void;
  value: string;
}

interface RelayPointsData {
  relayPoints: RelayPoint[];
}

const RelayPointsSelect = ({ onChange, value }: RelayPointsSelectProps) => {
  const { data, loading, error } = useQuery<RelayPointsData>(GET_RELAY_POINTS);

  const options = React.useMemo(() => {
    return data
      ? data.relayPoints.map((relayPoint) => ({
          value: relayPoint._id,
          label: `${relayPoint.name}, ${relayPoint.day}`,
        }))
      : [];
  }, [data]);

  const selectedValue = React.useMemo(() => {
    const optionValue = options.find((option) => option.value === value);
    return optionValue ? optionValue : { value: "", label: "" };
  }, [options, value]);

  return (
    <Select
      options={options}
      className="basic-single"
      classNamePrefix="select"
      isLoading={loading}
      // isClearable={isClearable}
      onChange={onChange}
      isSearchable={true}
      value={selectedValue}
    />
  );
};

export { RelayPointsSelect };
