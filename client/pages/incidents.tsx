import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Incident } from "@itt/common";
import { GET_INCIDENTS } from "../gql/Queries";
import { Pagination } from "@itt/common/src/models/pagination";
import { IncidentsList } from "../components/IncidentsList";

import styles from "../styles/incidents.module.css";
import { Navbar } from "../components/Navbar";

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

  const Incidents = React.useMemo(
    () =>
      data ? (
        <IncidentsList incidents={data.incidents.incidents} />
      ) : (
        <table
          className={`table is-striped is-bordered is-hoverable is-fullwidth ${styles["fullheight-table"]}`}
        >
          {loading && <>Loader</>}
          {!loading && <>No data.</>}
        </table>
      ),
    [loading, data]
  );

  const totalPage = React.useMemo(
    () =>
      Math.floor(
        data ? data.incidents.pagination.total / pagination.size + 1 : 1
      ),
    [data, pagination]
  );

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
      <Navbar active={"incidents"} />
      {Incidents}
      <div className={"columns"}>
        <div className={"column"}>
          <button
            className={`button ${styles["centered-button"]}`}
            onClick={goPrev}
            disabled={!data || pagination.page === 1}
          >
            Previous
          </button>
        </div>
        <div className={"column"}>
          <button
            className={`button is-primary ${styles["centered-button"]}`}
            onClick={goNext}
            disabled={
              !data ||
              pagination.page * pagination.size >=
                data.incidents.pagination.total
            }
          >
            Next
          </button>
          Page {pagination.page} / {totalPage}
        </div>
      </div>
    </>
  );
}

export default Incidents;
