export interface AniListActivity {
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
}
