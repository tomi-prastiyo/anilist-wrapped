const ANILIST_API = "https://graphql.anilist.co";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export interface AniListEntry {
  status: string;
  progress: number;
  score: number;
  completedAt?: { year?: number; month?: number; day?: number };
  media: {
    id: number;
    title: { romaji: string };
    coverImage: { large: string };
    genres: string[];
    tags: { name: string }[];
  };
}

export interface AniListStats {
  episodes: number;
  completed: number;
  paused: number;
  dropped: number;
  meanScore: number;
  monthly: number[];
  daysActive: number;
  episodesPerDay: number;
  topGenres: { name: string; value: number }[];
  topTags: { name: string; value: number }[];
  firstEntry: AniListEntry | null;
  lastEntry: AniListEntry | null;
  entries: AniListEntry[];
}

export interface AniListWrapped {
  user: {
    name: string;
    avatar: string;
    banner: string | null;
    memberSince: number | string;
  };
  anime: AniListStats;
  manga: AniListStats;
  activity: {
    daysActive: number;
    mostActiveMonth: string;
    dailyEpisodes: number;
    listActivity: number;
  };
  monthly: number[];
  topGenres: { name: string; value: number }[];
  topTags: { name: string; value: number }[];
  topAnime: AniListEntry[];
  firstAnime: AniListEntry | null;
  lastAnime: AniListEntry | null;
  percentile: { anime: string; overall: string };
  insight: { watchStyle: string; consistency: string; genreInsight: string };
}

