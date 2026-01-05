import { WrappedResult } from "@/domain/entities/WrappedResult";

interface DailyActivityCardProps {
  data: WrappedResult;
}

export function DailyActivityCard({ data }: DailyActivityCardProps) {
  if (!data) return null;

  return (
    <div className='card-bg rounded-2xl p-5 space-y-4'>
      <div className='flex items-center gap-2 mb-2'>
        <div className='w-1 h-4 bg-white rounded-full'></div>
        <h4 className='text-sm font-bold text-gray-200'>Daily Activity</h4>
      </div>

      <div className='flex justify-between items-center'>
        <span className='text-gray-400 text-sm'>Episode / Day</span>
        <span className='text-white font-bold'>
          {data.anime.episodesPerDay.toFixed(2)}
        </span>
      </div>

      <div className='flex justify-between items-center'>
        <span className='text-gray-400 text-sm'>Chapter / Day</span>
        <span className='text-white font-bold'>
          {data.manga.episodesPerDay.toFixed(2)}
        </span>
      </div>

      <div className='flex justify-between items-center'>
        <span className='text-gray-400 text-sm'>Activity / Day</span>
        <span className='text-white font-bold'>
          {(
            (data.anime.episodesPerDay + data.manga.episodesPerDay) /
            2
          ).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
