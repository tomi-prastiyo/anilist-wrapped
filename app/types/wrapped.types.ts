export interface AnimeStats {
  episodes: number;
  completed: number;
  paused: number;
  dropped: number;
  meanScore: number;
}

export interface MangaStats {
  chapters: number;
  completed: number;
  paused: number;
  dropped: number;
  meanScore: number;
}

export interface MediaItem {
  title: string;
  year: number;
  type: string;
  coverUrl: string;
}

export interface UserWrappedData {
  username: string;
  memberSince: string;
  avatarUrl: string;
  bannerUrl: string;
  totalAnime: number;
  totalManga: number;
  daysActive: number;
  totalDays: number;
  mostActiveDay: string;
  listActivity: number;
  statusPost: number;
  episodesPerDay: number;
  chaptersPerDay: number;
  activityPerDay: number;
  animeStats: AnimeStats;
  mangaStats: MangaStats;
  topTags: string[];
  monthlyActivity: number[];
  genreData: number[];
  topAnime: MediaItem[];
  topManga: MediaItem[];
}
