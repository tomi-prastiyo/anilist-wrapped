import { AniListEntry } from "@/domain/entities/AniListEntry";
import { AniListStats } from "@/domain/entities/AniListStats";

export function calculateStats(
  entries: AniListEntry[],
  year: number
): AniListStats {
  const monthly = Array(12).fill(0);
  const genreMap: Record<string, number> = {};
  const tagMap: Record<string, number> = {};
  const activeDays = new Set<string>();

  let totalProgress = 0;
  let scoreSum = 0;
  let completed = 0;
  let paused = 0;
  let dropped = 0;

  const filtered = entries.filter(
    (e) => e.status === "COMPLETED" && e.completedAt?.year === year
  );

  filtered.forEach((e) => {
    totalProgress += e.progress || 0;
    scoreSum += e.score || 0;
    completed++;

    if (e.completedAt?.month) {
      monthly[e.completedAt.month - 1]++;

      if (e.completedAt.day) {
        activeDays.add(
          `${e.completedAt.year}-${e.completedAt.month}-${e.completedAt.day}`
        );
      }
    }

    e.media.genres?.forEach((g) => {
      genreMap[g] = (genreMap[g] || 0) + 1;
    });

    e.media.tags?.forEach((t) => {
      tagMap[t.name] = (tagMap[t.name] || 0) + 1;
    });
  });

  entries.forEach((e) => {
    if (e.status === "PAUSED") paused++;
    if (e.status === "DROPPED") dropped++;
  });

  const daysActive = activeDays.size || 1;
  const episodesPerDay = totalProgress / daysActive;

  const topGenres = Object.entries(genreMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const topTags = Object.entries(tagMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

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
