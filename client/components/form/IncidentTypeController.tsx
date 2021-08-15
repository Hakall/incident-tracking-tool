import { Controller } from "react-hook-form";
import React from "react";
import { IncidentTypeSelect } from "../IncidentTypeSelect";

interface IncidentTypeControllerProps {
  control: any;
  focusNext: (name: string) => void;
  typeRef: any;
  relayPointId: string;
  setValue: (name: string, value: any) => void;
}

const IncidentTypeController = ({
  control,
  focusNext,
  typeRef,
  relayPointId,
  setValue,
}: IncidentTypeControllerProps) => (
  <Controller
    control={control}
    defaultValue={null}
    name="type"
    render={({ field: { onChange, value } }) => (
      <IncidentTypeSelect
        isDisabled={!relayPointId}
        selectRef={typeRef}
        onChange={(val) => {
          onChange(val.value);
          setValue("cause", null);
          if (val.value === "PRODUCT") {
            setTimeout(() => focusNext("species"), 100);
          } else {
            setTimeout(() => focusNext("cause"), 100);
          }
        }}
        value={value}
      />
    )}
    rules={{
      validate: (v) => v !== null && typeof v === "string" && v.trim() !== "",
    }}
  />
);

export { IncidentTypeController };
