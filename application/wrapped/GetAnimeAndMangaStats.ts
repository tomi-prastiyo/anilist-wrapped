import { AniListActivity } from "@/domain/entities/AniListActivity";
import { AniListStats } from "@/domain/entities/AniListStats";
import { MONTHS } from "@/shared/constants/months";

export function animeAndMangaStats(
  activities: AniListActivity[],
  year: number,
): AniListStats {
  const animeTitles = new Set<number>();
  const mangaTitles = new Set<number>();

  const animeCompleted = new Set<number>();
  const animePaused = new Set<number>();
  const animeDropped = new Set<number>();

  const mangaCompleted = new Set<number>();
  const mangaPaused = new Set<number>();
  const mangaDropped = new Set<number>();

  let totalAnimeEpisodes = 0;
  let totalMangaChapters = 0;

  const activeDays = new Set<string>();
  const activityByDay = new Map<string, number>();
  const likesByUser = new Map<string, number>();

  let totalActivitiesInYear = 0;

  const monthlyActivity = new Array(12).fill(0);

  const isLeapYear = (year: number): boolean =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const parseProgress = (progress?: string | null): number => {
    if (!progress) return 0;

    if (progress.includes("-")) {
      const [start, end] = progress.split("-").map((v) => Number(v.trim()));
      if (isNaN(start) || isNaN(end)) return 0;
      return end - start + 1;
    }

    return isNaN(Number(progress)) ? 0 : 1;
  };

  activities.forEach((activity) => {
    if (!activity.media || !activity.status) return;

    const mediaId = activity.media.id;
    const status = activity.status.toLowerCase();
    const progressCount = parseProgress(activity.progress);

    // ================== MOST ACTIVE DAY =================
    const activityDate = new Date(activity.createdAt * 1000);
    if (activityDate.getFullYear() !== year) return;

    const dateKey = activityDate.toISOString().split("T")[0];
    activeDays.add(dateKey);
    activityByDay.set(dateKey, (activityByDay.get(dateKey) || 0) + 1);

    // ================== BEST BUDDY =================
    activity.likes?.forEach((like) => {
      likesByUser.set(like.name, (likesByUser.get(like.name) || 0) + 1);
    });

    // ================== TOTAL ACTIVITIES =================
    totalActivitiesInYear++;

    // ================== MONTHLY ACTIVITY =================
    const monthIndex = activityDate.getMonth();
    monthlyActivity[monthIndex]++;

    // ================= ANIME =================
    if (activity.type === "ANIME_LIST") {
      if (!status.includes("plan")) {
        animeTitles.add(mediaId);
      }

      if (status.includes("watched") || status.includes("rewatched")) {
        totalAnimeEpisodes += progressCount;
      }

      if (status === "completed" || status === "rewatched") {
        animeCompleted.add(mediaId);
        animePaused.delete(mediaId);
        animeDropped.delete(mediaId);
      }

      if (status.includes("paused") && !animeCompleted.has(mediaId)) {
        animePaused.add(mediaId);
      }

      if (status.includes("dropped") && !animeCompleted.has(mediaId)) {
        animeDropped.add(mediaId);
      }
    }

    // ================= MANGA =================
    if (activity.type === "MANGA_LIST") {
      if (!status.includes("plan")) {
        mangaTitles.add(mediaId);
      }

      if (status.includes("read") || status.includes("reread")) {
        totalMangaChapters += progressCount;
      }

      if (status === "completed" || status === "reread") {
        mangaCompleted.add(mediaId);
        mangaPaused.delete(mediaId);
        mangaDropped.delete(mediaId);
      }

      if (status.includes("paused") && !mangaCompleted.has(mediaId)) {
        mangaPaused.add(mediaId);
      }

      if (status.includes("dropped") && !mangaCompleted.has(mediaId)) {
        mangaDropped.add(mediaId);
      }
    }
  });

  // ================= MOST ACTIVE DAY & BEST BUDDY =================
  const mostActiveDateKey =
    [...activityByDay.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  const mostActiveDay = mostActiveDateKey
    ? new Date(mostActiveDateKey).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })
    : "-";

  const totalDaysInYear = isLeapYear(year) ? 366 : 365;

  const bestBuddy =
    [...likesByUser.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  // ================= DAILY ACTIVITY =================
  const activeDayCount = activeDays.size || 1;

  const episodePerDay = Number(
    (totalAnimeEpisodes / activeDayCount).toFixed(2),
  );

  const chapterPerDay = Number(
    (totalMangaChapters / activeDayCount).toFixed(2),
  );

  const activityPerDay = Number(
    (totalActivitiesInYear / activeDayCount).toFixed(2),
  );

  // ================= MONTHLY ACTIVITY =================
  const monthlyActivityChart = MONTHS.map((month, index) => ({
    month,
    count: monthlyActivity[index],
  }));

  return {
    totalAnimeTitles: animeTitles.size,
    totalMangaTitles: mangaTitles.size,

    totalAnimeEpisodes,
    totalAnimeCompleted: animeCompleted.size,
    totalAnimePaused: animePaused.size,
    totalAnimeDropped: animeDropped.size,
    totalAnimeMeanScore: 0,

    totalMangaChapters,
    totalMangaCompleted: mangaCompleted.size,
    totalMangaPaused: mangaPaused.size,
    totalMangaDropped: mangaDropped.size,
    totalMangaMeanScore: 0,

    animeIds: [...animeTitles],
    mangaIds: [...mangaTitles],
    animeAndMangaIds: [...animeTitles, ...mangaTitles],

    daysActive: `${activeDays.size}/${totalDaysInYear}`,
    mostActiveDay,
    listActivity: activities.length,
    bestBuddy,

    episodePerDay,
    chapterPerDay,
    activityPerDay,

    monthlyActivity: monthlyActivityChart,
  };
}
