interface ActivityStat {
  label: string;
  value: string | number;
}

interface ActivityStatsProps {
  stats: ActivityStat[];
}

export function ActivityStats({ stats }: ActivityStatsProps) {
  return (
    <div className='flex flex-col gap-3'>
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className='card-bg rounded-2xl p-3 flex justify-between items-center h-10'
        >
          <span className='text-gray-400 text-sm'>{stat.label}</span>
          <span className='text-white font-bold'>{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
