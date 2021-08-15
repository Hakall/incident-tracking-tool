import { Controller } from "react-hook-form";
import React from "react";
import { IncidentResolutionSelect } from "../IncidentResolutionSelect";

interface IncidentResolutionControllerProps {
  control: any;
  focusNext: (name: string) => void;
  resolutionRef: any;
  cause: string;
  isRefundMandatory: boolean;
  trigger: (name: string) => void;
}

const IncidentResolutionController = ({
  control,
  focusNext,
  isRefundMandatory,
  resolutionRef,
  cause,
  trigger,
}: IncidentResolutionControllerProps) => (
  <Controller
    control={control}
    defaultValue={null}
    name="resolution"
    render={({ field: { onChange, value } }) => (
      <IncidentResolutionSelect
        isDisabled={!cause}
        isRefundMandatory={isRefundMandatory}
        focusNext={focusNext}
        selectRef={resolutionRef}
        onChange={(...args) => {
          if (args.length) {
            onChange(args[0]);
          } else {
            onChange([]);
          }
          trigger("refundAmount");
        }}
        resolution={value}
      />
    )}
    rules={{
      validate: (v) => v && v.length !== 0,
    }}
  />
);

export { IncidentResolutionController };
