import { StatCard } from "./StatCard";
import { AnimeStats, MangaStats } from "@/types/wrapped.types";

interface MediaStatsSectionProps {
  type: "anime" | "manga";
  stats: AnimeStats | MangaStats;
}

export function MediaStatsSection({ type, stats }: MediaStatsSectionProps) {
  const isAnime = type === "anime";
  const color = isAnime ? "fuchsia" : "orange";
  const label = isAnime ? "Anime Stats" : "Manga Stats";
  const countLabel = isAnime ? "Episodes" : "Chapters";

  return (
    <div className='rounded-2xl p-4 space-y-4'>
      <div className='flex items-center gap-2 mb-4'>
        <div
          className={`w-1 h-4 ${
            isAnime ? "bg-fuchsia-500" : "bg-orange-500"
          } rounded-full`}
        ></div>
        <h4 className='text-xs font-bold tracking-wider text-gray-400 uppercase'>
          {label}
        </h4>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-5 gap-4 text-center'>
        <StatCard
          value={"episodes" in stats ? stats.episodes : stats.chapters}
          label={countLabel}
          color={color}
        />
        <StatCard value={stats.completed} label='Completed' color={color} />
        <StatCard value={stats.paused} label='Paused' color={color} />
        <StatCard value={stats.dropped} label='Drop' color={color} />
        <StatCard
          value={stats.meanScore}
          label='Mean Score'
          color={color}
          border
        />
      </div>
    </div>
  );
}
