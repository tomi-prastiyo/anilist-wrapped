export interface AniListMediaListResponse {
  MediaListCollection?: {
    lists?: {
      entries?: AniListMediaEntryDto[];
    }[];
  };
}

export interface AniListMediaEntryDto {
  status: string;
  progress: number;
  score: number;
  completedAt?: {
    year?: number;
    month?: number;
    day?: number;
  };
  media: {
    id: number;
    title: { romaji: string };
    coverImage: { large: string };
    genres: string[];
    tags: { name: string }[];
  };
}
