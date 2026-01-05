export interface AniListItem {
  status: string;
  progress: number;
  score: number;
  completedAt?: {
    year?: number | null;
    month?: number | null;
    day?: number | null;
  };
  media: {
    id: number;
    title: {
      romaji: string;
    };
    coverImage: {
      large: string;
    };
    genres: string[];
    tags: {
      name: string;
    }[];
  };
}
