import { DailyActivity } from "./DailyActivity";
import { Stat } from "./Stat";
import { TopList } from "./TopList";
import { TopTagsGenres } from "./TopTagsGenres";
import { User } from "./User";

export interface Dashboard {
  user: User;

  // totalAnimeWatched: number;
  // totalMangaRead: number;

  // animeStats: Stat[];
  // mangaStats: Stat[];

  // dailyActivity: DailyActivity;
  // monthly: number[];

  // topAnime: TopList;
  // topManga: TopList;

  // topTagsGenres: TopTagsGenres;
}
