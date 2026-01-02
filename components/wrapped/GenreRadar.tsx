"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface GenreRadarProps {
  data: {
    name: string;
    value: number;
  }[];
}

export function GenreRadar({ data }: GenreRadarProps) {
  if (!data || data.length === 0) {
    return (
      <div className='h-[260px] flex items-center justify-center text-xs text-slate-500'>
        No genre data
      </div>
    );
  }

  return (
    <div className='h-[260px] w-full flex items-center justify-center'>
      <ResponsiveContainer width='100%' height='100%'>
        <RadarChart data={data}>
          <PolarGrid stroke='rgba(255,255,255,0.15)' />
          <PolarAngleAxis
            dataKey='name'
            tick={{
              fill: "#e5e7eb",
              fontSize: 10,
            }}
          />
          <Radar
            dataKey='value'
            stroke='#ec4899'
            fill='#ec4899'
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
