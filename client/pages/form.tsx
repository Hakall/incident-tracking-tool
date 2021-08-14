import React, { useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm, Controller, useWatch } from "react-hook-form";
import { CREATE_INCIDENT } from "../gql/Mutations";
import { EmailsInput } from "../components/EmailsInput";
import { RelayPointsSelect } from "../components/RelayPointsSelect";
import { IncidentTypeSelect } from "../components/IncidentTypeSelect";
import { IncidentCauseSelect } from "../components/IncidentCauseSelect";
import { IncidentResolutionSelect } from "../components/IncidentResolutionSelect";
import { SpeciesSelect } from "../components/SpeciesSelect";
import { SimilarIncidentData } from "../components/SimilarIncident";
import { Incident } from "@itt/common";
import { FIND_SIMILAR_INCIDENT } from "../gql/Queries";
import { mailRegex } from "../constants/regex";

function ITTForm() {
  const [createIncident] = useMutation(CREATE_INCIDENT);
  const {
    clearErrors,
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const { ref, ...dateRegister } = register("date", {
    validate: (v) => (v ? !Number.isNaN(new Date(v).getTime()) : true),
  });

  const emailsRef = useRef<any>(null);
  const focusEmails = React.useCallback(() => {
    if (emailsRef.current) {
      emailsRef.current.select.focus();
    }
  }, [emailsRef.current]);

  const dateRef = useRef<any>(null);
  const focusDate = React.useCallback(() => {
    if (dateRef.current) {
      dateRef.current.focus();
    }
  }, [dateRef.current]);

  const relayPointRef = useRef<any>(null);
  const focusRelayPoint = React.useCallback(() => {
    if (relayPointRef.current) {
      relayPointRef.current.select.focus();
    }
  }, [relayPointRef.current]);

  const typeRef = useRef<any>(null);
  const focusType = React.useCallback(() => {
    if (typeRef.current) {
      typeRef.current.select.focus();
    }
  }, [typeRef.current]);

  const causeRef = useRef<any>(null);
  const focusCause = React.useCallback(() => {
    if (causeRef.current) {
      causeRef.current.select.focus();
    }
  }, [causeRef.current]);

  const resolutionRef = useRef<any>(null);
  const focusResolution = React.useCallback(() => {
    if (resolutionRef.current) {
      resolutionRef.current.select.focus();
    }
  }, [resolutionRef.current]);

  const speciesRef = useRef<any>(null);
  const focusSpecies = React.useCallback(() => {
    if (speciesRef.current) {
      speciesRef.current.select.focus();
    }
  }, [speciesRef.current]);

  const refondAmountRef = useRef<any>(null);
  const focusRefundAmount = React.useCallback(() => {
    if (refondAmountRef.current) {
      refondAmountRef.current.select.focus();
    }
  }, [refondAmountRef.current]);

  const commentRef = useRef<any>(null);
  const focusComment = React.useCallback(() => {
    if (commentRef.current) {
      commentRef.current.select.focus();
    }
  }, [commentRef.current]);

  const populateFormFromIncident = (incident: Incident) => {
    clearErrors();
    setValue("relayPointId", incident.relayPoint._id);
    setValue("type", incident.type);
    setValue("cause", incident.cause);
    setValue("resolution", incident.resolution);
    setValue("refundAmount", incident.refundAmount);
    setValue("comment", incident.comment);
    setValue("speciesId", incident.species?._id);
  };

  const resetForm = () => {
    setValue("emails", []);
    setValue("date", null);
    setValue("relayPointId", null);
    setValue("type", null);
    setValue("cause", null);
    setValue("resolution", []);
    setValue("refundAmount", null);
    setValue("comment", null);
    setValue("speciesId", null);
  };

  const type = useWatch({
    control,
    name: "type",
  });

  const resolution = useWatch({
    control,
    name: "resolution",
  });

  const emails = useWatch({
    control,
    name: "emails",
  });

  const date = useWatch({
    control,
    name: "date",
  });

  const { data } = useQuery<SimilarIncidentData>(FIND_SIMILAR_INCIDENT, {
    variables: { incident: { emails, date } },
    skip: !emails || emails.length < 1 || !date,
  });

  React.useEffect(() => {
    if (
      data &&
      data.findSimilarIncident &&
      data.findSimilarIncident.length > 0
    ) {
      populateFormFromIncident(data.findSimilarIncident[0]);
    }
  }, [data]);

  const onSubmit = async () => {
    const incidentToCreate = getValues();

    try {
      await createIncident({
        variables: {
          emails: incidentToCreate.emails.sort(),
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

    resetForm();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          defaultValue={[]}
          control={control}
          name="emails"
          render={({ field: { onChange, value } }) => (
            <EmailsInput
              focusNext={focusDate}
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
        <br />
        {errors.emails && <span>{JSON.stringify(errors.emails)}</span>}
        <br />
        {/* todo default date this day, maybe from previous incident for same mail*/}
        <input
          type="date"
          ref={(e) => {
            dateRef.current = e;
          }}
          {...dateRegister}
          onKeyDown={(e) => {
            switch (e.key) {
              case "Enter":
              case "Tab": {
                if (date) {
                  focusRelayPoint();
                  e.preventDefault();
                }
              }
            }
          }}
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
              focusNext={focusType}
              selectRef={relayPointRef}
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
              focusNext={focusCause}
              selectRef={typeRef}
              onChange={(val) => {
                onChange(val.value);
                setValue("cause", null);
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
        {/* todo focus conditionnel */}
        <Controller
          control={control}
          defaultValue={null}
          name="cause"
          render={({ field: { onChange, value } }) => (
            <IncidentCauseSelect
              focusNext={focusResolution}
              selectRef={causeRef}
              onChange={(val) => {
                onChange(val.value);
              }}
              value={value}
              type={type}
            />
          )}
          rules={{
            validate: (v) =>
              v !== null && typeof v === "string" && v.trim() !== "",
          }}
        />
        <br />
        {errors.cause && <span>{JSON.stringify(errors.cause)}</span>}
        {/* todo focus conditionnel */}
        <Controller
          control={control}
          defaultValue={null}
          name="resolution"
          render={({ field: { onChange, value } }) => (
            <IncidentResolutionSelect
              focusNext={focusComment}
              selectRef={resolutionRef}
              onChange={(values: { value: string }[]) => {
                onChange(values.map(({ value }) => value));
              }}
            />
          )}
          rules={{
            validate: (v) => v && v.length !== 0,
          }}
        />
        <br />
        {errors.resolution && <span>{JSON.stringify(errors.resolution)}</span>}
        {type === "PRODUCT" && (
          <>
            <Controller
              control={control}
              defaultValue={null}
              name="speciesId"
              render={({ field: { onChange, value } }) => (
                <SpeciesSelect
                  focusNext={focusResolution}
                  selectRef={speciesRef}
                  onChange={(val) => {
                    onChange(val.value);
                  }}
                  value={value}
                />
              )}
              rules={{
                validate: (v) =>
                  (v === null && getValues().type !== "PRODUCT") ||
                  (getValues().type === "PRODUCT" &&
                    typeof v === "string" &&
                    v.trim() !== ""),
              }}
            />
            <br />
            {errors.speciesId && (
              <span>{JSON.stringify(errors.speciesId)}</span>
            )}
          </>
        )}
        <br />
        {resolution &&
          resolution.some((_resolution: string) =>
            ["PARTIAL_REFUND", "REFUND"].includes(_resolution)
          ) && (
            <>
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
            </>
          )}
        <textarea {...register("comment")}></textarea>
        <br />
        {errors.comment && <span>{JSON.stringify(errors.comment)}</span>}
        <br />
        <button type="submit">Submit</button>
      </form>
      {/*{emails && date && (*/}
      {/*  <SimilarIncident*/}
      {/*    emails={emails}*/}
      {/*    date={date}*/}
      {/*    onClick={populateFormFromIncident}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  );
}

export default ITTForm;
