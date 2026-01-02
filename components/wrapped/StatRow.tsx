export function StatRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className='flex justify-between items-center py-2'>
      <span className='text-slate-400 text-sm'>{label}</span>
      <span
        className={`font-semibold ${
          highlight ? "text-pink-400" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
