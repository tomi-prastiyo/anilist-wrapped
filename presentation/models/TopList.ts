export interface TopList {
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
    startDate: {
      year: number;
    };
  };
  status?: string;
}
