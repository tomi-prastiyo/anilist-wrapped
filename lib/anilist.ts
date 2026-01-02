export async function fetchAniListWrapped(token: string, year: number) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const viewerRes = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: `query {
        Viewer {
          name
          avatar { large }
          statistics {
            anime { count meanScore }
            manga { count meanScore }
          }
        }
      }`,
    }),
  });

  const viewer = (await viewerRes.json()).data.Viewer;

  const listRes = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: `
      query ($name: String) {
        MediaListCollection(userName: $name, type: ANIME) {
          lists {
            entries {
              status
              progress
              score(format: POINT_10)
              completedAt { year month }
              startedAt { year month }
              media {
                title { romaji }
                coverImage { large }
                genres
                tags { name }
              }
            }
          }
        }
      }`,
      variables: { name: viewer.name },
    }),
  });

  const entries = (await listRes.json()).data.MediaListCollection.lists
    .flatMap((l: any) => l.entries)
    .filter((e: any) => e.completedAt?.year === year);

  /* ================= STATS ================= */

  const monthly = Array(12).fill(0);
  const genreMap: Record<string, number> = {};
  const tagMap: Record<string, number> = {};
  let episodes = 0;

  entries.forEach((e: any) => {
    episodes += e.progress || 0;
    if (e.completedAt?.month) monthly[e.completedAt.month - 1]++;

    e.media.genres.forEach(
      (g: string) => (genreMap[g] = (genreMap[g] || 0) + 1)
    );
    e.media.tags.forEach(
      (t: any) => (tagMap[t.name] = (tagMap[t.name] || 0) + 1)
    );
  });

  const sortedByDate = [...entries].sort(
    (a, b) => (a.completedAt?.month || 0) - (b.completedAt?.month || 0)
  );

  /* ================= PERCENTILE (ESTIMATE) ================= */
  const animePercentile =
    entries.length > 300
      ? "Top 1%"
      : entries.length > 150
      ? "Top 10%"
      : entries.length > 50
      ? "Top 25%"
      : "Top 50%";

  return {
    user: {
      name: viewer.name,
      avatar: viewer.avatar.large,
    },
    anime: {
      episodes,
      completed: entries.length,
      meanScore:
        entries.reduce((a: number, b: any) => a + (b.score || 0), 0) /
        Math.max(entries.length, 1),
    },
    activity: {
      daysActive:
        new Set(entries.map((e: any) => `${e.completedAt?.month}`)).size * 5, // estimation
      mostActiveMonth: monthly.indexOf(Math.max(...monthly)) + 1,
      dailyEpisodes: (episodes / 365).toFixed(2),
    },
    monthly,
    topGenres: Object.entries(genreMap)
      .map(([name, value]) => ({ name, value }))
      .slice(0, 8),
    topTags: Object.entries(tagMap)
      .map(([name, value]) => ({ name, value }))
      .slice(0, 10),
    topAnime: entries
      .sort((a: any, b: any) => (b.score || 0) - (a.score || 0))
      .slice(0, 5),
    firstAnime: sortedByDate[0],
    lastAnime: sortedByDate[sortedByDate.length - 1],
    percentile: {
      anime: animePercentile,
      overall: animePercentile,
    },
  };
}
