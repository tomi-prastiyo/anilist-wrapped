import {
  AniListRepository,
  AniListUser,
} from "@/domain/repositories/AniListRepository";
import { aniListRequest } from "./AniListClient";
import { USER_QUERY, ACTIVITY_QUERY, MEAN_SCORE_QUERY } from "./AniListQueries";
import { AniListUserResponse } from "@/domain/dto/AniListUserResponse";
import { getYearRange } from "@/shared/utils/utils";
import { AniListActivityResponse } from "@/domain/dto/AniListActivityResponse";
import { AniListActivity } from "@/domain/entities/AniListActivity";
import { AniListMediaList } from "@/domain/entities/AniListMediaList";
import { AniListMediaListResponse } from "@/domain/dto/AniListMediaListResponse";

type ActivityVariables = {
  userId: number;
  type: "MEDIA_LIST";
  page: number;
  createdAtGreater: number;
  createdAtLesser: number;
};

type MeanScoreVariables = {
  userId: number;
  mediaIdIn: number[];
  page: number;
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
      id: user.id,
      name: user.name,
      avatar: user.avatar?.large ?? "",
      banner: user.bannerImage ?? null,
      createdAt: user.createdAt,
    };
  }

  async getActivitiesByYear(
    userId: number,
    year: number,
  ): Promise<AniListActivity[]> {
    const { start, end } = getYearRange(year);

    let page = 1;
    let hasNextPage = true;
    const results: AniListActivity[] = [];

    while (hasNextPage) {
      const data = await aniListRequest<
        AniListActivityResponse,
        ActivityVariables
      >(ACTIVITY_QUERY, {
        userId: userId,
        type: "MEDIA_LIST",
        page,
        createdAtGreater: start,
        createdAtLesser: end,
      });

      const activities = data.Page.activities ?? [];

      if (activities.length === 0) break;

      results.push(
        ...activities.map((a) => ({
          type: a.type,
          status: a.status,
          progress: a.progress,
          media: a.media,
          likes: a.likes,
          createdAt: a.createdAt,
        })),
      );

      hasNextPage = data.Page.pageInfo.hasNextPage;
      page++;

      if (hasNextPage) {
        await new Promise((res) => setTimeout(res, 300));
      }
    }

    return results;
  }

  async getMeanScoreAndTopMedia(
    userId: number,
    mediaIds: number[],
  ): Promise<{
    meanScore: number;
    topMedia: AniListMediaList[];
  }> {
    let page = 1;
    let hasNextPage = true;
    const scores: number[] = [];
    const mediaMap = new Map<number, AniListMediaList>();

    while (hasNextPage) {
      const data = await aniListRequest<
        AniListMediaListResponse,
        MeanScoreVariables
      >(MEAN_SCORE_QUERY, {
        userId,
        mediaIdIn: [...mediaIds],
        page,
      });

      const mediaLists = data.Page.mediaList ?? [];

      if (mediaLists.length === 0) break;

      for (const item of mediaLists) {
        if (typeof item.score === "number" && item.score > 0) {
          scores.push(item.score);
        }

        if (
          item.media &&
          (item.status === "CURRENT" ||
            item.status === "COMPLETED" ||
            item.status === "REPEATING")
        ) {
          mediaMap.set(item.media.id, {
            score: item.score,
            media: item.media,
          });
        }
      }

      hasNextPage = data.Page.pageInfo.hasNextPage;
      page++;

      if (hasNextPage) {
        await new Promise((res) => setTimeout(res, 300));
      }
    }

    // ===== MEAN SCORE =====
    const meanScore =
      scores.length === 0
        ? 0
        : Number(
            (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2),
          );

    // ===== TOP 5 MEDIA =====
    const topMedia = [...mediaMap.values()]
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .slice(0, 5);

    return {
      meanScore,
      topMedia,
    };
  }

  async getTopTagsAndTopGenresByAnimeAndMangaIds(
    userId: number,
    mediaIds: number[],
  ): Promise<{
    topTags: { name: string; count: number }[];
    topGenres: { name: string; count: number }[];
  }> {
    let page = 1;
    let hasNextPage = true;
    const tagCount = new Map<string, number>();
    const genreCount = new Map<string, number>();

    while (hasNextPage) {
      const data = await aniListRequest<
        AniListMediaListResponse,
        MeanScoreVariables
      >(MEAN_SCORE_QUERY, {
        userId,
        mediaIdIn: [...mediaIds],
        page,
      });

      const mediaLists = data.Page.mediaList ?? [];

      if (mediaLists.length === 0) break;

      for (const item of mediaLists) {
        const media = item.media;
        if (!media) continue;

        // ===== GENRES =====
        media.genres?.forEach((genre: string) => {
          genreCount.set(genre, (genreCount.get(genre) || 0) + 1);
        });

        // ===== TAGS =====
        media.tags?.forEach((tag: { name: string }) => {
          tagCount.set(tag.name, (tagCount.get(tag.name) || 0) + 1);
        });
      }

      hasNextPage = data.Page.pageInfo.hasNextPage;
      page++;

      if (hasNextPage) {
        await new Promise((res) => setTimeout(res, 300));
      }
    }

    // ===== TOP 5 TAGS =====
    const topTags = [...tagCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // ===== TOP 6 GENRES (RADAR) =====
    const topGenres = [...genreCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));

    return {
      topTags,
      topGenres,
    };
  }
}
