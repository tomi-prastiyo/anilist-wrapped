"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface TopTag {
  name: string;
  value?: number;
}

interface TopGenre {
  name: string;
  value: number;
}

interface TopTagsAndGenresProps {
  topTags: TopTag[];
  topGenres: TopGenre[];
}

export function TopTagsAndGenres({
  topTags,
  topGenres,
}: TopTagsAndGenresProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {/* Top Tags */}
      <div className='card-bg rounded-2xl p-5'>
        <div className='flex items-center gap-2 mb-4'>
          <div className='w-1 h-4 bg-white rounded-full'></div>
          <h4 className='text-sm font-bold text-gray-200'>Top Tag</h4>
        </div>
        <div className='flex flex-wrap gap-2'>
          {topTags.length > 0 ? (
            topTags.slice(0, 5).map(
              (
                tag,
                idx // <-- batasi jadi 5
              ) => (
                <span
                  key={idx}
                  className='px-4 py-2 bg-[#0B1622] rounded-lg text-xs text-gray-300 border border-gray-700'
                >
                  {tag.name}
                </span>
              )
            )
          ) : (
            <span className='text-xs text-slate-500'>No tags available</span>
          )}
        </div>
      </div>

      {/* Top Genres (Radar) */}
      <div className='card-bg rounded-2xl p-5 flex flex-col items-center justify-center'>
        <div className='w-full flex items-center gap-2 mb-2'>
          <div className='w-1 h-4 bg-white rounded-full'></div>
          <h4 className='text-sm font-bold text-gray-200'>Genre Stat</h4>
        </div>
        <div className='h-40 w-full'>
          {topGenres.length > 0 ? (
            <ResponsiveContainer width='100%' height='100%'>
              <RadarChart data={topGenres}>
                <PolarGrid stroke='rgba(255,255,255,0.1)' />
                <PolarAngleAxis
                  dataKey='name'
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Radar
                  name='Genre Count'
                  dataKey='value'
                  stroke='#ec4899'
                  fill='#ec4899'
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className='h-full flex items-center justify-center text-xs text-slate-500'>
              No genre data
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
