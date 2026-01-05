import { AniListStats } from "./AniListStats";
import { AniListEntry } from "./AniListEntry";
import { WrappedUser } from "./WrappedUser";
import { WrappedActivity } from "./WrappedActivity";
import { WrappedInsight } from "./WrappedInsight";
import { WrappedPercentile } from "./WrappedPercentile";

export interface WrappedResult {
  user: WrappedUser;

  anime: AniListStats;
  manga: AniListStats;

  activity: WrappedActivity;

  monthly: number[];

  topGenres: {
    name: string;
    value: number;
  }[];

  topTags: {
    name: string;
    value: number;
  }[];

  topAnime: AniListEntry[];

  firstAnime: AniListEntry | null;
  lastAnime: AniListEntry | null;

  percentile: WrappedPercentile;
  insight: WrappedInsight;
}
