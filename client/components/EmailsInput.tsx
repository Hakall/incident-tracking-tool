import React, { useState } from "react";
import CreatableSelect from "react-select";
import { mailRegex } from "../constants/regex";
import { useQuery } from "@apollo/client";
import { FIND_EMAILS_FROM_INCIDENTS } from "../gql/Queries";

const components = {
  DropdownIndicator: null,
};

interface EmailsInputProps {
  focusNext: (date: string) => void;
  selectRef: any;
  onChange: (val: any) => void;
  emails: string[];
}

interface EmailsFromIncidentsData {
  findEmailsFromIncidents: string[];
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

  const { data, loading } = useQuery<EmailsFromIncidentsData>(
    FIND_EMAILS_FROM_INCIDENTS,
    {
      variables: { email: emailsState.inputValue },
      skip: !emailsState.inputValue || emailsState.inputValue.trim().length < 1,
    }
  );

  const options = React.useMemo(() => {
    return data
      ? data.findEmailsFromIncidents.map((mail) => ({
          value: mail,
          label: mail,
        }))
      : [];
  }, [data]);

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
      case "Tab": {
        event.preventDefault();
      }
      case "Enter": {
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

  return (
    <CreatableSelect
      ref={selectRef}
      components={components}
      inputValue={emailsState.inputValue}
      isClearable
      isMulti
      menuIsOpen={options.length > 0}
      isLoading={loading}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      options={options}
      value={values}
    />
  );
}

export { EmailsInput };
