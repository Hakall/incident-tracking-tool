import React from "react";
import { useTable } from "react-table";
import { useQuery } from "@apollo/client";
import {
  Incident,
  IncidentCause,
  IncidentResolution,
  IncidentType,
} from "@itt/common";
import { GET_INCIDENTS } from "../gql/Queries";

interface IncidentsData {
  incidents: Incident[];
}

function Incidents() {
  const { data, loading, error } = useQuery<IncidentsData>(GET_INCIDENTS, {
    variables: {
      pagination: {
        size: 10,
        page: 1,
      },
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
          date: new Date(Number(date)).toLocaleDateString(),
          type: IncidentType[type as unknown as keyof typeof IncidentType],
          cause: IncidentCause[cause as unknown as keyof typeof IncidentCause],
          resolution:
            IncidentResolution[
              resolution as unknown as keyof typeof IncidentResolution
            ],
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
    useTable({ columns, data: tableData });

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
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

export default Incidents;
