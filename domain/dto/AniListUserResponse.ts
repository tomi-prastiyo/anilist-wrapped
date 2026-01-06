export interface AniListUserResponse {
  User: {
    name: string;
    avatar: {
      large: string;
    };
    bannerImage: string | null;
    createdAt: number;
  };
}
