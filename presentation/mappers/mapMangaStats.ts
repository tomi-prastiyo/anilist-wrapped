import { AniListStats } from "@/domain/entities/AniListStats";
import { Stat } from "../models/Stat";

export function mapMangaStats(stats: AniListStats): Stat[] {
  return [
    {
      id: "chapters",
      label: "Chapters",
      value: stats.episodes.toLocaleString(),
    },
    {
      id: "completed",
      label: "Completed",
      value: stats.completed.toLocaleString(),
    },
    {
      id: "paused",
      label: "Paused",
      value: stats.paused.toLocaleString(),
    },
    {
      id: "dropped",
      label: "Dropped",
      value: stats.dropped.toLocaleString(),
    },
    {
      id: "meanScore",
      label: "Mean Score",
      value: stats.meanScore.toFixed(1),
    },
  ];
}
