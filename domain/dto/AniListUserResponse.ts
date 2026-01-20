export interface AniListUserResponse {
  User: {
    id: number;
    name: string;
    avatar: {
      large: string;
    };
    bannerImage: string | null;
    createdAt: number;
  };
}
