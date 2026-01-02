export async function fetchAniListWrapped(token: string, year: number) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Viewer
  const viewerRes = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: `
      query {
        Viewer {
          name
          avatar { large }
        }
      }`,
    }),
  });

  const viewer = (await viewerRes.json()).data.Viewer;

  // List
  const listRes = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: `
      query ($name: String) {
        MediaListCollection(userName: $name, type: ANIME) {
          lists {
            entries {
              progress
              score
              completedAt { year month }
              media {
                title { romaji }
                coverImage { large }
                genres
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

  const monthly = Array(12).fill(0);
  const genreMap: Record<string, number> = {};
  let episodes = 0;

  entries.forEach((e: any) => {
    episodes += e.progress || 0;
    if (e.completedAt?.month) {
      monthly[e.completedAt.month - 1]++;
    }
    e.media.genres.forEach((g: string) => {
      genreMap[g] = (genreMap[g] || 0) + 1;
    });
  });

  const avgAnimePerMonth = entries.length / 12;
  const avgEpisodePerAnime = episodes / Math.max(entries.length, 1);

  const bingeScore =
    avgEpisodePerAnime > 18
      ? "Binge Watcher"
      : avgEpisodePerAnime > 10
      ? "Regular Watcher"
      : "Casual Watcher";

  return {
    user: viewer,
    stats: {
      episodes,
      completed: entries.length,
      meanScore:
        entries.reduce((a: number, b: any) => a + (b.score || 0), 0) /
        Math.max(entries.length, 1),
      avgAnimePerMonth: Number(avgAnimePerMonth.toFixed(1)),
      avgEpisodePerAnime: Number(avgEpisodePerAnime.toFixed(1)),
      bingeScore,
    },
    monthly,
    topAnime: entries
      .sort((a: any, b: any) => (b.score || 0) - (a.score || 0))
      .slice(0, 3),
    genres: Object.entries(genreMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6),
  };
}
