import { Controller } from "react-hook-form";
import React from "react";
import { RelayPointsSelect } from "../RelayPointsSelect";

interface RelayPointsControllerProps {
  control: any;
  focusNext: (name: string) => void;
  relayPointRef: any;
  date: string;
}

const RelayPointsController = ({
  control,
  focusNext,
  relayPointRef,
  date,
}: RelayPointsControllerProps) => (
  <Controller
    control={control}
    defaultValue={null}
    name="relayPointId"
    render={({ field: { onChange, value } }) => (
      <RelayPointsSelect
        isDisabled={!date}
        selectRef={relayPointRef}
        onChange={(val) => {
          setTimeout(() => focusNext("type"), 100);
          onChange(val.value);
        }}
        value={value}
      />
    )}
    rules={{
      validate: (v) => v !== null && typeof v === "string" && v.trim() !== "",
    }}
  />
);

export { RelayPointsController };
