import { WrappedResult } from "@/domain/entities/WrappedResult";
import { Dashboard } from "../models/Dashboard";

export function mapWrappedToDashboard(result: WrappedResult): Dashboard {
  return {
    user: {
      name: result.user.name,
      avatar: result.user.avatar,
      banner: result.user.banner,
      memberSince: String(result.user.memberSince),
    },

    totalAnimeWatched: result.totalAnimeCompleted,
    totalMangaRead: result.totalMangaCompleted,

    totalAnimeEpisodes: result.totalAnimeEpisodes,
    totalAnimeCompleted: result.totalAnimeCompleted,
    totalAnimePaused: result.totalAnimePaused,
    totalAnimeDropped: result.totalAnimeDropped,
    totalAnimeMeanScore: result.totalAnimeMeanScore,

    totalMangaChapters: result.totalMangaChapters,
    totalMangaCompleted: result.totalMangaCompleted,
    totalMangaPaused: result.totalMangaPaused,
    totalMangaDropped: result.totalMangaDropped,
    totalMangaMeanScore: result.totalMangaMeanScore,

    daysActive: result.daysActive,
    mostActiveDay: result.mostActiveDay,
    listActivity: result.listActivity,
    bestBuddy: result.bestBuddy,

    episodePerDay: result.episodePerDay,
    chapterPerDay: result.chapterPerDay,
    activityPerDay: result.activityPerDay,

    monthlyActivity: result.monthlyActivity,

    topGenres: result.topGenres,
    topTags: result.topTags,

    topAnime: result.topAnime,
    topManga: result.topManga,
  };
}
