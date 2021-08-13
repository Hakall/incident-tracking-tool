import React from "react";
import {
  Incident,
  IncidentCause,
  IncidentResolution,
  IncidentType,
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
        {headerGroups.map((headerGroup) => {
          const { key, ...headerProps } = headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...headerProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...headerProps } = column.getHeaderProps();
                return (
                  <th key={key} {...headerProps}>
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...rowProps } = row.getRowProps();
          return (
            <tr key={key} {...rowProps}>
              {row.cells.map((cell) => {
                const { key, ...cellProps } = cell.getCellProps();
                return (
                  <td key={key} {...cellProps}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { IncidentsList };
