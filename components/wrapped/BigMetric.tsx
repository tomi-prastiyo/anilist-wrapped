export function BigMetric({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className='space-y-1'>
      <p className='text-slate-400 text-xs'>{label}</p>
      <p className='text-3xl font-bold text-pink-400'>{value}</p>
      {sub && <p className='text-xs text-slate-500'>{sub}</p>}
    </div>
  );
}
