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
    formState: { errors, isDirty, isValid, touchedFields },
    getValues,
    trigger,
    watch,
    reset,
  } = useForm();

  const { ref: dateRefRegister, ...dateRegister } = register("date", {
    validate: (v) => (v ? !Number.isNaN(new Date(v).getTime()) : true),
  });
  const { ref: commentRefRegister, ...commentRegister } = register("comment");
  const { ref: amountRefRegister, ...amountRegister } = register(
    "refundAmount",
    {
      validate: (v) =>
        resolution &&
        ((isRefundMandatory && !Number.isNaN(v) && Number(v) > 0) ||
          !isRefundMandatory),
    }
  );

  const emailsRef = useRef<any>(null);
  const dateRef = useRef<any>(null);
  const relayPointRef = useRef<any>(null);
  const typeRef = useRef<any>(null);
  const causeRef = useRef<any>(null);
  const resolutionRef = useRef<any>(null);
  const speciesRef = useRef<any>(null);
  const refundAmountRef = useRef<any>(null);
  const commentRef = useRef<any>(null);
  const submitRef = useRef<any>(null);

  const focusNext = React.useCallback(
    (name: string) => {
      if (name === "date" && dateRef.current) {
        dateRef.current.focus();
      } else if (name === "refundAmount" && refundAmountRef.current) {
        refundAmountRef.current.focus();
      } else if (name === "comment" && commentRef.current) {
        commentRef.current.focus();
      } else if (name === "species" && speciesRef.current) {
        speciesRef.current.select.focus();
      } else if (name === "resolution" && resolutionRef.current) {
        resolutionRef.current.select.focus();
      } else if (name === "cause" && causeRef.current) {
        causeRef.current.select.focus();
      } else if (name === "type" && typeRef.current) {
        typeRef.current.select.focus();
      } else if (name === "relayPoint" && relayPointRef.current) {
        relayPointRef.current.select.focus();
      } else if (name === "emails" && emailsRef.current) {
        emailsRef.current.select.focus();
      } else if (name === "submit" && submitRef.current) {
        submitRef.current.focus();
      }
    },
    [
      dateRef.current,
      refundAmountRef.current,
      commentRef.current,
      speciesRef.current,
      resolutionRef.current,
      causeRef.current,
      typeRef.current,
      relayPointRef.current,
      emailsRef.current,
      submitRef.current,
    ]
  );

  const [
    type,
    cause,
    resolution,
    relayPointId,
    emails,
    date,
    refundAmount,
    comment,
  ] = watch([
    "type",
    "cause",
    "resolution",
    "relayPointId",
    "emails",
    "date",
    "refundAmount",
    "comment",
  ]);

  const { data } = useQuery<SimilarIncidentData>(FIND_SIMILAR_INCIDENT, {
    variables: { incident: { emails, date } },
    skip: !emails || emails.length < 1 || !date,
  });

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

  React.useEffect(() => {
    if (
      data &&
      data.findSimilarIncident &&
      data.findSimilarIncident.length > 0
    ) {
      populateFormFromIncident(data.findSimilarIncident[0]);
    }
  }, [data]);

  const isRefundMandatory = React.useMemo(() => {
    if (!resolution) {
      return false;
    }
    return resolution.some((_resolution: string) =>
      ["PARTIAL_REFUND", "REFUND"].includes(_resolution)
    );
  }, [resolution]);

  const isSpeciesMandatory = React.useMemo(() => {
    if (!type) {
      return false;
    }
    return type === "PRODUCT";
  }, [type]);

  const resetForm = () => {
    reset({
      emails: [],
      date,
    });
    setValue("emails", []);
    setValue("resolution", []);
    clearErrors();
  };

  const checkSubmit = (e: any) => {
    e.preventDefault();
    if (touchedFields.comment || (comment && comment.trim() !== "")) {
      handleSubmit(onSubmit)(e);
    } else {
      focusNext("comment");
    }
  };
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
          ...(isRefundMandatory &&
            incidentToCreate.refundAmount &&
            incidentToCreate.refundAmount !== "" && {
              refundAmount: Number(incidentToCreate.refundAmount),
            }),
          ...(isSpeciesMandatory &&
            incidentToCreate.speciesId &&
            incidentToCreate.speciesId !== "" && {
              speciesId: incidentToCreate.speciesId,
            }),
          ...(incidentToCreate.comment &&
            incidentToCreate.comment !== "" && {
              comment: incidentToCreate.comment,
            }),
        },
        update(cache) {
          cache.evict({ fieldName: "findSimilarIncident" });
          cache.gc();
        },
      });
    } catch (e) {}

    resetForm();
  };

  return (
    <>
      {/* todo split controllers to components*/}
      <form onSubmit={checkSubmit}>
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
        <br />
        {/* todo default date this day, maybe from previous incident for same mail*/}
        <input
          type="date"
          disabled={!emails || (emails && emails.length === 0)}
          ref={(e) => {
            dateRef.current = e;
          }}
          {...dateRegister}
          onKeyDown={(e) => {
            switch (e.key) {
              case "Enter":
              case "Tab": {
                if (date) {
                  focusNext("relayPoint");
                  e.preventDefault();
                }
              }
            }
          }}
          onChange={(v) => setValue("date", v.target.value)}
          required
        />
        <Controller
          control={control}
          defaultValue={null}
          name="relayPointId"
          render={({ field: { onChange, value } }) => (
            <RelayPointsSelect
              isDisabled={!date}
              selectRef={relayPointRef}
              onChange={(val) => {
                setTimeout(() => focusNext("type"), 100);
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
        <Controller
          control={control}
          defaultValue={null}
          name="type"
          render={({ field: { onChange, value } }) => (
            <IncidentTypeSelect
              isDisabled={!relayPointId}
              selectRef={typeRef}
              onChange={(val) => {
                onChange(val.value);
                setValue("cause", null);
                if (val.value === "PRODUCT") {
                  setTimeout(() => focusNext("species"), 100);
                } else {
                  setTimeout(() => focusNext("cause"), 100);
                }
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
        {isSpeciesMandatory && (
          <Controller
            control={control}
            defaultValue={null}
            name="speciesId"
            render={({ field: { onChange, value } }) => (
              <SpeciesSelect
                isDisabled={!type}
                selectRef={speciesRef}
                onChange={(val) => {
                  onChange(val.value);
                  setTimeout(() => focusNext("cause"), 100);
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
        )}
        <Controller
          control={control}
          defaultValue={null}
          name="cause"
          render={({ field: { onChange, value } }) => (
            <IncidentCauseSelect
              isDisabled={!type}
              selectRef={causeRef}
              onChange={(val) => {
                onChange(val.value);
                setTimeout(() => focusNext("resolution"), 100);
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
        <Controller
          control={control}
          defaultValue={null}
          name="resolution"
          render={({ field: { onChange, value } }) => (
            <IncidentResolutionSelect
              isDisabled={!cause}
              isRefundMandatory={isRefundMandatory}
              focusNext={focusNext}
              selectRef={resolutionRef}
              onChange={(...args) => {
                onChange(args);
                trigger("refundAmount");
              }}
              resolution={value}
            />
          )}
          rules={{
            validate: (v) => v && v.length !== 0,
          }}
        />
        <input
          disabled={!resolution || !isRefundMandatory}
          hidden={!resolution || !isRefundMandatory}
          type="number"
          ref={refundAmountRef}
          {...amountRegister}
          onKeyDown={(e) => {
            switch (e.key) {
              case "Enter":
              case "Tab": {
                if (refundAmount) {
                  focusNext("comment");
                  e.preventDefault();
                }
              }
            }
            trigger("refundAmount");
          }}
          onChange={(v) => setValue("refundAmount", v.target.value)}
          step="0.01"
          min="0"
        />
        <textarea
          disabled={!resolution || resolution.length === 0}
          ref={commentRef}
          {...commentRegister}
          onKeyDown={(e) => {
            switch (e.key) {
              case "Enter":
              case "Tab": {
                if (!comment || comment.trim() === "") {
                  focusNext("submit");
                  e.preventDefault();
                }
              }
            }
          }}
          onChange={(v) => setValue("comment", v.target.value)}
          value={comment || ""}
        ></textarea>
        <button ref={submitRef} type="submit" disabled={!isDirty || !isValid}>
          Submit
        </button>
      </form>
    </>
  );
}

export default ITTForm;
