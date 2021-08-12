import React, { useState } from "react";
import CreatableSelect from "react-select";

const components = {
  DropdownIndicator: null,
};

interface EmailsInputProps {
  onChange: (val: any) => void;
  emails: string[];
}

function EmailsInput({ onChange, emails }: EmailsInputProps) {
  const [emailsState, setEmailsState] = useState<{
    inputValue?: string;
  }>({
    inputValue: "",
  });

  const values = React.useMemo(() => {
    return emails.map((mail) => ({ value: mail, label: mail }));
  }, [emails]);

  const handleChange = (value: any, actionMeta: any) => {
    console.group("Value Changed");
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    // todo check mail on change ?
    console.groupEnd();
    onChange({ emails: value.map((mail) => mail.value) });
    setEmailsState({ inputValue: "" });
  };

  const handleInputChange = (inputValue: string) => {
    console.group("Input Changed");
    console.log(inputValue);
    console.groupEnd();
    setEmailsState({ inputValue });
  };
  const handleKeyDown = (event: any) => {
    if (!emailsState.inputValue || emailsState.inputValue.trim() === "") return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        console.group("Value Added");
        const value = [
          ...values,
          { label: emailsState.inputValue, value: emailsState.inputValue },
        ];
        console.log(value);
        console.groupEnd();
        setEmailsState({
          inputValue: "",
        });
        onChange({ emails: value.map((mail) => mail.value) });
        event.preventDefault();
    }
  };
  // todo add search / autocomplete with used emails
  return (
    <CreatableSelect
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
