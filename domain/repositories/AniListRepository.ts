import { AniListActivity } from "../entities/AniListActivity";
import { AniListEntry } from "../entities/AniListEntry";

export interface AniListUser {
  id: number;
  name: string;
  avatar: string;
  banner: string | null;
  createdAt: number;
}

export interface AniListRepository {
  getUser(username: string): Promise<AniListUser>;

  getAnimeEntries(username: string): Promise<AniListEntry[]>;

  getMangaEntries(username: string): Promise<AniListEntry[]>;

  getAllActivitiesByYear(
    userId: number,
    year: number,
  ): Promise<AniListActivity[]>;

  getMeanScoreByAnimeOrMangaIds(
    userId: number,
    mediaIds: number[],
  ): Promise<{
    meanScore: number;
  }>;
}
