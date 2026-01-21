import { AniListRepository } from "@/domain/repositories/AniListRepository";
import { WrappedResult } from "@/domain/entities/WrappedResult";
import { getInsights } from "./GetInsights";
import { getPercentile } from "./GetPercentile";
import { getMostActiveMonth } from "./GetMostActiveMonth";
import { animeAndMangaStats } from "./GetAnimeAndMangaStats";

export async function getWrappedData(
  repo: AniListRepository,
  username: string,
  year: number,
): Promise<WrappedResult> {
  // ================= FETCH =================
  const user = await repo.getUser(username);
  const activities = await repo.getAllActivitiesByYear(user.id, year);
  console.log("Activities fetched:", activities);
  const stats = animeAndMangaStats(activities, year);
  console.log("Stats calculated:", stats);
  const animeMeanScore = await repo.getMeanScoreByAnimeOrMangaIds(
    user.id,
    stats.animeIds,
  );
  stats.totalAnimeMeanScore = animeMeanScore.meanScore;
  console.log("Anime mean score fetched:", animeMeanScore);
  const mangaMeanScore = await repo.getMeanScoreByAnimeOrMangaIds(
    user.id,
    stats.mangaIds,
  );
  stats.totalMangaMeanScore = mangaMeanScore.meanScore;
  console.log("Manga mean score fetched:", mangaMeanScore);
  const topTagsAndTopGenres =
    await repo.getTopTagsAndTopGenresByAnimeAndMangaIds(
      user.id,
      stats.animeAndMangaIds,
    );
  console.log("Top tags and genres fetched:", topTagsAndTopGenres);
  // const mostActiveMonth = getMostActiveMonth(stats.monthly);
  // const animeEntries = await repo.getAnimeEntries(username);
  // const mangaEntries = await repo.getMangaEntries(username);

  // // ================= STATS =================
  // const animeStats = calculateStats(animeEntries, year);
  // const mangaStats = calculateStats(mangaEntries, year);

  // // ================= DERIVED =================
  // const insight = getInsights(animeStats);
  // const percentile = {
  //   anime: getPercentile(animeStats),
  //   overall: getPercentile(animeStats),
  // };

  // const mostActiveMonth = getMostActiveMonth(animeStats.monthly);

  // // ================= TOP ANIME & MANGA =================
  // const topAnime = [...animeEntries]
  //   .filter(
  //     (e) =>
  //       e.status === "COMPLETED" && e.completedAt?.year === year && e.score > 0,
  //   )
  //   .sort((a, b) => (b.score || 0) - (a.score || 0))
  //   .slice(0, 5);

  // const topManga = [...mangaEntries]
  //   .filter(
  //     (e) =>
  //       e.status === "COMPLETED" && e.completedAt?.year === year && e.score > 0,
  //   )
  //   .sort((a, b) => (b.score || 0) - (a.score || 0))
  //   .slice(0, 5);

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

    // anime: animeStats,
    // manga: mangaStats,

    // activity: {
    //   daysActive: animeStats.daysActive + "/365",
    //   mostActiveMonth,
    //   dailyEpisodes: animeStats.episodesPerDay,
    //   listActivity: animeStats.completed,
    // },

    // monthly: animeStats.monthly,
    // topGenres: animeStats.topGenres,
    // topTags: animeStats.topTags,

    // topAnime,
    // topManga,
    // firstAnime: animeStats.firstEntry,
    // lastAnime: animeStats.lastEntry,

    // percentile,
    // insight,
  };
}
