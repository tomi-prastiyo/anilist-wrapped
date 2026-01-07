"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { WrappedResult } from "@/domain/entities/WrappedResult";
import { mapWrappedToDashboard } from "@/presentation/mappers/mapWrappedToDashboard";
import { WrappedExportButton } from "@/presentation/components/wrapped-dashboard/WrappedExportButton";
import { WrappedHeader } from "@/presentation/components/wrapped-dashboard/WrappedHeader";
import { WrappedStat } from "@/presentation/components/wrapped-dashboard/WrappedStat";
import { WrappedActivityStat } from "@/presentation/components/wrapped-dashboard/WrappedActivityStat";
import { DailyActivityCard } from "@/presentation/components/wrapped-dashboard/WrappedDailyActivity";
import { WrappedMonthlyChart } from "@/presentation/components/wrapped-dashboard/WrappedMonthlyChart";
import { WrappedTopTagsAndGenres } from "@/presentation/components/wrapped-dashboard/WrappedTopTagsAndGenres";
import { WrappedTopList } from "@/presentation/components/wrapped-dashboard/WrappedTopList";
import { WrappedStatSection } from "../components/wrapped-dashboard/WrappedStatSection";

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
        className='w-full max-w-300 mx-auto rounded-3xl p-6 bg-linear-to-br from-[#0b1220] via-[#0e1628] to-[#0b1220]'
      >
        {/* HEADER */}
        <WrappedHeader user={wrappedData.user} year={year} />

        {/* TOP WIDGET */}
        <div className='flex justify-center'>
          <div className='flex items-end gap-4.75 w-260 h-64.5'>
            {/* LEFT */}
            <div className='flex gap-6.25 w-136.5 h-64.5'>
              <WrappedStat
                title='TOTAL ANIME WATCHED'
                value={data.anime.completed}
                subtitle='titles'
                gradient='linear-gradient(135deg, #9810FA 0%, #E60076 100%)'
              />
              <WrappedStat
                title='TOTAL MANGA READ'
                value={data.manga.completed}
                subtitle='titles'
                gradient='linear-gradient(313.56deg, #F54900 2.08%, #D08700 97.82%)'
              />
            </div>

            {/* RIGHT */}
            <div className='flex flex-col gap-6.5 w-118.75 h-59'>
              <WrappedStatSection
                title='Anime Stats'
                accentGradient='linear-gradient(180deg, #C27AFF 0%, #FB64B6 100%)'
                stats={[
                  { label: "Episodes", value: data.anime.episodes },
                  { label: "Completed", value: data.anime.completed },
                  { label: "Paused", value: data.anime.paused },
                  { label: "Drop", value: data.anime.dropped },
                  { label: "Mean Score", value: data.anime.meanScore },
                ]}
              />

              <WrappedStatSection
                title='Manga Stats'
                accentColor='#FBAB73'
                titleColor='#FBAB73'
                bgColor='#2B231D'
                borderColor='#562C17'
                stats={[
                  { label: "Chapters", value: data.manga.episodes },
                  { label: "Completed", value: data.manga.completed },
                  { label: "Paused", value: data.manga.paused },
                  { label: "Drop", value: data.manga.dropped },
                  { label: "Mean Score", value: data.manga.meanScore },
                ]}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM WIDGET */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          <div className='lg:col-span-5 space-y-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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

              <DailyActivityCard activity={wrappedData.dailyActivity} />
            </div>

            <div className='card-bg rounded-2xl p-6'>
              <div className='flex items-center gap-2 mb-6'>
                <div className='w-1 h-4 bg-white rounded-full'></div>
                <h4 className='text-sm font-bold text-gray-200'>
                  Monthly Activity
                </h4>
              </div>

              <div className='h-48 w-full'>
                <WrappedMonthlyChart
                  data={data.anime.monthly}
                  color='#ec4899'
                />
              </div>
            </div>
            <WrappedTopTagsAndGenres data={wrappedData.topTagsGenres} />
          </div>

          <div className='lg:col-span-7 space-y-6'>
            <div className='space-y-4'>
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
