import React from "react";
import { useQuery } from "@apollo/client";
import { INCIDENTS_BY_DATE_AND_PRODUCT } from "../gql/Queries";
import { Incident } from "@itt/common";
import GroupByDateAndProduct from "../components/GroupByDateAndProduct";
import { Pagination } from "@itt/common/src/models/pagination";

import styles from "../styles/incidentsByDateAndProduct.module.css";

interface IncidentsData {
  incidentsByDateAndProduct: {
    incidents: Incident[][];
    pagination: Pagination;
  };
}

const GroupedByDateAndProduct = () => {
  const { data, loading, error } = useQuery<IncidentsData>(
    INCIDENTS_BY_DATE_AND_PRODUCT,
    {
      variables: {
        pagination: {
          page: 1,
          size: 5,
        },
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

  if (
    loading ||
    !data ||
    data.incidentsByDateAndProduct.incidents.length === 0
  ) {
    return <></>;
  }
  return (
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
  );
};

export default GroupedByDateAndProduct;
