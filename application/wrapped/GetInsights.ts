import { AniListStats } from "@/domain/entities/AniListStats";
import { WrappedInsight } from "@/domain/entities/WrappedInsight";

export function getInsights(stats: AniListStats): WrappedInsight {
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
