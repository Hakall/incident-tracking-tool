import React from "react";
import Select from "react-select";
import { IncidentType } from "@itt/common";

interface IncidentTypeSelectProps {
  onChange: (val: any) => void;
  value: string;
}

const IncidentTypeSelect = ({ onChange, value }: IncidentTypeSelectProps) => {
  const options = Object.values(IncidentType).map((type) => ({
    value: type,
    label: type,
  }));

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
