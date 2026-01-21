interface ActivityStatsProps {
  stats: {
    id: string;
    label: string;
    value: string | number;
  }[];
}

export function WrappedActivityStat({ stats }: ActivityStatsProps) {
  return (
    <div className='flex flex-col gap-3.5 w-[257.75px]'>
      {stats.map((stat) => (
        <div
          key={stat.id}
          className='flex items-center justify-between px-5.75 h-[56.6px] bg-[#1C1C27] border border-[#31313B] rounded-xl'
        >
          <span className='text-[14px] font-semibold text-[#9CA3AF]'>
            {stat.label}
          </span>
          <span className='text-[16px] font-bold text-white'>{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
