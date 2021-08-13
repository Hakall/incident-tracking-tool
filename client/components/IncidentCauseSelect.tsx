import React from "react";
import Select from "react-select";
import { IncidentCause } from "@itt/common";
import { causesByType } from "@itt/common/src/validators";

interface IncidentCauseSelectProps {
  onChange: (val: any) => void;
  value: string;
  type: string;
}

const IncidentCauseSelect = ({
  onChange,
  value,
  type,
}: IncidentCauseSelectProps) => {
  const options = React.useMemo(() => {
    return causesByType(type).map((key) => ({
      value: key,
      label: IncidentCause[key as keyof typeof IncidentCause],
    }));
  }, [type]);

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
