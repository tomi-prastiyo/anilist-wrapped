"use client";

import { TopList } from "@/presentation/models/TopList";
import { Crown } from "lucide-react";

export function WrappedTopList({ title, items }: TopList) {
  if (items.length === 0)
    return <div className='text-xs text-slate-500'>No data available</div>;

  const [first, ...rest] = items;

  return (
    <div className='card-bg rounded-2xl p-6'>
      <div className='flex items-center gap-2 mb-6'>
        <Crown className='w-5 h-5 text-yellow-400 fill-yellow-400' />
        <h4 className='text-sm font-bold text-gray-200 uppercase tracking-wide'>
          {title}
        </h4>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        {/* Big poster */}
        {first && (
          <div className='w-full md:w-1/3 shrink-0'>
            <div className='relative aspect-2/3 rounded-xl overflow-hidden shadow-lg group'>
              <div className='absolute top-2 left-2 bg-yellow-400 text-black font-bold w-8 h-8 flex items-center justify-center rounded-lg shadow-md z-10'>
                1
              </div>
              <img
                src={first.image}
                alt={first.title}
                className='w-full h-full object-cover transition duration-300 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent'></div>
            </div>
          </div>
        )}

        {/* Small posters */}
        <div className='flex-1 flex flex-col justify-between'>
          {first && (
            <div className='mb-6'>
              <h3 className='text-2xl font-bold text-white mb-1'>
                {first.title}
              </h3>
              <span className='px-2 py-1 bg-gray-700 rounded text-xs text-gray-300'>
                {title}
              </span>
            </div>
          )}

          <div className='grid grid-cols-4 gap-3'>
            {rest.map((item) => (
              <div
                key={item.rank}
                className='relative aspect-2/3 rounded-lg overflow-hidden shadow-md group cursor-pointer'
              >
                <div className='absolute top-1 left-1 bg-white text-black font-bold text-xs w-5 h-5 flex items-center justify-center rounded shadow z-10'>
                  {item.rank}
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className='w-full h-full object-cover transition duration-300 group-hover:scale-110'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
