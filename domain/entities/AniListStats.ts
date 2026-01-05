import { AniListEntry } from "./AniListEntry";

export interface AniListStats {
  entries: AniListEntry[];

  episodes: number;
  completed: number;
  paused: number;
  dropped: number;

  meanScore: number;

  monthly: number[];
  daysActive: number;
  episodesPerDay: number;

  topGenres: {
    name: string;
    value: number;
  }[];

  topTags: {
    name: string;
    value: number;
  }[];

  firstEntry: AniListEntry | null;
  lastEntry: AniListEntry | null;
}
