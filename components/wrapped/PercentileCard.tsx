interface PercentileCardProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export function PercentileCard({
  label,
  value,
  highlight = false,
}: PercentileCardProps) {
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
          mt-1 text-xl font-extrabold
          ${highlight ? "text-pink-400" : "text-slate-100"}
        `}
      >
        {value}
      </p>
    </div>
  );
}
