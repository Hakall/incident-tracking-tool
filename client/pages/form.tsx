import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CREATE_INCIDENT } from "../gql/Mutations";
import { EmailsInput } from "./components/EmailsInput";
import { RelayPointsSelect } from "./components/RelayPointsSelect";

// export interface IncidentToCreate {
//   emails: string[];
//   relayPointId?: string;
// }

function ITTForm() {
  const [createIncident, { data, loading, error }] =
    useMutation(CREATE_INCIDENT);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();
  const onSubmit = async () => {
    console.log("onSubmit");
    console.log("getValues()", getValues());
    setValue("relayPointId", null);
    setValue("emails", []);
    await createIncident({ variables: { emails: [] } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        defaultValue={[]}
        control={control}
        name="emails"
        render={({ field: { onChange, value } }) => (
          <EmailsInput
            emails={value}
            onChange={(val) => {
              onChange(val.emails);
            }}
          ></EmailsInput>
        )}
        rules={{
          validate: (v) => v && v.length !== 0,
        }}
      />
      <br />
      {errors.emails && <span>{JSON.stringify(errors.emails)}</span>}
      <br />
      <Controller
        control={control}
        defaultValue={null}
        name="relayPointId"
        render={({ field: { onChange, value } }) => (
          <RelayPointsSelect
            onChange={(val) => {
              onChange(val.value);
            }}
            value={value}
          />
        )}
        rules={{
          validate: (v) => {
            console.log("v", v);
            return true;
          },
        }}
      />
      <br />
      {errors.relayPointId && (
        <span>{JSON.stringify(errors.relayPointId)}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default ITTForm;
