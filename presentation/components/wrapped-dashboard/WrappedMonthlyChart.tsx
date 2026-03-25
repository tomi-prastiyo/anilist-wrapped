"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { chartStyles } from "@/shared/constants/theme";

interface MonthlyChartProps {
  data: {
    month: string;
    count: number;
  }[];
}

export function WrappedMonthlyChart({ data }: MonthlyChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className='h-full flex items-center justify-center text-[12px] text-text-faint'>
        No activity data
      </div>
    );
  }

  return (
    <div className='relative w-full h-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={data}
          margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            stroke={chartStyles.grid.stroke}
            strokeDasharray={chartStyles.grid.strokeDasharray}
            vertical
            horizontal
          />

          <XAxis
            dataKey='month'
            tick={chartStyles.axis.tick}
            axisLine={chartStyles.axis.axisLine}
            tickLine={chartStyles.axis.tickLine}
            padding={{ left: 10, right: 10 }}
          />

          <YAxis
            tick={chartStyles.axis.tick}
            axisLine={chartStyles.axis.axisLine}
            tickLine={chartStyles.axis.tickLine}
            width={32}
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={chartStyles.tooltip}
            labelStyle={chartStyles.tooltipLabel}
            itemStyle={chartStyles.tooltipItem}
            cursor={chartStyles.tooltipCursor}
          />

          <defs>
            <linearGradient id='lineGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#EC4899' stopOpacity={1} />
              <stop offset='100%' stopColor='#F472B6' stopOpacity={0.3} />
            </linearGradient>
          </defs>

          <Line
            type='monotone'
            dataKey='count'
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
