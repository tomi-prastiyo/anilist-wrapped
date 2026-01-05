import { AniListEntry } from "../entities/AniListEntry";

export interface AniListUser {
  name: string;
  avatar: string;
  banner: string | null;
  createdAt: number;
}

export interface AniListRepository {
  getUser(username: string): Promise<AniListUser>;

  getAnimeEntries(username: string): Promise<AniListEntry[]>;

  getMangaEntries(username: string): Promise<AniListEntry[]>;
}
