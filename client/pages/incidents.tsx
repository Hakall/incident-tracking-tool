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
import GroupedByDateAndProduct from "./components/GroupedByDateAndProduct";

interface IncidentsData {
  incidents: Incident[];
}

const getResolution = (resolution: IncidentResolution[]): string => {
  return resolution
    .map(
      (_resolution) =>
        IncidentResolution[
          _resolution as unknown as keyof typeof IncidentResolution
        ]
    )
    .join(" ");
};

function Incidents() {
  const [pagination, setPagination] = useState({ size: 25, page: 1 });
  const { data, loading, error } = useQuery<IncidentsData>(GET_INCIDENTS, {
    variables: {
      pagination,
    },
  });
  const tableData = React.useMemo(() => {
    if (data && data.incidents) {
      return data.incidents.map(
        ({
          emails,
          relayPoint,
          date,
          resolution,
          refundAmount,
          cause,
          type,
        }) => ({
          emails: emails.join(" "),
          relayPoint: `${relayPoint.name}, ${relayPoint.day}`,
          date: new Date(date).toLocaleDateString(),
          type: IncidentType[type as unknown as keyof typeof IncidentType],
          cause: IncidentCause[cause as unknown as keyof typeof IncidentCause],
          resolution: getResolution(resolution),
          refundAmount,
        })
      );
    }
    return [];
  }, [data]);
  const columns = React.useMemo(
    () => [
      { Header: "Email client", accessor: "emails" },
      { Header: "Point Relais", accessor: "relayPoint" },
      {
        Header: "Date de l'incident",
        accessor: "date",
      },
      {
        Header: "Type d'incident",
        accessor: "type",
      },
      { Header: "Cause", accessor: "cause" },
      { Header: "Résolution", accessor: "resolution" },
      { Header: "Montant remboursé", accessor: "refundAmount" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: tableData,
    });

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
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {/*add controle, improve pagination canPrev canNext etc...*/}
        <button onClick={goPrev}>Previous</button>
        <button onClick={goNext}>Next</button>
      </div>
      <GroupedByDateAndProduct></GroupedByDateAndProduct>
    </>
  );
}

export default Incidents;
