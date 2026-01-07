"use client";

import { TopTagsGenres } from "@/presentation/models/TopTagsGenres";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface TopTagsAndGenresProps {
  data: TopTagsGenres;
}

export function WrappedTopTagsAndGenres({ data }: TopTagsAndGenresProps) {
  return (
    <div className='flex gap-6 w-full max-w-137.5 h-64'>
      {/* Top Tags */}
      <div className='flex-1 bg-[#1C1C27] border border-[#31313B] rounded-3xl p-5 flex flex-col gap-3 shadow-sm'>
        <div className='flex items-center gap-2.5'>
          <div className='w-1 h-4 bg-[#E7D3EB] rounded-full' />
          <h4 className='text-[14px] font-bold text-[#B7A5BB]'>Top Tags</h4>
        </div>

        <div className='flex gap-2 flex-wrap'>
          {data.tags.length > 0 ? (
            data.tags.map((tag) => (
              <span
                key={tag.id}
                className='px-3 py-1 text-[12px] bg-linear-to-r from-[#0B1622] to-[#121A2B] border border-[#31313B] rounded-lg text-[#CBD5E1] hover:bg-[#0D1B2A] transition'
              >
                {tag.label}
              </span>
            ))
          ) : (
            <span className='text-[12px] text-[#64748B]'>
              No tags available
            </span>
          )}
        </div>
      </div>

      {/* Genre Radar */}
      <div className='flex-1 bg-[#1C1C27] border border-[#31313B] rounded-3xl p-5 flex flex-col gap-3 shadow-sm'>
        <div className='flex items-center gap-2.5'>
          <div className='w-1 h-4 bg-[#E7D3EB] rounded-full' />
          <h4 className='text-[14px] font-bold text-[#B7A5BB]'>Genre Stats</h4>
        </div>

        <div className='flex-1 w-full'>
          {data.genres.length > 0 ? (
            <ResponsiveContainer width='100%' height='100%'>
              <RadarChart data={data.genres}>
                <defs>
                  <linearGradient
                    id='radarGradient'
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop offset='0%' stopColor='#EC4899' stopOpacity={1} />
                    <stop offset='100%' stopColor='#F472B6' stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <PolarGrid stroke='rgba(255,255,255,0.1)' />
                <PolarAngleAxis
                  dataKey='name'
                  tick={{ fill: "#94A3B8", fontSize: 8 }}
                />
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
                <Radar
                  dataKey='value'
                  stroke='#EC4899'
                  fill='url(#radarGradient)'
                  fillOpacity={0.6}
                  isAnimationActive={true}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className='h-full flex items-center justify-center text-[12px] text-[#64748B]'>
              No genre data
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
