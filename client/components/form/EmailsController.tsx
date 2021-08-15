import { EmailsInput } from "../EmailsInput";
import { mailRegex } from "../../constants/regex";
import { Controller } from "react-hook-form";
import React from "react";

interface EmailsControllerProps {
  control: any;
  focusNext: (name: string) => void;
  emailsRef: any;
}

const EmailsController = ({
  control,
  focusNext,
  emailsRef,
}: EmailsControllerProps) => (
  <Controller
    defaultValue={[]}
    control={control}
    name="emails"
    render={({ field: { onChange, value } }) => (
      <EmailsInput
        focusNext={focusNext}
        selectRef={emailsRef}
        emails={value}
        onChange={(val) => {
          onChange(val.emails);
        }}
      ></EmailsInput>
    )}
    rules={{
      validate: (v: string[]) =>
        v && v.length !== 0 && !v.some((mail) => !mail.match(mailRegex)),
    }}
  />
);

export { EmailsController };
