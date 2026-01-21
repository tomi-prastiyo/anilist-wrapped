import { AniListActivity } from "../entities/AniListActivity";
import { AniListMediaList } from "../entities/AniListMediaList";

export interface AniListUser {
  id: number;
  name: string;
  avatar: string;
  banner: string | null;
  createdAt: number;
}

export interface AniListRepository {
  getUser(username: string): Promise<AniListUser>;

  getActivitiesByYear(userId: number, year: number): Promise<AniListActivity[]>;

  getMeanScoreAndTopAnimeByAnimeOrMangaIds(
    userId: number,
    mediaIds: number[],
  ): Promise<{
    meanScore: number;
    topAnime: AniListMediaList[];
  }>;

  getTopTagsAndTopGenresByAnimeAndMangaIds(
    userId: number,
    mediaIds: number[],
  ): Promise<{
    topTags: { name: string; count: number }[];
    topGenres: { name: string; count: number }[];
  }>;
}
