import React from "react";
import Select from "react-select";
import { IncidentResolution } from "@itt/common";

interface IncidentResolutionSelectProps {
  focusNext: () => void;
  selectRef: any;
  onChange: (val: any) => void;
}

const options = Object.keys(IncidentResolution).map((key) => ({
  value: key,
  label: IncidentResolution[key as keyof typeof IncidentResolution],
}));

const IncidentResolutionSelect = ({
  onChange,
  selectRef,
  focusNext,
}: IncidentResolutionSelectProps) => {
  return (
    <Select
      ref={selectRef}
      options={options}
      isMulti
      className="basic-single"
      classNamePrefix="select"
      // isClearable={isClearable}
      onChange={onChange}
      isSearchable={true}
    />
  );
};

export { IncidentResolutionSelect };
