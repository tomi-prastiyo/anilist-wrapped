"use client";

import { MONTHS } from "@/shared/constants/months";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
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
          margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
        >
          {/* Grid untuk X & Y */}
          <CartesianGrid
            stroke='rgba(255,255,255,0.08)'
            strokeDasharray='3 3'
            vertical={true} // garis vertikal
            horizontal={true} // garis horizontal
          />

          {/* X Axis */}
          <XAxis
            dataKey='month'
            tick={{ fill: "#94A3B8", fontSize: 10 }}
            axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
            tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
            padding={{ left: 10, right: 10 }}
          />

          {/* Y Axis */}
          <YAxis
            tick={{ fill: "#94A3B8", fontSize: 10 }}
            axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
            tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
            width={32}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#0B1120",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              fontSize: 12,
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              pointerEvents: "none",
            }}
            labelStyle={{ color: "#E5E7EB", fontWeight: 600 }}
            itemStyle={{ color: "#EC4899" }}
            cursor={{ stroke: "rgba(255,255,255,0.12)" }}
          />

          {/* Gradient Line */}
          <defs>
            <linearGradient id='lineGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#EC4899' stopOpacity={1} />
              <stop offset='100%' stopColor='#F472B6' stopOpacity={0.3} />
            </linearGradient>
          </defs>

          <Line
            type='monotone'
            dataKey='value'
            stroke='url(#lineGradient)'
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
            activeDot={{
              r: 4,
              strokeWidth: 2,
              stroke: "#EC4899",
              fill: "#fff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
