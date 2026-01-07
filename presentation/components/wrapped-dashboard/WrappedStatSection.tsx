import { WrappedSmallStat } from "./WrappedSmallStat";

interface StatSectionProps {
  title: string;
  stats: { label: string; value: number | string }[];
  accentGradient?: string;
  accentColor?: string;
  bgColor?: string;
  borderColor?: string;
  titleColor?: string;
}

export const WrappedStatSection = ({
  title,
  stats,
  accentGradient,
  accentColor,
  bgColor,
  borderColor,
  titleColor = "#DAB2FF",
}: StatSectionProps) => {
  return (
    <div className='flex flex-col gap-4 w-118.75 h-26.25 flex-none'>
      {/* HEADER */}
      <div className='relative w-full h-4'>
        <span
          className='absolute left-0 top-0 w-1 h-4 rounded-full'
          style={{ background: accentGradient ?? accentColor }}
        />
        <h4
          className='absolute left-3 top-0 text-[12px] font-bold tracking-[2.4px] uppercase'
          style={{ color: titleColor }}
        >
          {title}
        </h4>
      </div>

      {/* STATS ROW */}
      <div className='flex gap-2.5 w-full h-18.25'>
        {stats.map((stat, i) => (
          <WrappedSmallStat
            key={i}
            label={stat.label}
            value={stat.value}
            bgColor={bgColor}
            borderColor={borderColor}
          />
        ))}
      </div>
    </div>
  );
};
