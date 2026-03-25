"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CardBox } from "@/presentation/components/ui/CardBox";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";
import { chartStyles } from "@/shared/constants/theme";

interface TopTagsAndGenresProps {
  tags: {
    name: string;
    count: number;
  }[];
  genres: {
    name: string;
    count: number;
  }[];
}

export function WrappedTopTagsAndGenres({
  tags,
  genres,
}: TopTagsAndGenresProps) {
  return (
    <div className='flex gap-6 w-full max-w-137.5 h-64'>
      {/* Top Tags */}
      <CardBox className='flex-1 p-5 flex flex-col gap-3 shadow-sm'>
        <SectionHeader title='Top Tags' />

        <div className='flex gap-2 flex-wrap'>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <span
                key={tag.name}
                className='px-3 py-1 text-[12px] bg-linear-to-r from-dashboard-deep to-[#121A2B] border border-card-border rounded-lg text-text-subtle hover:bg-[#0D1B2A] transition'
                title={`Used ${tag.count} times`}
              >
                {tag.name}
              </span>
            ))
          ) : (
            <span className='text-[12px] text-text-faint'>
              No tags available
            </span>
          )}
        </div>
      </CardBox>

      {/* Genre Radar */}
      <CardBox className='flex-1 p-5 flex flex-col gap-3 shadow-sm'>
        <SectionHeader title='Genre Stats' />

        <div className='flex-1 w-full'>
          {genres.length > 0 ? (
            <ResponsiveContainer width='100%' height='100%'>
              <RadarChart data={genres}>
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
                  contentStyle={chartStyles.tooltip}
                  labelStyle={chartStyles.tooltipLabel}
                  itemStyle={chartStyles.tooltipItem}
                  cursor={chartStyles.tooltipCursor}
                />

                <Radar
                  dataKey='count'
                  stroke='#EC4899'
                  fill='url(#radarGradient)'
                  fillOpacity={0.6}
                  isAnimationActive={true}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className='h-full flex items-center justify-center text-[12px] text-text-faint'>
              No genre data
            </div>
          )}
        </div>
      </CardBox>
    </div>
  );
}
