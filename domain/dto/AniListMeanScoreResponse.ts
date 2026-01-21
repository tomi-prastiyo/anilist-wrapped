export interface AniListMeanScoreResponse {
  Page: {
    pageInfo: {
      total: number;
      perPage: number;
      currentPage: number;
      lastPage: number;
      hasNextPage: boolean;
    };
    mediaList?: {
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
    }[];
  };
}
