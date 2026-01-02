"use client";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";

export function GenreRadar({ data }: { data: any[] }) {
  return (
    <RadarChart width={260} height={260} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey='name' tick={{ fill: "#e5e7eb", fontSize: 10 }} />
      <Radar
        dataKey='value'
        stroke='#f472b6'
        fill='#f472b6'
        fillOpacity={0.4}
      />
    </RadarChart>
  );
}
