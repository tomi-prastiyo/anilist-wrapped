"use client";

import { TopList } from "@/presentation/models/TopList";
import { CardBox } from "@/presentation/components/ui/CardBox";
import { Crown } from "lucide-react";

interface WrappedTopListProps {
  title: string;
  items: TopList[];
}

export function WrappedTopList({ title, items }: WrappedTopListProps) {
  if (!items || items.length === 0)
    return <div className='text-xs text-text-faint'>No data available</div>;

  const [first, ...rest] = items;

  return (
    <CardBox className='w-full max-w-119 h-102.5 p-6 flex flex-col gap-2'>
      {/* Top Row: Big Poster + Right Content */}
      <div className='flex gap-4 flex-1'>
        {first && (
          <div className='w-36 shrink-0 relative overflow-hidden rounded-2xl'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={first.media?.coverImage.large}
              alt={first.media?.title.userPreferred}
              className='w-full h-full object-cover'
            />
            <div className='absolute top-0 left-0 bg-gold text-black font-extrabold w-9 h-9 flex items-center justify-center text-lg rounded-br-2xl'>
              1
            </div>
          </div>
        )}

        {first && (
          <div className='flex-1 flex flex-col justify-center items-start pl-2'>
            <div>
              <div className='flex items-center gap-2.5 mb-4'>
                <Crown className='w-5 h-5 text-yellow-400 fill-yellow-400' />
                <h4 className='text-sm font-bold text-text-primary uppercase'>
                  {title}
                </h4>
              </div>

              <h3 className='text-xl font-bold text-text-primary leading-snug max-w-65'>
                {first.media?.title.userPreferred}
              </h3>
              {first.media?.startDate.year && (
                <span className='text-sm text-text-subtle'>
                  {first.media?.startDate.year}
                </span>
              )}
              <div className='flex items-center gap-3 mt-2'>
                {first.media?.format && (
                  <span className='text-sm text-text-subtle'>
                    {first.media.format}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Small Posters */}
      {rest.length > 0 && (
        <div className='grid grid-cols-4 gap-2'>
          {rest.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className='relative aspect-2/3 rounded-xl overflow-hidden'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.media?.coverImage.large}
                alt={item.media?.title.userPreferred}
                className='w-full h-full object-cover'
              />
              <div className='absolute top-0 left-0 bg-white text-black text-sm font-black w-8 h-8 flex items-center justify-center rounded-br-2xl'>
                {index + 2}
              </div>
            </div>
          ))}
        </div>
      )}
    </CardBox>
  );
}
