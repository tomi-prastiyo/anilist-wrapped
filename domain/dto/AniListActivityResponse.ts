export interface AniListActivityResponse {
  Page: {
    pageInfo: {
      total: number;
      perPage: number;
      currentPage: number;
      lastPage: number;
      hasNextPage: boolean;
    };
    activities?: {
      type?: string;
      status?: string;
      progress?: string;
      media?: {
        id: number;
        title: {
          userPreferred: string;
        };
        coverImage: {
          large: string;
        };
      };
      likes?: {
        name: string;
      }[];
      createdAt: number;
    }[];
  };
}
