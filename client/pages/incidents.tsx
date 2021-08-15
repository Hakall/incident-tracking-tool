import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Incident } from "@itt/common";
import { GET_INCIDENTS } from "../gql/Queries";
import { Pagination } from "@itt/common/src/models/pagination";
import { IncidentsList } from "../components/IncidentsList";

import styles from "../styles/incidents.module.css";

interface IncidentsData {
  incidents: {
    pagination: Pagination;
    incidents: Incident[];
  };
}

function Incidents() {
  const [pagination, setPagination] = useState({ size: 10, page: 1 });
  const { data, loading, error } = useQuery<IncidentsData>(GET_INCIDENTS, {
    variables: {
      pagination,
    },
  });

  if (loading || !data) {
    return <></>;
  }

  const goNext = () => {
    setPagination({
      size: pagination.size,
      page: pagination.page + 1,
    });
  };

  const goPrev = () => {
    setPagination({
      size: pagination.size,
      page: pagination.page - 1,
    });
  };

  return (
    <>
      <IncidentsList incidents={data.incidents.incidents} />
      <div className={"columns"}>
        {/*add controle, improve pagination canPrev canNext etc...*/}
        <div className={"column"}>
          <button
            className={`button ${styles["centered-button"]}`}
            onClick={goPrev}
            disabled={pagination.page === 1}
          >
            Previous
          </button>
        </div>
        <div className={"column"}>
          <button
            className={`button is-primary ${styles["centered-button"]}`}
            onClick={goNext}
            disabled={
              pagination.page * pagination.size >=
              data.incidents.pagination.total
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Incidents;
