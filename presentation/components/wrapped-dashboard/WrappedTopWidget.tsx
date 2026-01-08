import { Stat } from "@/presentation/models/Stat";
import { WrappedStat } from "./WrappedStat";
import { WrappedStatSection } from "./WrappedStatSection";

interface TopWidgetProps {
  totalAnimeWatched: number;
  totalMangaRead: number;
  animeStats: Stat[];
  mangaStats: Stat[];
}

export const WrappedTopWidget = ({
  totalAnimeWatched,
  totalMangaRead,
  animeStats,
  mangaStats,
}: TopWidgetProps) => {
  return (
    <div className='flex justify-center pt-6'>
      <div className='flex items-end gap-4.75 w-260 h-64.5'>
        {/* LEFT */}
        <div className='flex gap-6.25 w-136.5 h-64.5'>
          <WrappedStat
            title='TOTAL ANIME WATCHED'
            value={totalAnimeWatched}
            subtitle='titles'
            gradient='linear-gradient(135deg, #9810FA 0%, #E60076 100%)'
          />
          <WrappedStat
            title='TOTAL MANGA READ'
            value={totalMangaRead}
            subtitle='titles'
            gradient='linear-gradient(313.56deg, #F54900 2.08%, #D08700 97.82%)'
          />
        </div>

        {/* RIGHT */}
        <div className='flex flex-col gap-6.5 w-118.75 h-59'>
          <WrappedStatSection
            title='Anime Stats'
            accentGradient='linear-gradient(180deg, #C27AFF 0%, #FB64B6 100%)'
            stats={animeStats}
          />

          <WrappedStatSection
            title='Manga Stats'
            accentColor='#FBAB73'
            titleColor='#FBAB73'
            bgColor='#2B231D'
            borderColor='#562C17'
            stats={mangaStats}
          />
        </div>
      </div>
    </div>
  );
};
