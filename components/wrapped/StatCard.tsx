export function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className='bg-[#121a2b] rounded-xl p-4 text-center'>
      <p className='text-slate-400 text-sm'>{label}</p>
      <p className='text-pink-400 text-2xl font-bold mt-1'>{value}</p>
    </div>
  );
}
