interface ActivityStatsProps {
  daysActive: number;
  totalDays: number;
  mostActiveDay: string;
  listActivity: number;
  statusPost: number;
}

export function ActivityStats({
  daysActive,
  totalDays,
  mostActiveDay,
  listActivity,
  statusPost,
}: ActivityStatsProps) {
  return (
    <div className='bg-[#151f2e] rounded-2xl p-5 space-y-4'>
      <StatRow label='Days Active' value={`${daysActive}/${totalDays}`} />
      <StatRow label='Most Active Day' value={mostActiveDay} />
      <StatRow label='List Activity' value={listActivity.toString()} />
      <StatRow
        label='Status Post'
        value={statusPost.toString()}
        border={false}
      />
    </div>
  );
}

function StatRow({
  label,
  value,
  border = true,
}: {
  label: string;
  value: string;
  border?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center ${
        border ? "border-b border-gray-700/50 pb-2" : ""
      }`}
    >
      <span className='text-gray-400 text-sm'>{label}</span>
      <span className='text-white font-bold'>{value}</span>
    </div>
  );
}
