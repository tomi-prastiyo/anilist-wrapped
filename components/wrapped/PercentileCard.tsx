export function PercentileCard({ label, value }: any) {
  return (
    <div className='text-center'>
      <p className='text-slate-400 text-xs'>{label}</p>
      <p className='text-pink-400 font-bold text-xl'>{value}</p>
    </div>
  );
}
