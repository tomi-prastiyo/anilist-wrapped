import { UserWrappedData } from "@/types/wrapped.types";

export const mockUserData: UserWrappedData = {
  username: "Guitahero",
  memberSince: "2017",
  avatarUrl:
    "https://s4.anilist.co/file/anilistcdn/user/avatar/large/b6550560-wmB6Zlrpifbn.jpg",
  bannerUrl:
    "https://s4.anilist.co/file/anilistcdn/user/banner/b6550560-OeLekp7dpnpQ.jpg",
  totalAnime: 150,
  totalManga: 17,
  daysActive: 253,
  totalDays: 366,
  mostActiveDay: "May 11",
  listActivity: 12,
  statusPost: 12,
  episodesPerDay: 4.94,
  chaptersPerDay: 1.23,
  activityPerDay: 2.26,
  animeStats: {
    episodes: 1808,
    completed: 120,
    paused: 0,
    dropped: 0,
    meanScore: 89.0,
  },
  mangaStats: {
    chapters: 1808,
    completed: 120,
    paused: 0,
    dropped: 0,
    meanScore: 89.0,
  },
  topTags: ["Romance", "Action", "Yuri", "Female Protag", "Magic"],
  monthlyActivity: [45, 52, 38, 65, 82, 58, 70, 88, 78, 95, 68, 85],
  genreData: [90, 70, 85, 60, 80, 75],
  topAnime: [
    {
      title: "Yuuki Yuuna Wa Yuusha De aru",
      year: 2014,
      type: "TV Series",
      coverUrl:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx104198-bT8qBPJWxtiY.jpg",
    },
    ...Array(4).fill({
      title: "",
      year: 2014,
      type: "",
      coverUrl:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx104198-bT8qBPJWxtiY.jpg",
    }),
  ],
  topManga: [
    {
      title: "Komi-san wa, Comyushou desu.",
      year: 2014,
      type: "Manga",
      coverUrl:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20517-SNNUtav2knou.jpg",
    },
    ...Array(4).fill({
      title: "",
      year: 2014,
      type: "",
      coverUrl:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20517-SNNUtav2knou.jpg",
    }),
  ],
};
