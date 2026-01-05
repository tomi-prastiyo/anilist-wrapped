import { AniListRepository } from "@/domain/repositories/AniListRepository";
import { WrappedResult } from "@/domain/entities/WrappedResult";
import { calculateStats } from "./CalculateStats";
import { getInsights } from "./GetInsights";
import { getPercentile } from "./GetPercentile";
import { getMostActiveMonth } from "./GetMostActiveMonth";

export async function getWrappedData(
  repo: AniListRepository,
  username: string,
  year: number
): Promise<WrappedResult> {
  // ================= FETCH =================
  const user = await repo.getUser(username);
  const animeEntries = await repo.getAnimeEntries(username);
  const mangaEntries = await repo.getMangaEntries(username);

  // ================= STATS =================
  const animeStats = calculateStats(animeEntries, year);
  const mangaStats = calculateStats(mangaEntries, year);

  // ================= DERIVED =================
  const insight = getInsights(animeStats);
  const percentile = {
    anime: getPercentile(animeStats),
    overall: getPercentile(animeStats),
  };

  const mostActiveMonth = getMostActiveMonth(animeStats.monthly);

  // ================= TOP ANIME =================
  const topAnime = [...animeEntries]
    .filter((e) => e.status === "COMPLETED")
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 5);

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

    anime: animeStats,
    manga: mangaStats,

    activity: {
      daysActive: animeStats.daysActive,
      mostActiveMonth,
      dailyEpisodes: animeStats.episodesPerDay,
      listActivity: animeStats.completed,
    },

    monthly: animeStats.monthly,
    topGenres: animeStats.topGenres,
    topTags: animeStats.topTags,

    topAnime,
    firstAnime: animeStats.firstEntry,
    lastAnime: animeStats.lastEntry,

    percentile,
    insight,
  };
}
