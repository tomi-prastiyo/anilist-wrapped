import { AniListStats } from "@/domain/entities/AniListStats";

export function getPercentile(stats: AniListStats): string {
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
