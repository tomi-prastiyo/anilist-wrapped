import { WrappedResult } from "@/domain/entities/WrappedResult";
import { DailyActivity } from "../models/DailyActivity";

export function mapDailyActivity(result: WrappedResult): DailyActivity {
  const anime = result.anime.episodesPerDay;
  const manga = result.manga.episodesPerDay;

  return {
    episodePerDay: anime.toFixed(2),
    chapterPerDay: manga.toFixed(2),
    activityPerDay: ((anime + manga) / 2).toFixed(2),
  };
}
