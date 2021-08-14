import React, { useState } from "react";
import Select, { ActionMeta, OptionsType, OptionTypeBase } from "react-select";
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

  const handleChange = (values: OptionsType<OptionTypeBase>) => {
    onChange(values.map(({ value }) => value));
    clearTimeout(timeOut);
  };

  const selectedValue = React.useMemo(() => {
    if (!resolution) {
      return [];
    }
    return resolution
      .map((_resolution) =>
        options.find((option) => option.value === _resolution)
      )
      .filter((_resolution) => _resolution);
  }, [options, resolution]);
  return (
    <Select
      isDisabled={isDisabled}
      ref={selectRef}
      options={options}
      onKeyDown={(e) => {
        switch (e.key) {
          case "Tab": {
            e.preventDefault();
          }
          case "Enter": {
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
      value={selectedValue}
    />
  );
};

export { IncidentResolutionSelect };
