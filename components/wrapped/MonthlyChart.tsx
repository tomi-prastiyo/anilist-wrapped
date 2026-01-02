"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface MonthlyChartProps {
  data: number[];
}

const MONTHS = [
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
];

export function MonthlyChart({ data }: MonthlyChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className='h-[180px] flex items-center justify-center text-xs text-slate-500'>
        No activity data
      </div>
    );
  }

  const chartData = data.map((value, i) => ({
    month: MONTHS[i],
    value,
  }));

  return (
    <div className='w-full h-[180px]'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={chartData}>
          <CartesianGrid stroke='rgba(255,255,255,0.08)' vertical={false} />

          <XAxis
            dataKey='month'
            tick={{ fill: "#94a3b8", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: "#e5e7eb" }}
            cursor={{ stroke: "rgba(255,255,255,0.1)" }}
          />

          <Line
            type='monotone'
            dataKey='value'
            stroke='#ec4899'
            strokeWidth={3}
            dot={false}
            filter='drop-shadow(0 0 6px rgba(236,72,153,0.6))'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
