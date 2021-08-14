import React, { useState } from "react";
import Select, { OptionsType } from "react-select";
import { IncidentResolution } from "@itt/common";

interface IncidentResolutionSelectProps {
  focusNext: (name: string) => void;
  selectRef: any;
  onChange: (val: any) => void;
  resolution: string[];
  isDisabled: boolean;
  isRefundMandatory: boolean;
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
  isRefundMandatory,
}: IncidentResolutionSelectProps) => {
  const [inputValue, setInputValue] = useState("");

  let timeOut: any;

  const handleInputChange = (value: string) => {
    setInputValue(value.trim());
  };

  const handleChange = (
    values: OptionsType<{ value: string; label: IncidentResolution }>
  ) => {
    onChange(values.map(({ value }) => value));
    clearTimeout(timeOut);
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
            if (!inputValue || inputValue.trim() === "") {
              timeOut = setTimeout(() => {
                focusNext(isRefundMandatory ? "refundAmount" : "comment");
              }, 100);
            }
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
