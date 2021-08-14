import React from "react";
import Select from "react-select";
import { IncidentType } from "@itt/common";

interface IncidentTypeSelectProps {
  selectRef: any;
  onChange: (val: any) => void;
  value: string;
  isDisabled: boolean;
}

const options = Object.keys(IncidentType).map((key) => ({
  value: key,
  label: IncidentType[key as keyof typeof IncidentType],
}));

const IncidentTypeSelect = ({
  onChange,
  value,
  selectRef,
  isDisabled,
}: IncidentTypeSelectProps) => {
  const selectedValue = React.useMemo(() => {
    const optionValue = options.find((option) => option.value === value);
    return optionValue ? optionValue : { value: "", label: "" };
  }, [value]);

  return (
    <Select
      isDisabled={isDisabled}
      ref={selectRef}
      options={options}
      onKeyDown={(e) => {
        switch (e.key) {
          case "Tab": {
            if (!selectedValue.value || selectedValue.value.trim() === "") {
              e.preventDefault();
            }
          }
        }
      }}
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
