interface SmallStatProps {
  label: string;
  value: number | string;
  bgColor?: string;
  borderColor?: string;
}

export const WrappedSmallStat = ({
  label,
  value,
  bgColor = "var(--purple-bg)",
  borderColor = "var(--purple-border)",
}: SmallStatProps) => {
  return (
    <div
      style={{ background: bgColor, borderColor }}
      className='w-21.75 h-18.25 flex flex-col justify-between items-center px-3.75 py-4 border rounded-[20px] flex-none'
    >
      <div className='text-xl font-bold text-text-primary mb-1'>{value}</div>
      <div className='text-[8px] text-text-muted uppercase tracking-wide font-semibold'>
        {label}
      </div>
    </div>
  );
};