export async function fetchAniListWrappedByUsername(
  username: string,
  year: number
): Promise<AniListWrapped> {
  // ================= USER INFO =================
  const userRes = await fetch(ANILIST_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query ($name: String) {
          User(name: $name) {
            name
            avatar { large }
            bannerImage
            createdAt
          }
        }
      `,
      variables: { name: username },
    }),
  });

  const userJson = await userRes.json();
  if (userJson.errors || !userJson.data?.User)
    throw new Error("Failed to fetch AniList user or user not found");
  const user = userJson.data.User;

  // ================= FETCH MEDIA =================
  async function fetchMedia(type: "ANIME" | "MANGA"): Promise<AniListEntry[]> {
    const res = await fetch(ANILIST_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query ($name: String) {
            MediaListCollection(userName: $name, type: ${type}) {
              lists {
                entries {
                  status
                  progress
                  score(format: POINT_10)
                  completedAt { year month day }
                  media {
                    id
                    title { romaji }
                    coverImage { large }
                    genres
                    tags { name }
                  }
                }
              }
            }
          }
        `,
        variables: { name: username },
      }),
    });

    const json = await res.json();
    if (json.errors) throw new Error(`Failed to fetch ${type}`);
    return (
      json.data.MediaListCollection.lists?.flatMap((l: any) => l.entries) || []
    );
  }

  const animeEntries: AniListEntry[] = await fetchMedia("ANIME");
  const mangaEntries: AniListEntry[] = await fetchMedia("MANGA");

  // ================= CALCULATE STATS =================
  function calculateStats(entries: AniListEntry[]): AniListStats {
    const monthly = Array(12).fill(0);
    const genreMap: Record<string, number> = {};
    const tagMap: Record<string, number> = {};
    let totalProgress = 0;
    let scoreSum = 0;
    let completed = 0;
    let paused = 0;
    let dropped = 0;
    const activeDays = new Set<string>();

    // Filter: hanya COMPLETED di tahun yang diminta
    const filtered = entries.filter(
      (e) => e.status === "COMPLETED" && e.completedAt?.year === year
    );

    filtered.forEach((e) => {
      totalProgress += e.progress || 0;
      scoreSum += e.score || 0;
      completed++;

      // monthly & activeDays
      if (e.completedAt?.month) {
        monthly[e.completedAt.month - 1]++;
        if (e.completedAt.day) {
          activeDays.add(
            `${e.completedAt.year}-${e.completedAt.month}-${e.completedAt.day}`
          );
        }
      }

      e.media.genres?.forEach((g) => (genreMap[g] = (genreMap[g] || 0) + 1));
      e.media.tags?.forEach(
        (t) => (tagMap[t.name] = (tagMap[t.name] || 0) + 1)
      );
    });

    // hitung paused & dropped TOTAL
    entries.forEach((e) => {
      if (e.status === "PAUSED") paused++;
      if (e.status === "DROPPED") dropped++;
    });

    const daysActive = activeDays.size || 1;
    const episodesPerDay = totalProgress / daysActive;

    const topGenres = Object.entries(genreMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    const topTags = Object.entries(tagMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    const sortedByDate = [...filtered].sort(
      (a, b) => (a.completedAt?.month || 0) - (b.completedAt?.month || 0)
    );

    return {
      entries: filtered,
      episodes: totalProgress,
      completed,
      paused,
      dropped,
      meanScore: Number((scoreSum / Math.max(filtered.length, 1)).toFixed(2)),
      monthly,
      daysActive,
      episodesPerDay: Number(episodesPerDay.toFixed(2)),
      topGenres,
      topTags,
      firstEntry: sortedByDate[0] ?? null,
      lastEntry: sortedByDate[sortedByDate.length - 1] ?? null,
    };
  }

  const animeStats = calculateStats(animeEntries);
  const mangaStats = calculateStats(mangaEntries);

  // ================= PERCENTILE =================
  function getPercentile(stats: AniListStats) {
    const volumeScore = Math.min(stats.completed / 250, 1);
    const consistencyScore = Math.min(stats.daysActive / 300, 1);
    const intensityScore = Math.min(stats.episodesPerDay / 6, 1);
    const score =
      volumeScore * 0.4 + consistencyScore * 0.3 + intensityScore * 0.3;

    if (score >= 0.9) return "Top 1%";
    if (score >= 0.75) return "Top 5%";
    if (score >= 0.6) return "Top 10%";
    if (score >= 0.45) return "Top 25%";
    if (score >= 0.3) return "Top 50%";
    return "Top 75%";
  }

  // ================= INSIGHTS =================
  function getInsights(stats: AniListStats) {
    let watchStyle = "Casual watcher 🌱";
    if (stats.episodesPerDay >= 6) watchStyle = "Certified binge watcher 😈";
    else if (stats.episodesPerDay >= 3) watchStyle = "Binge enjoyer 🍿";
    else if (stats.episodesPerDay >= 1.5) watchStyle = "Daily anime routine ☕";

    let consistency = "Chill pace ✨";
    if (stats.daysActive >= 280) consistency = "Ultra consistent 📅";
    else if (stats.daysActive >= 200) consistency = "Very consistent 💪";
    else if (stats.daysActive >= 120) consistency = "Seasonal grinder 🌸";

    const genreInsight = stats.topGenres[0]
      ? `You really love ${stats.topGenres[0].name} anime 🎭`
      : "You enjoy a wide variety of genres 🎨";

    return { watchStyle, consistency, genreInsight };
  }

  const insights = getInsights(animeStats);

  // ================= FINAL RETURN =================
  return {
    user: {
      name: user.name ?? "Unknown",
      avatar: user.avatar?.large ?? "",
      banner: user.bannerImage ?? null,
      memberSince: user.createdAt
        ? new Date(user.createdAt * 1000).getFullYear()
        : "-",
    },
    anime: animeStats,
    manga: mangaStats,
    activity: {
      daysActive: animeStats.daysActive,
      mostActiveMonth:
        animeStats.monthly.indexOf(Math.max(...animeStats.monthly)) >= 0
          ? MONTHS[animeStats.monthly.indexOf(Math.max(...animeStats.monthly))]
          : "-",
      dailyEpisodes: animeStats.episodesPerDay,
      listActivity: animeStats.completed,
    },
    monthly: animeStats.monthly,
    topGenres: animeStats.topGenres,
    topTags: animeStats.topTags,
    topAnime: [...animeEntries]
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 5),
    firstAnime: animeStats.firstEntry,
    lastAnime: animeStats.lastEntry,
    percentile: {
      anime: getPercentile(animeStats),
      overall: getPercentile(animeStats),
    },
    insight: insights,
  };
}
