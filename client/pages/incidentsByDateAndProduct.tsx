import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { INCIDENTS_BY_DATE_AND_PRODUCT } from "../gql/Queries";
import { Incident } from "@itt/common";
import GroupByDateAndProduct from "../components/GroupByDateAndProduct";
import { Pagination } from "@itt/common/src/models/pagination";

import styles from "../styles/incidentsByDateAndProduct.module.css";
import { Navbar } from "../components/Navbar";

interface IncidentsData {
  incidentsByDateAndProduct: {
    incidents: Incident[][];
    pagination: Pagination;
  };
}

const GroupedByDateAndProduct = () => {
  const [pagination, setPagination] = useState({ size: 5, page: 1 });
  const { data, loading, error } = useQuery<IncidentsData>(
    INCIDENTS_BY_DATE_AND_PRODUCT,
    {
      variables: {
        pagination,
      },
    }
  );

  const groups = React.useMemo(() => {
    if (
      data &&
      data.incidentsByDateAndProduct &&
      data.incidentsByDateAndProduct.incidents.length > 0
    ) {
      return data.incidentsByDateAndProduct.incidents;
    }
    return [];
  }, [data]);

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
      <Navbar active={"incidentsByDateAndProduct"} />
      <div className={`${styles["incidents-grouped"]}`}>
        <div className={`columns ${styles["incidents-grouped-header"]}`}>
          <div className={`column is-one-fifths has-text-centered`}>Espèce</div>
          <div className={`column is-one-fifths has-text-centered`}>Date</div>
          <div className={`column is-one-fifths has-text-centered`}>
            Occurences
          </div>
          <div className={`column is-one-fifths has-text-centered`}>
            Montant remboursé total
          </div>
          <div className={`column is-one-fifths has-text-centered`}>
            Graphique des causes
          </div>
        </div>
        {groups.map((group) => {
          const groupData = group.reduce(
            (acc, curr) => {
              acc.totalRefundedAmount += curr.refundAmount || 0;
              acc.occurrences += 1;
              if (!acc.causes.find((cause) => cause === curr.cause)) {
                acc.causes.push(curr.cause);
              }
              return acc;
            },
            {
              date: group[0].date,
              name: group[0].species!.name,
              occurrences: 0,
              totalRefundedAmount: 0,
              causes: [] as string[],
            }
          );
          return (
            <GroupByDateAndProduct
              key={`${groupData.date}${groupData.name}`}
              group={{ ...groupData, incidents: group }}
            />
          );
        })}
      </div>
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
                data.incidentsByDateAndProduct.pagination.total
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default GroupedByDateAndProduct;
