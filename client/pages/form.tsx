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
    // setValue("relayPointId", null);
    // setValue("emails", []);
    const incidentToCreate = getValues();

    try {
      await createIncident({
        variables: {
          emails: incidentToCreate.emails,
          date: incidentToCreate.date,
          relayPointId: incidentToCreate.relayPointId,
          type: incidentToCreate.type,
          cause: incidentToCreate.cause,
          resolution: incidentToCreate.resolution,
          ...(incidentToCreate.refundAmount &&
            incidentToCreate.refundAmount !== "" && {
              refundAmount: Number(incidentToCreate.refundAmount),
            }),
          ...(incidentToCreate.speciesId &&
            incidentToCreate.speciesId !== "" && {
              speciesId: incidentToCreate.speciesId,
            }),
          ...(incidentToCreate.comment &&
            incidentToCreate.comment !== "" && {
              comment: incidentToCreate.comment,
            }),
        },
      });
    } catch (e) {}
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
      {/* todo default date this day, maybe from previous incident for same mail*/}
      <input
        type="date"
        {...register("date", {
          validate: (v) => (v ? !Number.isNaN(new Date(v).getTime()) : true),
        })}
        required
      />
      <br />
      {errors.date && <span>{`${errors.date}`}</span>}
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
        name="type"
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
      {errors.type && <span>{JSON.stringify(errors.type)}</span>}
      <Controller
        control={control}
        defaultValue={null}
        name="cause"
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
      {errors.cause && <span>{JSON.stringify(errors.cause)}</span>}
      <Controller
        control={control}
        defaultValue={null}
        name="resolution"
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
      {/* todo resolution shuld be a list*/}
      {errors.resolution && <span>{JSON.stringify(errors.resolution)}</span>}
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
            // todo adapt validator with type
            v === null || (typeof v === "string" && v.trim() !== ""),
        }}
      />
      <br />
      {errors.speciesId && <span>{JSON.stringify(errors.speciesId)}</span>}
      <br />
      <input
        type="number"
        {...register("refundAmount", {
          validate: (v) => (v ? !Number.isNaN(v) : true),
        })}
        step="0.01"
        min="0"
      />
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
