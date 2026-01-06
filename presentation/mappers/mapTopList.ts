import { AniListEntry } from "@/domain/entities/AniListEntry";
import { TopList } from "../models/TopList";

export function mapTopList(title: string, entries: AniListEntry[]): TopList {
  return {
    title,
    items: entries.map((e, idx) => ({
      id: e.media.id,
      title: e.media.title.romaji,
      image: e.media.coverImage.large,
      rank: idx + 1,
    })),
  };
}
