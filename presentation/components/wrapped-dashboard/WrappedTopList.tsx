"use client";

import { TopList } from "@/presentation/models/TopList";
import { Crown } from "lucide-react";

export function WrappedTopList({ title, items }: TopList) {
  if (items.length === 0)
    return <div className='text-xs text-[#64748B]'>No data available</div>;

  const [first, ...rest] = items;

  return (
    <div className='w-[476.35px] h-[409.93px] bg-[#1C1C27] border border-[#31313B] rounded-3xl px-5.75 py-7 flex flex-col gap-8.75'>
      {/* Header */}
      <div className='flex items-center gap-2.5 mb-5'>
        <Crown className='w-4.5 h-4.5 text-yellow-400 fill-yellow-400' />
        <h4 className='text-[14px] font-bold text-[#E5E7EB] uppercase tracking-wide'>
          {title}
        </h4>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        {/* Big Poster */}
        {first && (
          <div className='w-full md:w-37.5 shrink-0'>
            <div className='relative aspect-2/3 rounded-2xl overflow-hidden group'>
              <div className='absolute top-2 left-2 bg-yellow-400 text-black font-bold w-7 h-7 flex items-center justify-center rounded-lg z-10'>
                1
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={first.image}
                alt={first.title}
                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
              />

              <div className='absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent' />
            </div>
          </div>
        )}

        {/* Right Content */}
        <div className='flex-1 flex flex-col justify-between'>
          {first && (
            <div className='mb-5'>
              <h3 className='text-[20px] font-bold text-white mb-1.5 line-clamp-2'>
                {first.title}
              </h3>
              <span className='inline-block px-2 py-1 bg-[#0B1622] border border-[#31313B] rounded-md text-[12px] text-[#9CA3AF]'>
                {title}
              </span>
            </div>
          )}

          {/* Small Posters */}
          <div className='grid grid-cols-4 gap-3'>
            {rest.map((item) => (
              <div
                key={item.rank}
                className='relative aspect-2/3 rounded-xl overflow-hidden group cursor-pointer'
              >
                <div className='absolute top-1.5 left-1.5 bg-white text-black font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-md z-10'>
                  {item.rank}
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
