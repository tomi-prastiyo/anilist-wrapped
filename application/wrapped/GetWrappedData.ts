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

  const animeMeanScore = await repo.getMeanScoreAndTopMedia(
    user.id,
    stats.animeIds,
  );
  stats.totalAnimeMeanScore = animeMeanScore.meanScore;

  const mangaMeanScore = await repo.getMeanScoreAndTopMedia(
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
      memberSince: user.createdAt,
    },

    stats,

    topGenres: topTagsAndTopGenres.topGenres,
    topTags: topTagsAndTopGenres.topTags,

    topAnime: animeMeanScore.topMedia,
    topManga: mangaMeanScore.topMedia,
  };
}
