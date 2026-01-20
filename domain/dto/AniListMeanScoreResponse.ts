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
        title: {
          userPreferred: string;
        };
        coverImage: {
          large: string;
        };
      };
    }[];
  };
}
