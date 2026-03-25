export type ActivityType = "ANIME_LIST" | "MANGA_LIST";

export interface AniListActivity {
  type?: ActivityType | string;
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
