import React from "react";
import { ResponsiveBar, Bar } from "@nivo/bar";
import { Incident, IncidentCause } from "@itt/common";
import { causesColors, getCauseColor } from "../constants/colors";

interface GroupByDateAndProductProps {
  group: {
    date: string;
    name: string;
    occurrences: number;
    totalRefundedAmount: number;
    causes: string[];
    incidents: Incident[];
  };
}

const GroupByDateAndProduct = (props: GroupByDateAndProductProps) => {
  const { date, name, occurrences, totalRefundedAmount, causes, incidents } =
    props.group || {};

  const data = React.useMemo(() => {
    const cause = incidents.reduce<any>((acc, curr) => {
      const labelledCause =
        IncidentCause[curr.cause as unknown as keyof typeof IncidentCause];
      if (acc[labelledCause]) {
        acc[labelledCause] += 1;
      } else {
        acc[labelledCause] = 1;
      }
      return acc;
    }, {});
    return [
      {
        productDate: `${name} - ${date}`,
        ...cause,
      },
    ];
  }, [incidents, name, date]);
  return (
    <div>
      {name}
      occurrences:{occurrences}
      totalRefundedAmount:{totalRefundedAmount}
      <div>
        <Bar
          height={200}
          width={500}
          data={data}
          // keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
          keys={causes.map(
            (cause) => IncidentCause[cause as keyof typeof IncidentCause]
          )}
          indexBy="productDate"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          indexScale={{ type: "band", round: true }}
          colors={({ id }) => getCauseColor(id.toString())}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: (e) => Math.floor(e) === e && e,
            legend: "occurences",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default GroupByDateAndProduct;
