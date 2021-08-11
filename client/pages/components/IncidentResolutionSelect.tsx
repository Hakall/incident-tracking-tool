import React from "react";
import Select from "react-select";
import { IncidentResolution } from "@itt/common";

interface IncidentResolutionSelectProps {
  onChange: (val: any) => void;
  value: string;
}

const IncidentResolutionSelect = ({
  onChange,
  value,
}: IncidentResolutionSelectProps) => {
  const options = Object.values(IncidentResolution).map((type) => ({
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

export { IncidentResolutionSelect };
