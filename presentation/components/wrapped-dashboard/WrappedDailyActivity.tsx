interface DailyActivityProps {
  activity: {
    episodePerDay: number;
    chapterPerDay: number;
    activityPerDay: number;
  };
}

export function DailyActivityCard({ activity }: DailyActivityProps) {
  if (!activity) return null;

  return (
    <div className='w-[257.75px] h-[267.45px] bg-[#1C1C27] border border-[#31313B] rounded-3xl px-6.25 py-5.75 flex flex-col gap-4.75'>
      {/* Header */}
      <div className='flex items-center gap-2.5'>
        <div className='w-1 h-4 bg-white rounded-full' />
        <h4 className='text-[14px] font-bold tracking-[0.3px] text-[#E5E7EB]'>
          Daily Activity
        </h4>
      </div>

      {/* Rows */}
      {[
        ["Episode / Day", activity.episodePerDay],
        ["Chapter / Day", activity.chapterPerDay],
        ["Activity / Day", activity.activityPerDay],
      ].map(([label, value]) => (
        <div key={label} className='flex justify-between items-center'>
          <span className='text-[14px] font-semibold text-[#9CA3AF]'>
            {label}
          </span>
          <span className='text-[16px] font-bold text-white'>{value}</span>
        </div>
      ))}
    </div>
  );
}
