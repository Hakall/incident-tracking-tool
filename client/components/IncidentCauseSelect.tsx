import React from "react";
import Select from "react-select";
import { IncidentCause } from "@itt/common";
import { causesByType } from "@itt/common/src/validators";

interface IncidentCauseSelectProps {
  selectRef: any;
  onChange: (val: any) => void;
  value: string;
  type: string;
  isDisabled: boolean;
}

const IncidentCauseSelect = ({
  onChange,
  value,
  type,
  selectRef,
  isDisabled,
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
      isDisabled={isDisabled}
      ref={selectRef}
      options={options}
      className="basic-single"
      classNamePrefix="select"
      onKeyDown={(e) => {
        switch (e.key) {
          case "Tab": {
            if (!selectedValue.value || selectedValue.value.trim() === "") {
              e.preventDefault();
            }
          }
        }
      }}
      onChange={onChange}
      isSearchable={true}
      value={selectedValue}
    />
  );
};

export { IncidentCauseSelect };
