export interface AniListMediaList {
  score?: number;
  media?: {
    id: number;
    title: {
      userPreferred: string;
    };
    coverImage: {
      large: string;
    };
    format: string;
    genres: string[];
    tags: {
      name: string;
    }[];
    seasonYear: number;
  };
}
