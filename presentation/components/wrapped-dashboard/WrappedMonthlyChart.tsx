"use client";

import { MONTHS } from "@/shared/constants/months";
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

export function WrappedMonthlyChart({ data }: MonthlyChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className='h-full flex items-center justify-center text-[12px] text-[#64748B]'>
        No activity data
      </div>
    );
  }

  const chartData = data.map((value, i) => ({
    month: MONTHS[i],
    value,
  }));

  return (
    <div className='relative w-full h-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke='rgba(255,255,255,0.08)' vertical={false} />

          <XAxis
            dataKey='month'
            tick={{ fill: "#94A3B8", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              fontSize: 12,
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              pointerEvents: "none",
            }}
            labelStyle={{ color: "#E5E7EB" }}
            cursor={{ stroke: "rgba(255,255,255,0.12)" }}
          />

          <Line
            type='monotone'
            dataKey='value'
            stroke='#EC4899'
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
