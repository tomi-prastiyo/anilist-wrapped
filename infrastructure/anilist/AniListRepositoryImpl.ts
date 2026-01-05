import {
  AniListRepository,
  AniListUser,
} from "@/domain/repositories/AniListRepository";
import { AniListEntry } from "@/domain/entities/AniListEntry";
import { aniListRequest } from "./AniListClient";
import { USER_QUERY, MEDIA_LIST_QUERY } from "./AniListQueries";
import { AniListUserResponse } from "@/domain/dto/AniListUserResponse";
import { AniListMediaListResponse } from "@/domain/dto/AniListMediaListResponse";

type MediaListVariables = {
  name: string;
  type: "ANIME" | "MANGA";
};

export class AniListRepositoryImpl implements AniListRepository {
  async getUser(username: string): Promise<AniListUser> {
    const data = await aniListRequest<AniListUserResponse>(USER_QUERY, {
      name: username,
    });

    const user = data.User;

    if (!user) {
      throw new Error("AniList user not found");
    }

    return {
      name: user.name,
      avatar: user.avatar?.large ?? "",
      banner: user.bannerImage ?? null,
      createdAt: user.createdAt,
    };
  }

  async getAnimeEntries(username: string): Promise<AniListEntry[]> {
    return this.fetchMedia(username, "ANIME");
  }

  async getMangaEntries(username: string): Promise<AniListEntry[]> {
    return this.fetchMedia(username, "MANGA");
  }

  private async fetchMedia(
    username: string,
    type: "ANIME" | "MANGA"
  ): Promise<AniListEntry[]> {
    const data = await aniListRequest<
      AniListMediaListResponse,
      MediaListVariables
    >(MEDIA_LIST_QUERY, {
      name: username,
      type,
    });

    const lists = data.MediaListCollection?.lists ?? [];

    return lists.flatMap((list) =>
      (list.entries ?? []).map((entry) => ({
        status: entry.status,
        progress: entry.progress,
        score: entry.score,
        completedAt: entry.completedAt,
        media: {
          id: entry.media.id,
          title: {
            romaji: entry.media.title.romaji,
          },
          coverImage: {
            large: entry.media.coverImage.large,
          },
          genres: entry.media.genres,
          tags: entry.media.tags.map((t) => ({
            name: t.name,
          })),
        },
      }))
    );
  }
}
