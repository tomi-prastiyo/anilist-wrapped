import { TopTagsGenres } from "@/presentation/models/TopTagsGenres";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface TopTagsAndGenresProps {
  data: TopTagsGenres;
}

export function WrappedTopTagsAndGenres({ data }: TopTagsAndGenresProps) {
  return (
    <div className='flex gap-6.25 w-[540.83px] h-65.75'>
      {/* Top Tags */}
      <div className='w-[257.75px] h-65.75 bg-[#1C1C27] border border-[#31313B] rounded-3xl px-6.25 py-5.75 flex flex-col gap-4.5'>
        <div className='flex items-center gap-2.5'>
          <div className='w-1 h-4 bg-white rounded-full' />
          <h4 className='text-[14px] font-bold text-[#E5E7EB]'>Top Tag</h4>
        </div>

        <div className='flex gap-2.5 flex-wrap'>
          {data.tags.length > 0 ? (
            data.tags.map((tag) => (
              <span
                key={tag.id}
                className='px-2.5 py-1 text-[12px] bg-[#0B1622] border border-[#31313B] rounded-lg text-[#CBD5E1]'
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
      <div className='w-[257.75px] h-65.75 bg-[#1C1C27] border border-[#31313B] rounded-3xl px-6.25 py-5.75 flex flex-col gap-3.5'>
        <div className='flex items-center gap-2.5'>
          <div className='w-1 h-4 bg-white rounded-full' />
          <h4 className='text-[14px] font-bold text-[#E5E7EB]'>Genre Stat</h4>
        </div>

        <div className='flex-1 w-full'>
          {data.genres.length > 0 ? (
            <ResponsiveContainer width='100%' height='100%'>
              <RadarChart data={data.genres}>
                <PolarGrid stroke='rgba(255,255,255,0.1)' />
                <PolarAngleAxis
                  dataKey='name'
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <Radar
                  dataKey='value'
                  stroke='#EC4899'
                  fill='#EC4899'
                  fillOpacity={0.3}
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
