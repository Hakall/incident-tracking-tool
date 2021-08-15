import { Controller } from "react-hook-form";
import React from "react";
import { IncidentCauseSelect } from "../IncidentCauseSelect";

interface IncidentCauseControllerProps {
  control: any;
  focusNext: (name: string) => void;
  causeRef: any;
  type: string;
}

const IncidentCauseController = ({
  control,
  focusNext,
  causeRef,
  type,
}: IncidentCauseControllerProps) => (
  <Controller
    control={control}
    defaultValue={null}
    name="cause"
    render={({ field: { onChange, value } }) => (
      <IncidentCauseSelect
        isDisabled={!type}
        selectRef={causeRef}
        onChange={(val) => {
          onChange(val.value);
          setTimeout(() => focusNext("resolution"), 100);
        }}
        value={value}
        type={type}
      />
    )}
    rules={{
      validate: (v) => v !== null && typeof v === "string" && v.trim() !== "",
    }}
  />
);

export { IncidentCauseController };
