import { WrappedResult } from "@/domain/entities/WrappedResult";
import { Dashboard } from "../models/Dashboard";

export function mapWrappedToDashboard(result: WrappedResult): Dashboard {
  const { user, stats } = result;

  const memberYear = user.memberSince
    ? new Date(user.memberSince * 1000).getFullYear()
    : "-";

  return {
    user: {
      name: user.name,
      avatar: user.avatar,
      banner: user.banner,
      memberSince: String(memberYear),
    },

    anime: {
      totalTitles: stats.totalAnimeTitles,
      stats: {
        totalEpisodes: stats.totalAnimeEpisodes,
        totalCompleted: stats.totalAnimeCompleted,
        totalPaused: stats.totalAnimePaused,
        totalDropped: stats.totalAnimeDropped,
        meanScore: stats.totalAnimeMeanScore,
      },
      topList: result.topAnime,
    },

    manga: {
      totalTitles: stats.totalMangaTitles,
      stats: {
        totalChapters: stats.totalMangaChapters,
        totalCompleted: stats.totalMangaCompleted,
        totalPaused: stats.totalMangaPaused,
        totalDropped: stats.totalMangaDropped,
        meanScore: stats.totalMangaMeanScore,
      },
      topList: result.topManga,
    },

    activity: {
      stats: [
        { id: "daysActive", label: "Days Active", value: stats.daysActive },
        {
          id: "mostActiveDay",
          label: "Most Active Day",
          value: stats.mostActiveDay,
        },
        {
          id: "listActivity",
          label: "List Activity",
          value: stats.listActivity,
        },
        { id: "bestBuddy", label: "Best Buddy", value: stats.bestBuddy },
      ],
      daily: {
        episodePerDay: stats.episodePerDay,
        chapterPerDay: stats.chapterPerDay,
        activityPerDay: stats.activityPerDay,
      },
      monthly: stats.monthlyActivity,
    },

    discovery: {
      topTags: result.topTags,
      topGenres: result.topGenres,
    },
  };
}
