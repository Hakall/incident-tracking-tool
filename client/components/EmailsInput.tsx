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
    // todo check mail on change ?
    onChange({
      emails: value.map((mail: { value: string }) => mail.value.trim()),
    });
    setEmailsState({ inputValue: "" });
  };

  const handleInputChange = (inputValue: string) => {
    setEmailsState({ inputValue: inputValue.trim() });
  };
  const handleKeyDown = (event: any) => {
    if (!emailsState.inputValue || emailsState.inputValue.trim() === "") return;
    switch (event.key) {
      case "Enter":
      case "Tab":
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
