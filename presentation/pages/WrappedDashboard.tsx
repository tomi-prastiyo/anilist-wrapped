"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { WrappedResult } from "@/domain/entities/WrappedResult";
import { mapWrappedToDashboard } from "@/presentation/mappers/mapWrappedToDashboard";
import { WrappedExportButton } from "@/presentation/components/wrapped-dashboard/WrappedExportButton";
import { WrappedHeader } from "@/presentation/components/wrapped-dashboard/WrappedHeader";
import { WrappedActivityStat } from "@/presentation/components/wrapped-dashboard/WrappedActivityStat";
import { DailyActivityCard } from "@/presentation/components/wrapped-dashboard/WrappedDailyActivity";
import { WrappedMonthlyChart } from "@/presentation/components/wrapped-dashboard/WrappedMonthlyChart";
import { WrappedTopTagsAndGenres } from "@/presentation/components/wrapped-dashboard/WrappedTopTagsAndGenres";
import { WrappedTopList } from "@/presentation/components/wrapped-dashboard/WrappedTopList";
import { WrappedTopWidget } from "../components/wrapped-dashboard/WrappedTopWidget";

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
        backgroundColor: "#0b1220", // agar gradient/tampilan tidak hilang
      });

      const a = document.createElement("a");
      a.href = url;
      a.download = "anilist-wrapped.png";
      a.click();
    } catch (err) {
      console.error("Failed to export image:", err);
    }
  };

  const wrappedData = mapWrappedToDashboard(data);

  return (
    <div className='space-y-4'>
      <style>
        {`
          body {
            font-family: "Overpass", sans-serif;
            background-color: #0b1622;
            color: #edf1f5;
            min-height: 100vh;
          }

          .card-bg {
            background-color: #151f2e;
          }

          .gradient-text {
            background: linear-gradient(to right, #3db4f2, #c063ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #0b1622;
          }
          ::-webkit-scrollbar-thumb {
            background: #3db4f2;
            border-radius: 4px;
          }
        `}
      </style>
      {/* EXPORT BUTTON */}
      <WrappedExportButton onClick={exportImage} />

      {/* DASHBOARD WRAPPER */}
      <div
        ref={ref}
        className='relative w-full max-w-300 aspect-4/3 rounded-3xl p-6 bg-linear-to-br from-[#0b1220] via-[#0e1628] to-[#0b1220]'
      >
        {/* HEADER */}
        <WrappedHeader user={wrappedData.user} year={year} />

        {/* TOP WIDGET */}
        <WrappedTopWidget
          totalAnimeWatched={wrappedData.totalAnimeWatched}
          totalMangaRead={wrappedData.totalMangaRead}
          animeStats={wrappedData.animeStats}
          mangaStats={wrappedData.mangaStats}
        />

        {/* BOTTOM WIDGET */}
        <div className='flex justify-center pt-6'>
          <div className='flex items-end gap-6.25'>
            <div className='flex flex-col gap-7.5 w-[540.83px]'>
              <div className='flex flex-row gap-[25.33px] w-full h-[268.39px]'>
                <WrappedActivityStat
                  stats={[
                    {
                      id: "daysActive",
                      label: "Days Active",
                      value: data.activity.daysActive,
                    },
                    {
                      id: "mostActiveMonth",
                      label: "Most Active Day",
                      value: data.activity.mostActiveMonth,
                    },
                    {
                      id: "listActivity",
                      label: "List Activity",
                      value: data.activity.listActivity,
                    },
                    {
                      id: "statusPost",
                      label: "Status Post",
                      value: data.activity.listActivity,
                    },
                  ]}
                />
                <div className='flex-1'>
                  <DailyActivityCard activity={wrappedData.dailyActivity} />
                </div>
              </div>

              <div className='w-full h-[265.79px] bg-[#1C1C27] border border-[#31313B] rounded-3xl px-9 py-6.25 flex flex-col gap-8.25'>
                <div className='flex items-center gap-2.5'>
                  <div className='w-1 h-4 bg-[#E7D3EB] rounded-full' />
                  <h4 className='text-[14px] font-bold text-[#B7A5BB]'>
                    Monthly Activity
                  </h4>
                </div>

                <div className='flex-1'>
                  <WrappedMonthlyChart data={data.anime.monthly} />
                </div>
              </div>
              <WrappedTopTagsAndGenres data={wrappedData.topTagsGenres} />
            </div>

            <div className='flex flex-col gap-7.5 w-[476.35px]'>
              <WrappedTopList
                title={wrappedData.topAnime.title}
                items={wrappedData.topAnime.items}
              />
              <WrappedTopList
                title={wrappedData.topManga.title}
                items={wrappedData.topManga.items}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
