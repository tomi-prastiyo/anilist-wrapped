interface DailyActivityProps {
  episodesPerDay: number;
  chaptersPerDay: number;
  activityPerDay: number;
}

export function DailyActivity({
  episodesPerDay,
  chaptersPerDay,
  activityPerDay,
}: DailyActivityProps) {
  return (
    <div className='bg-[#151f2e] rounded-2xl p-5 space-y-4'>
      <div className='flex items-center gap-2 mb-2'>
        <div className='w-1 h-4 bg-white rounded-full'></div>
        <h4 className='text-sm font-bold text-gray-200'>Daily Activity</h4>
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-gray-400 text-sm'>Episode / Day</span>
        <span className='text-white font-bold'>{episodesPerDay}</span>
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-gray-400 text-sm'>Chapter / Day</span>
        <span className='text-white font-bold'>{chaptersPerDay}</span>
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-gray-400 text-sm'>Activity / Day</span>
        <span className='text-white font-bold'>{activityPerDay}</span>
      </div>
    </div>
  );
}
