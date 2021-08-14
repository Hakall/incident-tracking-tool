import React, { useState } from "react";
import Select from "react-select";
import { IncidentResolution } from "@itt/common";

interface IncidentResolutionSelectProps {
  focusNext: () => void;
  selectRef: any;
  onChange: (val: any) => void;
  resolution: string[];
  isDisabled: boolean;
}

const options = Object.keys(IncidentResolution).map((key) => ({
  value: key,
  label: IncidentResolution[key as keyof typeof IncidentResolution],
}));

const IncidentResolutionSelect = ({
  onChange,
  selectRef,
  focusNext,
  resolution,
  isDisabled,
}: IncidentResolutionSelectProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value: string) => {
    console.log("inputValue.trim()", inputValue.trim());
    setInputValue(inputValue.trim());
  };

  const handleChange = (values: any, actionMeta: any) => {
    console.log("handleChange values", values);
    console.log("actionMeta", actionMeta);
    console.log("inputValue.trim()", inputValue.trim());
    onChange(values.map(({ value }) => value));
  };

  return (
    <Select
      isDisabled={isDisabled}
      ref={selectRef}
      options={options}
      onKeyDown={(e) => {
        switch (e.key) {
          case "Enter":
          case "Tab": {
            console.log("onKeyDown");
            console.log("e", e);
            console.log("inputValue", inputValue);
            console.log("resolution", resolution);
            // focusNext();
            //
            // e.preventDefault();
          }
        }
      }}
      onInputChange={handleInputChange}
      isMulti
      className="basic-single"
      classNamePrefix="select"
      onChange={handleChange}
      isSearchable={true}
    />
  );
};

export { IncidentResolutionSelect };
