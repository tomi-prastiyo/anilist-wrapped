export interface AniListStats {
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

  animeIds: number[];
  mangaIds: number[];
  animeAndMangaIds: number[];

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
  // entries: AniListEntry[];

  // episodes: number;
  // completed: number;
  // paused: number;
  // dropped: number;

  // meanScore: number;

  // monthly: number[];
  // daysActive: number;
  // episodesPerDay: number;

  // topGenres: {
  //   name: string;
  //   value: number;
  // }[];

  // topTags: {
  //   name: string;
  //   value: number;
  // }[];

  // firstEntry: AniListEntry | null;
  // lastEntry: AniListEntry | null;
}
