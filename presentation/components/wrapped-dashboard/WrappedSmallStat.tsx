interface SmallStatProps {
  label: string;
  value: number | string;
  bgColor?: string;
  borderColor?: string;
}

export const WrappedSmallStat = ({
  label,
  value,
  bgColor = "#271932",
  borderColor = "#40225C",
}: SmallStatProps) => {
  return (
    <div
      style={{ background: bgColor, borderColor }}
      className='w-21.75 h-18.25 flex flex-col justify-between items-center px-3.75 py-4 border rounded-[20px] flex-none'
    >
      <div className='text-xl font-bold text-white mb-1'>{value}</div>
      <div className='text-[8px] text-gray-400 uppercase tracking-wide font-semibold'>
        {label}
      </div>
    </div>
  );
};
