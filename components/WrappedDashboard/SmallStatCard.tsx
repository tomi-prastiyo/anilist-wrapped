interface SmallStatCardProps {
  label: string;
  value: number | string;
  bgColor?: string;
  borderColor?: string;
}

export const SmallStatCard = ({
  label,
  value,
  bgColor = "#271932",
  borderColor = "#40225C",
}: SmallStatCardProps) => (
  <div
    style={{ background: bgColor, borderColor: borderColor }}
    className='border rounded-2xl p-3 shadow-lg hover:scale-105 transition text-center'
  >
    <div className='text-xl font-bold text-white mb-1'>{value}</div>
    <div className='text-[8px] text-gray-400 uppercase tracking-wide font-semibold'>
      {label}
    </div>
  </div>
);
