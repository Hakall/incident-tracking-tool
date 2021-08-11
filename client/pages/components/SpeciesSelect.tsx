import React from "react";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import { GET_SPECIES } from "../../gql/Queries";
import { Species } from "@itt/common";

interface SpeciesSelectProps {
  onChange: (val: any) => void;
  value: string;
}

interface SpeciesData {
  species: Species[];
}

const SpeciesSelect = ({ onChange, value }: SpeciesSelectProps) => {
  const { data, loading, error } = useQuery<SpeciesData>(GET_SPECIES);

  const options = React.useMemo(() => {
    return data
      ? data.species.map((species) => ({
          value: species._id,
          label: species.name,
        }))
      : [];
  }, [data]);

  const selectedValue = React.useMemo(() => {
    const optionValue = options.find((option) => option.value === value);
    return optionValue ? optionValue : { value: "", label: "" };
  }, [options, value]);

  return (
    <Select
      options={options}
      className="basic-single"
      classNamePrefix="select"
      isLoading={loading}
      // isClearable={isClearable}
      onChange={onChange}
      isSearchable={true}
      value={selectedValue}
    />
  );
};

export { SpeciesSelect };
