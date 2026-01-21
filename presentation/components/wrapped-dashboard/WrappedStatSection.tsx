import { WrappedSmallStat } from "./WrappedSmallStat";

interface StatSectionProps {
  title: string;
  animeStats?: {
    totalEpisodes: number;
    totalCompleted: number;
    totalPaused: number;
    totalDropped: number;
    meanScore: number;
  };
  mangaStats?: {
    totalChapters: number;
    totalCompleted: number;
    totalPaused: number;
    totalDropped: number;
    meanScore: number;
  };
  accentGradient?: string;
  accentColor?: string;
  bgColor?: string;
  borderColor?: string;
  titleColor?: string;
}

export const WrappedStatSection = ({
  title,
  animeStats,
  mangaStats,
  accentGradient,
  accentColor,
  bgColor,
  borderColor,
  titleColor = "#DAB2FF",
}: StatSectionProps) => {
  let stats: { label: string; value: string | number }[] = [];

  switch (true) {
    case animeStats !== undefined:
      stats = [
        {
          label: "Episodes",
          value: animeStats?.totalEpisodes.toLocaleString(),
        },
        {
          label: "Completed",
          value: animeStats?.totalCompleted.toLocaleString(),
        },
        { label: "Paused", value: animeStats?.totalPaused.toLocaleString() },
        { label: "Dropped", value: animeStats?.totalDropped.toLocaleString() },
        { label: "Mean Score", value: animeStats?.meanScore.toFixed(1) },
      ];
      break;
    case mangaStats !== undefined:
      stats = [
        {
          label: "Chapters",
          value: mangaStats?.totalChapters.toLocaleString(),
        },
        {
          label: "Completed",
          value: mangaStats?.totalCompleted.toLocaleString(),
        },
        { label: "Paused", value: mangaStats?.totalPaused.toLocaleString() },
        { label: "Dropped", value: mangaStats?.totalDropped.toLocaleString() },
        { label: "Mean Score", value: mangaStats?.meanScore.toFixed(1) },
      ];
      break;
  }

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
