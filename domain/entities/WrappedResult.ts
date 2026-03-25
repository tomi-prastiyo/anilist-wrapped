import { WrappedUser } from "./WrappedUser";
import { AniListMediaList } from "./AniListMediaList";
import { AniListStats } from "./AniListStats";

export interface WrappedResult {
  user: WrappedUser;
  stats: AniListStats;

  topGenres: {
    name: string;
    count: number;
  }[];

  topTags: {
    name: string;
    count: number;
  }[];

  topAnime: AniListMediaList[];
  topManga: AniListMediaList[];
}
