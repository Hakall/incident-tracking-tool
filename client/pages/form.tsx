import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CREATE_INCIDENT } from "../gql/Mutations";
import { EmailsInput } from "./components/EmailsInput";
import { RelayPointsSelect } from "./components/RelayPointsSelect";
import { IncidentTypeSelect } from "./components/IncidentTypeSelect";
import { IncidentCauseSelect } from "./components/IncidentCauseSelect";
import { IncidentResolutionSelect } from "./components/IncidentResolutionSelect";
import { SpeciesSelect } from "./components/SpeciesSelect";

// export interface IncidentToCreate {
//   emails: string[];
//   relayPointId?: string;
// }

const mailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

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
          validate: (v: string[]) =>
            v && v.length !== 0 && !v.some((mail) => !mail.match(mailRegex)),
        }}
      />
      <br />
      {errors.emails && <span>{JSON.stringify(errors.emails)}</span>}
      <br />
      <input type="date" {...(register("date"), { required: true })} />
      <br />
      {errors.date && <span>{JSON.stringify(errors.date)}</span>}
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
          validate: (v) =>
            v !== null && typeof v === "string" && v.trim() !== "",
        }}
      />
      <br />
      {errors.relayPointId && (
        <span>{JSON.stringify(errors.relayPointId)}</span>
      )}
      <br />
      <Controller
        control={control}
        defaultValue={null}
        name="incidentType"
        render={({ field: { onChange, value } }) => (
          <IncidentTypeSelect
            onChange={(val) => {
              onChange(val.value);
            }}
            value={value}
          />
        )}
        rules={{
          validate: (v) =>
            v !== null && typeof v === "string" && v.trim() !== "",
        }}
      />
      <br />
      {errors.incidentType && (
        <span>{JSON.stringify(errors.incidentType)}</span>
      )}
      <Controller
        control={control}
        defaultValue={null}
        name="incidentCause"
        render={({ field: { onChange, value } }) => (
          <IncidentCauseSelect
            onChange={(val) => {
              onChange(val.value);
            }}
            value={value}
          />
        )}
        rules={{
          validate: (v) =>
            v !== null && typeof v === "string" && v.trim() !== "",
        }}
      />
      <br />
      {errors.incidentCause && (
        <span>{JSON.stringify(errors.incidentCause)}</span>
      )}
      <Controller
        control={control}
        defaultValue={null}
        name="incidentResolution"
        render={({ field: { onChange, value } }) => (
          <IncidentResolutionSelect
            onChange={(val) => {
              onChange(val.value);
            }}
            value={value}
          />
        )}
        rules={{
          validate: (v) =>
            v !== null && typeof v === "string" && v.trim() !== "",
        }}
      />
      <br />
      {errors.incidentResolution && (
        <span>{JSON.stringify(errors.incidentResolution)}</span>
      )}
      <Controller
        control={control}
        defaultValue={null}
        name="speciesId"
        render={({ field: { onChange, value } }) => (
          <SpeciesSelect
            onChange={(val) => {
              onChange(val.value);
            }}
            value={value}
          />
        )}
        rules={{
          validate: (v) =>
            v !== null && typeof v === "string" && v.trim() !== "",
        }}
      />
      <br />
      {errors.speciesId && <span>{JSON.stringify(errors.speciesId)}</span>}
      <br />
      <input type="number" {...register("refundAmount")} step="0.01" min="0" />
      <br />
      {errors.refundAmount && (
        <span>{JSON.stringify(errors.refundAmount)}</span>
      )}
      <textarea {...register("comment")}></textarea>
      <br />
      {errors.comment && <span>{JSON.stringify(errors.comment)}</span>}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ITTForm;
