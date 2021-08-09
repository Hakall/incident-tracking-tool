import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CREATE_INCIDENT } from "../gql/Mutations";
import { EmailsInput } from "./components/EmailsInput";

export interface IncidentToCreate {
  emails: string[];
}

function ITTForm() {
  const [incidentToCreate, setIncidentToCreate] = useState<IncidentToCreate>({
    emails: [],
  });
  const [createIncident, { data, loading, error }] =
    useMutation(CREATE_INCIDENT);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async () => {
    await createIncident({ variables: { ...incidentToCreate } });
    setIncidentToCreate({
      emails: [],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="emails"
        render={() => (
          <EmailsInput
            emails={incidentToCreate.emails}
            onChange={setIncidentToCreate}
          ></EmailsInput>
        )}
        rules={{
          validate: () =>
            incidentToCreate.emails && incidentToCreate.emails.length !== 0,
        }}
      />
      {errors.emails && <span>{JSON.stringify(errors.emails)}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default ITTForm;
