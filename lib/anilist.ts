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

interface AniListEntry {
  status: string;
  progress: number;
  score: number;
  completedAt?: {
    year?: number;
    month?: number;
    day?: number;
  };
  media: {
    id: number;
    title: { romaji: string };
    coverImage: { large: string };
    genres: string[];
    tags: { name: string }[];
  };
}

export async function fetchAniListWrappedByUsername(
  username: string,
  year: number
) {
  /* ================= USER INFO ================= */
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
          }
        }
      `,
      variables: { name: username },
    }),
  });

  const userJson = await userRes.json();
  if (userJson.errors || !userJson.data.User) {
    throw new Error("Failed to fetch AniList user or user not found");
  }
  const user = userJson.data.User;

  /* ================= MEDIA LIST ================= */
  const listRes = await fetch(ANILIST_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query ($name: String) {
          MediaListCollection(userName: $name, type: ANIME) {
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

  const listJson = await listRes.json();
  if (listJson.errors) {
    throw new Error("Failed to fetch AniList media list");
  }

  const entries: AniListEntry[] = listJson.data.MediaListCollection.lists
    .flatMap((l: any) => l.entries)
    .filter((e: AniListEntry) => e.completedAt?.year === year);

  /* ================= STATS ================= */
  const monthly = Array(12).fill(0);
  const genreMap: Record<string, number> = {};
  const tagMap: Record<string, number> = {};
  let episodes = 0;
  let scoreSum = 0;
  const activeDays = new Set<string>();

  entries.forEach((e) => {
    episodes += e.progress || 0;
    scoreSum += e.score || 0;

    if (e.completedAt?.month) {
      monthly[e.completedAt.month - 1]++;
      if (e.completedAt.day) {
        activeDays.add(
          `${e.completedAt.year}-${e.completedAt.month}-${e.completedAt.day}`
        );
      }
    }

    e.media.genres.forEach((g) => (genreMap[g] = (genreMap[g] || 0) + 1));
    e.media.tags.forEach((t) => (tagMap[t.name] = (tagMap[t.name] || 0) + 1));
  });

  const mostActiveMonthIndex = monthly.indexOf(Math.max(...monthly));

  const sortedByDate = [...entries].sort((a, b) => {
    const am = a.completedAt?.month || 0;
    const bm = b.completedAt?.month || 0;
    return am - bm;
  });

  /* ================= PERCENTILE ================= */
  const completed = entries.length;
  const daysActiveCount = activeDays.size || 1;
  const episodesPerDay = episodes / daysActiveCount;

  const volumeScore = Math.min(completed / 250, 1);
  const consistencyScore = Math.min(daysActiveCount / 300, 1);
  const intensityScore = Math.min(episodesPerDay / 6, 1);

  const percentileScore =
    volumeScore * 0.4 + consistencyScore * 0.3 + intensityScore * 0.3;

  const animePercentile =
    percentileScore >= 0.9
      ? "Top 1%"
      : percentileScore >= 0.75
      ? "Top 5%"
      : percentileScore >= 0.6
      ? "Top 10%"
      : percentileScore >= 0.45
      ? "Top 25%"
      : percentileScore >= 0.3
      ? "Top 50%"
      : "Top 75%";

  /* ================= INSIGHTS ================= */
  let watchStyle = "Casual watcher 🌱";
  if (episodesPerDay >= 6) watchStyle = "Certified binge watcher 😈";
  else if (episodesPerDay >= 3) watchStyle = "Binge enjoyer 🍿";
  else if (episodesPerDay >= 1.5) watchStyle = "Daily anime routine ☕";

  let consistency = "Chill pace ✨";
  if (daysActiveCount >= 280) consistency = "Ultra consistent 📅";
  else if (daysActiveCount >= 200) consistency = "Very consistent 💪";
  else if (daysActiveCount >= 120) consistency = "Seasonal grinder 🌸";

  const topGenres = Object.entries(genreMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const genreInsight = topGenres[0]
    ? `You really love ${topGenres[0].name} anime 🎭`
    : "You enjoy a wide variety of genres 🎨";

  /* ================= FINAL RETURN ================= */
  return {
    user: {
      name: user.name,
      avatar: user.avatar.large,
      banner: user.bannerImage ?? null,
    },
    anime: {
      episodes,
      completed,
      meanScore: Number((scoreSum / Math.max(entries.length, 1)).toFixed(2)),
    },
    activity: {
      daysActive: daysActiveCount,
      mostActiveMonth:
        mostActiveMonthIndex >= 0 ? MONTHS[mostActiveMonthIndex] : "-",
      dailyEpisodes: Number(episodesPerDay.toFixed(2)),
      listActivity: completed,
    },
    monthly,
    topGenres,
    topTags: Object.entries(tagMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10),
    topAnime: [...entries]
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 5),
    firstAnime: sortedByDate[0] ?? null,
    lastAnime: sortedByDate[sortedByDate.length - 1] ?? null,
    percentile: {
      anime: animePercentile,
      overall: animePercentile,
    },
    insight: {
      watchStyle,
      consistency,
      genreInsight,
    },
  };
}
