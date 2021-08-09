import { useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { CREATE_INCIDENT } from "../gql/Mutations";

function ITTForm() {
  const [createIncident, { data, loading, error }] =
    useMutation(CREATE_INCIDENT);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formdata: any) => {
    console.log(formdata);
    await createIncident({ variables: { emails: [formdata.email] } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register("email", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.email && <span>This field is required</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default ITTForm;
