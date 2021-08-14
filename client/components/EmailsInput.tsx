import React, { useState } from "react";
import CreatableSelect from "react-select";
import { mailRegex } from "../constants/regex";

const components = {
  DropdownIndicator: null,
};

interface EmailsInputProps {
  focusNext: (date: string) => void;
  selectRef: any;
  onChange: (val: any) => void;
  emails: string[];
}

function EmailsInput({
  onChange,
  emails,
  selectRef,
  focusNext,
}: EmailsInputProps) {
  const [emailsState, setEmailsState] = useState<{
    inputValue?: string;
  }>({
    inputValue: "",
  });

  const values = React.useMemo(() => {
    return emails.map((mail) => ({ value: mail, label: mail }));
  }, [emails]);

  const handleChange = (value: any, actionMeta: any) => {
    onChange({
      emails: value.map((mail: { value: string }) => mail.value.trim()),
    });
    setEmailsState({ inputValue: "" });
  };

  const handleInputChange = (inputValue: string) => {
    setEmailsState({ inputValue: inputValue.trim() });
  };
  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case "Enter":
      case "Tab": {
        event.preventDefault();
        if (
          emailsState.inputValue &&
          emailsState.inputValue.trim() !== "" &&
          emailsState.inputValue.trim().match(mailRegex)
        ) {
          const value = [
            ...values,
            {
              label: emailsState.inputValue.trim(),
              value: emailsState.inputValue.trim(),
            },
          ];
          setEmailsState({
            inputValue: "",
          });
          onChange({ emails: value.map((mail) => mail.value.trim()) });
          return;
        }
        if (
          (!emailsState.inputValue && !emails.length) ||
          (emailsState.inputValue &&
            !emailsState.inputValue.trim().match(mailRegex))
        ) {
          return;
        }
        focusNext("date");
      }
    }
  };
  // todo add search / autocomplete with used emails
  return (
    <CreatableSelect
      ref={selectRef}
      components={components}
      inputValue={emailsState.inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      value={values}
    />
  );
}

export { EmailsInput };
