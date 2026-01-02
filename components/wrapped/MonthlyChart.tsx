"use client";
import { LineChart, Line, XAxis, Tooltip } from "recharts";

export function MonthlyChart({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({
    month: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][i],
    value: v,
  }));

  return (
    <LineChart width={300} height={160} data={chartData}>
      <XAxis dataKey='month' tick={{ fill: "#94a3b8", fontSize: 10 }} />
      <Tooltip />
      <Line
        type='monotone'
        dataKey='value'
        stroke='#f472b6'
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  );
}
