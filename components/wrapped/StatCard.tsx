interface StatCardProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export function StatCard({ label, value, highlight = false }: StatCardProps) {
  return (
    <div
      className='
        rounded-xl p-4
        bg-white/5 border border-white/10
        text-center
      '
    >
      <p className='text-xs text-slate-400 font-medium tracking-wide'>
        {label}
      </p>

      <p
        className={`
          mt-1 text-2xl font-extrabold
          ${highlight ? "text-pink-400" : "text-slate-100"}
        `}
      >
        {value}
      </p>
    </div>
  );
}
