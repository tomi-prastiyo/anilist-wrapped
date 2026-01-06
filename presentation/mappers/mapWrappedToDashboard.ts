import { WrappedResult } from "@/domain/entities/WrappedResult";
import { Dashboard } from "../models/Dashboard";
import { mapAnimeStats } from "./mapStats";
import { mapDailyActivity } from "./mapDailyActivity";
import { mapTopList } from "./mapTopList";
import { mapTopTagsGenres } from "./mapTopTagsGenres";

export function mapWrappedToDashboard(result: WrappedResult): Dashboard {
  return {
    user: {
      name: result.user.name,
      avatar: result.user.avatar,
      banner: result.user.banner,
      memberSince: String(result.user.memberSince),
    },

    dailyActivity: mapDailyActivity(result),
    monthly: result.anime.monthly,

    animeStats: mapAnimeStats(result.anime),
    mangaStats: mapAnimeStats(result.manga),

    topAnime: mapTopList("Top Anime", result.topAnime),
    topManga: mapTopList("Top Manga", result.topManga),

    topTagsGenres: mapTopTagsGenres(result),
  };
}
