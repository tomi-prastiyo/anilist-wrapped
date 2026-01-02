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
      <p className='text-3xl font-extrabold text-pink-400 drop-shadow-[0_0_12px_rgba(236,72,153,0.6)]'>
        {value}
      </p>
      {sub && <p className='text-xs text-slate-500'>{sub}</p>}
    </div>
  );
}
