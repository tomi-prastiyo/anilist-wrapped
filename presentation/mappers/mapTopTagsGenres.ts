import { WrappedResult } from "@/domain/entities/WrappedResult";
import { TopTagsGenres } from "../models/TopTagsGenres";

export function mapTopTagsGenres(result: WrappedResult): TopTagsGenres {
  return {
    tags: result.topTags.map((t) => ({
      id: t.name,
      label: t.name,
    })),
    genres: result.topGenres.map((g) => ({
      name: g.name,
      value: g.value,
    })),
  };
}
