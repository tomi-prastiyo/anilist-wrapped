import { WrappedResult } from "@/domain/entities/WrappedResult";
import { Dashboard } from "../models/Dashboard";
import { mapAnimeStats } from "./mapAnimeStats";
import { mapDailyActivity } from "./mapDailyActivity";
import { mapTopList } from "./mapTopList";
import { mapTopTagsGenres } from "./mapTopTagsGenres";
import { mapMangaStats } from "./mapMangaStats";

export function mapWrappedToDashboard(result: WrappedResult): Dashboard {
  return {
    user: {
      name: result.user.name,
      avatar: result.user.avatar,
      banner: result.user.banner,
      memberSince: String(result.user.memberSince),
    },

    // totalAnimeWatched: result.anime.completed,
    // totalMangaRead: result.manga.completed,

    // animeStats: mapAnimeStats(result.anime),
    // mangaStats: mapMangaStats(result.manga),

    // dailyActivity: mapDailyActivity(result),
    // monthly: result.anime.monthly,

    // topAnime: mapTopList("Top Anime", result.topAnime),
    // topManga: mapTopList("Top Manga", result.topManga),

    // topTagsGenres: mapTopTagsGenres(result),
  };
}
