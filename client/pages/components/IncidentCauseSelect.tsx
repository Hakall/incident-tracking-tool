import React from "react";
import Select from "react-select";
import { IncidentCause } from "@itt/common";

interface IncidentCauseSelectProps {
  onChange: (val: any) => void;
  value: string;
}

const options = Object.keys(IncidentCause).map((key) => ({
  value: key,
  label: IncidentCause[key as keyof typeof IncidentCause],
}));

const IncidentCauseSelect = ({ onChange, value }: IncidentCauseSelectProps) => {
  const selectedValue = React.useMemo(() => {
    const optionValue = options.find((option) => option.value === value);
    return optionValue ? optionValue : { value: "", label: "" };
  }, [options, value]);

  return (
    <Select
      options={options}
      className="basic-single"
      classNamePrefix="select"
      // isClearable={isClearable}
      onChange={onChange}
      isSearchable={true}
      value={selectedValue}
    />
  );
};

export { IncidentCauseSelect };
