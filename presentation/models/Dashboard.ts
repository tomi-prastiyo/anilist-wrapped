import { TopList } from "./TopList";
import { User } from "./User";

export interface Dashboard {
  user: User;

  totalAnimeTitles: number;
  totalMangaTitles: number;

  totalAnimeEpisodes: number;
  totalAnimeCompleted: number;
  totalAnimePaused: number;
  totalAnimeDropped: number;
  totalAnimeMeanScore: number;

  totalMangaChapters: number;
  totalMangaCompleted: number;
  totalMangaPaused: number;
  totalMangaDropped: number;
  totalMangaMeanScore: number;

  daysActive: string;
  mostActiveDay: string;
  listActivity: number;
  bestBuddy: string;

  episodePerDay: number;
  chapterPerDay: number;
  activityPerDay: number;

  monthlyActivity: {
    month: string;
    count: number;
  }[];

  topGenres: {
    name: string;
    count: number;
  }[];

  topTags: {
    name: string;
    count: number;
  }[];

  topAnime: TopList[];
  topManga: TopList[];
}
