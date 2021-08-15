import { Controller } from "react-hook-form";
import React from "react";
import { SpeciesSelect } from "../SpeciesSelect";

interface SpeciesControllerProps {
  control: any;
  focusNext: (name: string) => void;
  speciesRef: any;
  type: string;
}

const SpeciesController = ({
  control,
  focusNext,
  speciesRef,
  type,
}: SpeciesControllerProps) => (
  <Controller
    control={control}
    defaultValue={null}
    name="speciesId"
    render={({ field: { onChange, value } }) => (
      <SpeciesSelect
        isDisabled={!type}
        selectRef={speciesRef}
        onChange={(val) => {
          onChange(val.value);
          setTimeout(() => focusNext("cause"), 100);
        }}
        value={value}
      />
    )}
    rules={{
      validate: (v) =>
        (v === null && type !== "PRODUCT") ||
        (type === "PRODUCT" && typeof v === "string" && v.trim() !== ""),
    }}
  />
);

export { SpeciesController };
