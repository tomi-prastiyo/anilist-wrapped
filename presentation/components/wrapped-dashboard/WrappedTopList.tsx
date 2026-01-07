"use client";

import { TopList } from "@/presentation/models/TopList";
import { Crown } from "lucide-react";

export function WrappedTopList({ title, items }: TopList) {
  if (!items || items.length === 0)
    return <div className='text-xs text-[#64748B]'>No data available</div>;

  const [first, ...rest] = items;

  return (
    <div className='w-full max-w-119 h-102.5 bg-[#1C1C27] border border-[#31313B] rounded-3xl p-6 flex flex-col gap-2'>
      {/* Top Row: Big Poster + Right Content */}
      <div className='flex gap-4 flex-1'>
        {/* Big Poster */}
        {first && (
          <div className='w-36 shrink-0 relative'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={first.image}
              alt={first.title}
              className='w-full h-full object-cover rounded-2xl'
            />
            <div className='absolute top-2 left-2 bg-yellow-400 text-black font-bold w-7 h-7 flex items-center justify-center rounded-lg z-10'>
              1
            </div>
          </div>
        )}

        {/* Right Content */}
        {first && (
          <div className='flex-1 flex flex-col justify-center items-start pl-2'>
            <div>
              <div className='flex items-center gap-2.5 mb-4'>
                <Crown className='w-5 h-5 text-yellow-400 fill-yellow-400' />
                <h4 className='text-sm font-bold text-white uppercase'>
                  {title}
                </h4>
              </div>
              <h3 className='text-lg md:text-xl font-bold text-white mb-1.5 line-clamp-2'>
                {first.title}
              </h3>
              <span className='inline-block px-2 py-1 bg-[#0B1622] border border-[#31313B] rounded-md text-[12px] text-[#9CA3AF]'>
                {title}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Small Posters */}
      {rest.length > 0 && (
        <div className='grid grid-cols-4 gap-2'>
          {rest.map((item) => (
            <div
              key={item.rank}
              className='relative aspect-2/3 rounded-xl overflow-hidden'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className='w-full h-full object-cover'
              />
              <div className='absolute top-1 left-1 bg-white text-black text-xs w-5 h-5 flex items-center justify-center rounded-md z-10'>
                {item.rank}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
