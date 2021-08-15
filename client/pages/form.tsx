import React, { useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Incident } from "@itt/common";
import { Navbar } from "../components/Navbar";
import { SimilarIncidentData } from "../components/SimilarIncident";
import { CREATE_INCIDENT } from "../gql/Mutations";
import { FIND_SIMILAR_INCIDENT } from "../gql/Queries";

import styles from "../styles/form.module.css";
import { EmailsController } from "../components/form/EmailsController";
import { RelayPointsController } from "../components/form/RelayPointsController";
import { IncidentTypeController } from "../components/form/IncidentTypeController";
import { SpeciesController } from "../components/form/SpeciesController";
import { IncidentCauseController } from "../components/form/IncidentCauseController";
import { IncidentResolutionController } from "../components/form/IncidentResolutionController";

function ITTForm() {
  const notifySuccess = () =>
    toast.success("Incident créé avec succès", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifyError = () =>
    toast.error("Incident créé avec succès", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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

  const focusNext = React.useCallback((name: string) => {
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
  }, []);

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

  const populateFormFromIncident = React.useCallback(
    (incident: Incident) => {
      clearErrors();
      setValue("relayPointId", incident.relayPoint._id);
      setValue("type", incident.type);
      setValue("cause", incident.cause);
      setValue("resolution", incident.resolution);
      setValue("refundAmount", incident.refundAmount);
      refundAmountRef.current.value = incident.refundAmount;
      setValue("comment", incident.comment);
      commentRef.current.value = incident.comment;
      setValue("speciesId", incident.species?._id);
    },
    [clearErrors, setValue]
  );

  React.useEffect(() => {
    if (
      data &&
      data.findSimilarIncident &&
      data.findSimilarIncident.length > 0
    ) {
      populateFormFromIncident(data.findSimilarIncident[0]);
    }
  }, [data, populateFormFromIncident]);

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
    setValue("refundAmount", null);
    refundAmountRef.current.value = null;
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
      const { data: createIncidentData, errors } = await createIncident({
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
      if (errors) {
        notifyError();
      }
      if (createIncidentData) {
        notifySuccess();
        resetForm();
      }
    } catch (e) {}
  };

  return (
    <>
      <Navbar active={"form"} />
      <div className={`columns`}>
        <form
          className={`column is-half is-offset-one-quarter ${styles.form}`}
          onSubmit={checkSubmit}
        >
          <EmailsController
            control={control}
            emailsRef={emailsRef}
            focusNext={focusNext}
          />
          <input
            type="date"
            className={"input"}
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
          <RelayPointsController
            date={date}
            focusNext={focusNext}
            relayPointRef={relayPointRef}
            control={control}
          />
          <IncidentTypeController
            relayPointId={relayPointId}
            control={control}
            focusNext={focusNext}
            setValue={setValue}
            typeRef={typeRef}
          />
          {isSpeciesMandatory && (
            <SpeciesController
              focusNext={focusNext}
              control={control}
              speciesRef={speciesRef}
              type={type}
            />
          )}
          <IncidentCauseController
            focusNext={focusNext}
            control={control}
            type={type}
            causeRef={causeRef}
          />
          <IncidentResolutionController
            control={control}
            focusNext={focusNext}
            cause={cause}
            isRefundMandatory={isRefundMandatory}
            resolutionRef={resolutionRef}
            trigger={trigger}
          />
          <input
            disabled={!resolution || !isRefundMandatory}
            hidden={!resolution || !isRefundMandatory}
            type="number"
            className={"input"}
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
            className={"textarea"}
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
          <button
            className={`button is-primary ${styles["centered-button"]}`}
            ref={submitRef}
            type="submit"
            disabled={!isDirty || !isValid}
          >
            Créer incident
          </button>
        </form>
      </div>
    </>
  );
}

export default ITTForm;
