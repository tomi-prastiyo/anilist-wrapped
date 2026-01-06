import { Stat } from "@/presentation/models/Stat";

interface ActivityStatsProps {
  stats: Stat[];
}

export function WrappedActivityStat({ stats }: ActivityStatsProps) {
  return (
    <div className='flex flex-col gap-3'>
      {stats.map((stat) => (
        <div
          key={stat.id}
          className='card-bg rounded-2xl p-3 flex justify-between items-center h-10'
        >
          <span className='text-gray-400 text-sm'>{stat.label}</span>
          <span className='text-white font-bold'>{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
