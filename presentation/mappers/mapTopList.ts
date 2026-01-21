import { TopList } from "../models/TopList";
import { AniListMediaList } from "@/domain/entities/AniListMediaList";

export function mapTopList(
  title: string,
  entries: AniListMediaList[],
): TopList {
  return {
    title,
    items: entries.map((e, idx) => ({
      id: e.media?.id || 0,
      title: e.media?.title.userPreferred || "",
      image: e.media?.coverImage.large || "",
      seasonYear: e.media?.seasonYear || 0,
      format: e.media?.format || "",
      rank: idx + 1,
    })),
  };
}
