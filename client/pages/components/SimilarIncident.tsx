import { useQuery } from "@apollo/client";
import { FIND_SIMILAR_INCIDENT } from "../../gql/Queries";
import { Incident } from "@itt/common";

interface SimilarIncidentProps {
  emails: string[];
  date: string;
  onClick: (data: Incident) => void;
}

interface SimilarIncidentData {
  findSimilarIncident: Incident[];
}

const SimilarIncident = (props: SimilarIncidentProps) => {
  const { emails, date, onClick } = props;
  const { data, loading, error } = useQuery<SimilarIncidentData>(
    FIND_SIMILAR_INCIDENT,
    { variables: { incident: { emails, date } } }
  );

  if (loading || !data || data.findSimilarIncident.length === 0) {
    return <></>;
  }
  return (
    <>
      {JSON.stringify(data.findSimilarIncident)}{" "}
      <button
        onClick={() => {
          console.log(data.findSimilarIncident[0]);
          onClick(data.findSimilarIncident[0]);
        }}
      >
        Copy
      </button>
    </>
  );
};

export default SimilarIncident;
