"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { WrappedResult } from "@/domain/entities/WrappedResult";
import { mapWrappedToDashboard } from "@/presentation/mappers/mapWrappedToDashboard";
import { WrappedExportButton } from "@/presentation/components/wrapped-dashboard/WrappedExportButton";
import { WrappedHeader } from "@/presentation/components/wrapped-dashboard/WrappedHeader";
import { WrappedActivityStat } from "@/presentation/components/wrapped-dashboard/WrappedActivityStat";
import { WrappedDailyActivity } from "@/presentation/components/wrapped-dashboard/WrappedDailyActivity";
import { WrappedMonthlyChart } from "@/presentation/components/wrapped-dashboard/WrappedMonthlyChart";
import { WrappedTopTagsAndGenres } from "@/presentation/components/wrapped-dashboard/WrappedTopTagsAndGenres";
import { WrappedTopList } from "@/presentation/components/wrapped-dashboard/WrappedTopList";
import { WrappedTopWidget } from "../components/wrapped-dashboard/WrappedTopWidget";
import { CardBox } from "@/presentation/components/ui/CardBox";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

interface DashboardProps {
  data: WrappedResult;
  year: number;
}

export function WrappedDashboard({ data, year }: DashboardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const exportImage = async () => {
    if (!ref.current) return;
    try {
      const url = await toPng(ref.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#0b1220",
      });

      const a = document.createElement("a");
      a.href = url;
      a.download = "anilist-wrapped.png";
      a.click();
    } catch (err) {
      console.error("Failed to export image:", err);
    }
  };

  const dashboard = mapWrappedToDashboard(data);

  return (
    <div className='space-y-4'>
      {/* EXPORT BUTTON */}
      <WrappedExportButton onClick={exportImage} />

      {/* DASHBOARD WRAPPER */}
      <div
        ref={ref}
        className='relative w-full max-w-300 aspect-4/3 rounded-3xl p-6 bg-linear-to-br from-[#0b1220] via-[#0e1628] to-[#0b1220]'
      >
        {/* HEADER */}
        <WrappedHeader user={dashboard.user} year={year} />

        {/* TOP WIDGET */}
        <WrappedTopWidget
          totalAnimeTitles={dashboard.anime.totalTitles}
          totalMangaTitles={dashboard.manga.totalTitles}
          animeStats={dashboard.anime.stats}
          mangaStats={dashboard.manga.stats}
        />

        {/* BOTTOM WIDGET */}
        <div className='flex justify-center pt-6'>
          <div className='flex items-end gap-6.25'>
            <div className='flex flex-col gap-7.5 w-[540.83px]'>
              <div className='flex flex-row gap-[25.33px] w-full h-[268.39px]'>
                <WrappedActivityStat stats={dashboard.activity.stats} />
                <div className='flex-1'>
                  <WrappedDailyActivity activity={dashboard.activity.daily} />
                </div>
              </div>

              <CardBox className='w-full h-[265.79px] px-9 py-6.25 flex flex-col gap-8.25'>
                <SectionHeader title='Monthly Activity' />
                <div className='flex-1'>
                  <WrappedMonthlyChart data={dashboard.activity.monthly} />
                </div>
              </CardBox>
              <WrappedTopTagsAndGenres
                tags={dashboard.discovery.topTags}
                genres={dashboard.discovery.topGenres}
              />
            </div>

            <div className='flex flex-col gap-7.5 w-[476.35px]'>
              <WrappedTopList
                title='Top Anime'
                items={dashboard.anime.topList}
              />
              <WrappedTopList
                title='Top Manga'
                items={dashboard.manga.topList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
