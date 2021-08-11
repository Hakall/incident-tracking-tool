import React from "react";
import Select from "react-select";
import { IncidentType } from "@itt/common";

interface IncidentTypeSelectProps {
  onChange: (val: any) => void;
  value: string;
}

const options = Object.keys(IncidentType).map((key) => ({
  value: key,
  label: IncidentType[key as keyof typeof IncidentType],
}));

const IncidentTypeSelect = ({ onChange, value }: IncidentTypeSelectProps) => {
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

export { IncidentTypeSelect };
