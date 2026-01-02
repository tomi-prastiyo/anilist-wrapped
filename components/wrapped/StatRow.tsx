interface StatRowProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  divider?: boolean;
}

export function StatRow({
  label,
  value,
  highlight = false,
  divider = false,
}: StatRowProps) {
  return (
    <div
      className={`
        flex items-center justify-between
        py-2.5
        ${divider ? "border-b border-white/5" : ""}
      `}
    >
      <span className='text-sm text-slate-400'>{label}</span>

      <span
        className={`
          text-sm font-semibold
          ${highlight ? "text-pink-400" : "text-slate-100"}
        `}
      >
        {value}
      </span>
    </div>
  );
}
