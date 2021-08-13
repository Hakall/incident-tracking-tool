import React from "react";
import { useQuery } from "@apollo/client";
import { INCIDENTS_BY_DATE_AND_PRODUCT } from "../../gql/Queries";
import { Incident } from "@itt/common";
import GroupByDateAndProduct from "./GroupByDateAndProduct";

interface IncidentsData {
  incidentsByDateAndProduct: Incident[][];
}

const GroupedByDateAndProduct = () => {
  const { data, loading, error } = useQuery<IncidentsData>(
    INCIDENTS_BY_DATE_AND_PRODUCT,
    {
      variables: {
        pagination: {
          page: 1,
          size: 10,
        },
      },
    }
  );

  const groups = React.useMemo(() => {
    if (data && data.incidentsByDateAndProduct.length > 0) {
      return data.incidentsByDateAndProduct;
    }
    return [];
  }, [data]);

  if (loading || !data || data.incidentsByDateAndProduct.length === 0) {
    return <></>;
  }
  return (
    <>
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
    </>
  );
};

export default GroupedByDateAndProduct;
