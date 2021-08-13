import React, { useState } from "react";
import { useTable } from "react-table";
import { useQuery } from "@apollo/client";
import {
  Incident,
  IncidentCause,
  IncidentResolution,
  IncidentType,
} from "@itt/common";
import { GET_INCIDENTS } from "../gql/Queries";
import GroupedByDateAndProduct from "../components/GroupedByDateAndProduct";
import { Pagination } from "@itt/common/src/models/pagination";
import { IncidentsList } from "../components/IncidentsList";

interface IncidentsData {
  incidents: {
    pagination: Pagination;
    incidents: Incident[];
  };
}

function Incidents() {
  const [pagination, setPagination] = useState({ size: 25, page: 30 });
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
      <div>
        {/*add controle, improve pagination canPrev canNext etc...*/}
        <button onClick={goPrev} disabled={pagination.page === 1}>
          Previous
        </button>
        <button
          onClick={goNext}
          disabled={
            pagination.page * pagination.size >= data.incidents.pagination.total
          }
        >
          Next
        </button>
      </div>
      {/*  move to another page or useMemo for not rerender groupeBy when incidents page goNext */}
      <GroupedByDateAndProduct></GroupedByDateAndProduct>
    </>
  );
}

export default Incidents;
