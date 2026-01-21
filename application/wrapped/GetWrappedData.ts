import { AniListRepository } from "@/domain/repositories/AniListRepository";
import { WrappedResult } from "@/domain/entities/WrappedResult";
import { animeAndMangaStats } from "./GetAnimeAndMangaStats";

export async function getWrappedData(
  repo: AniListRepository,
  username: string,
  year: number,
): Promise<WrappedResult> {
  // ================= FETCH =================
  const user = await repo.getUser(username);
  const activities = await repo.getActivitiesByYear(user.id, year);
  const stats = animeAndMangaStats(activities, year);
  const animeMeanScore = await repo.getMeanScoreAndTopAnimeByAnimeOrMangaIds(
    user.id,
    stats.animeIds,
  );
  stats.totalAnimeMeanScore = animeMeanScore.meanScore;
  const mangaMeanScore = await repo.getMeanScoreAndTopAnimeByAnimeOrMangaIds(
    user.id,
    stats.mangaIds,
  );
  stats.totalMangaMeanScore = mangaMeanScore.meanScore;
  const topTagsAndTopGenres =
    await repo.getTopTagsAndTopGenresByAnimeAndMangaIds(
      user.id,
      stats.animeAndMangaIds,
    );

  // ================= FINAL =================
  return {
    user: {
      name: user.name,
      avatar: user.avatar,
      banner: user.banner,
      memberSince: user.createdAt
        ? new Date(user.createdAt * 1000).getFullYear()
        : "-",
    },

    totalAnimeTitles: stats.totalAnimeTitles,
    totalMangaTitles: stats.totalMangaTitles,

    totalAnimeEpisodes: stats.totalAnimeEpisodes,
    totalAnimeCompleted: stats.totalAnimeCompleted,
    totalAnimePaused: stats.totalAnimePaused,
    totalAnimeDropped: stats.totalAnimeDropped,
    totalAnimeMeanScore: stats.totalAnimeMeanScore,

    totalMangaChapters: stats.totalMangaChapters,
    totalMangaCompleted: stats.totalMangaCompleted,
    totalMangaPaused: stats.totalMangaPaused,
    totalMangaDropped: stats.totalMangaDropped,
    totalMangaMeanScore: stats.totalMangaMeanScore,

    daysActive: stats.daysActive,
    mostActiveDay: stats.mostActiveDay,
    listActivity: stats.listActivity,
    bestBuddy: stats.bestBuddy,

    episodePerDay: stats.episodePerDay,
    chapterPerDay: stats.chapterPerDay,
    activityPerDay: stats.activityPerDay,

    monthlyActivity: stats.monthlyActivity,

    topGenres: topTagsAndTopGenres.topGenres,
    topTags: topTagsAndTopGenres.topTags,

    topAnime: animeMeanScore.topAnime,
    topManga: mangaMeanScore.topAnime,
  };
}
