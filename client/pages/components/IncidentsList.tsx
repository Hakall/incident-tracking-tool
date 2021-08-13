import React from "react";
import {
  Incident,
  IncidentCause,
  IncidentResolution,
  IncidentType,
  RelayPoint,
  Species,
} from "@itt/common";
import { Column, useTable } from "react-table";

interface IncidentsListProps {
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

const columns: Array<
  Column<{
    emails: string;
    relayPoint: string;
    date: string;
    type: string;
    cause: string;
    resolution: string;
    refundAmount?: number;
    comment?: string;
  }>
> = [
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
  {
    Header: "Montant remboursé",
    id: "refundAmount",
    accessor: (row) => (row.refundAmount ? row.refundAmount.toString() : ""),
  },
];

const IncidentsList = (props: IncidentsListProps) => {
  const { incidents } = props;

  const tableData = React.useMemo(() => {
    if (incidents) {
      return incidents.map(
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
  }, [incidents]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: tableData,
    });

  return (
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { IncidentsList };
