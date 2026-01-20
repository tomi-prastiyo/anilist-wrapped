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
        format: string;
        genres: string[];
        tags: {
          name: string;
        }[];
        seasonYear: number;
      };
      likes?: {
        name: string;
      }[];
      createdAt: number;
    }[];
  };
}
