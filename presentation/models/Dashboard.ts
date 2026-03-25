import { TopList } from "./TopList";
import { User } from "./User";

export interface MediaStats {
  totalEpisodes?: number;
  totalChapters?: number;
  totalCompleted: number;
  totalPaused: number;
  totalDropped: number;
  meanScore: number;
}

export interface DailyActivity {
  episodePerDay: number;
  chapterPerDay: number;
  activityPerDay: number;
}

export interface ActivityStat {
  id: string;
  label: string;
  value: string | number;
}

export interface MonthlyData {
  month: string;
  count: number;
}

export interface TagOrGenre {
  name: string;
  count: number;
}

export interface Dashboard {
  user: User;

  anime: {
    totalTitles: number;
    stats: MediaStats;
    topList: TopList[];
  };

  manga: {
    totalTitles: number;
    stats: MediaStats;
    topList: TopList[];
  };

  activity: {
    stats: ActivityStat[];
    daily: DailyActivity;
    monthly: MonthlyData[];
  };

  discovery: {
    topTags: TagOrGenre[];
    topGenres: TagOrGenre[];
  };
}
