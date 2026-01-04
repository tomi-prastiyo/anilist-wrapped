"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { ExportButton } from "./ExportButton";
import { Header } from "./Header";
import { StatCard } from "./StatCard";
import { SmallStatCard } from "./SmallStatCard";
import { TopList } from "./TopList";
import { MonthlyChart } from "./MonthlyChart";
import { TopTagsAndGenres } from "./TopTagsAndGenres";
import { DailyActivityCard, DailyActivityChart } from "./DailyActivityCard";
import { ActivityStats } from "./ActivityStatCard";

export function WrappedDashboard({ data, year }: { data: any; year: number }) {
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
      <ExportButton onClick={exportImage} />

      {/* DASHBOARD WRAPPER */}
      <div
        ref={ref}
        className='w-full max-w-[1200px] mx-auto rounded-3xl p-6 grid grid-cols-12 gap-4
        bg-gradient-to-br from-[#0b1220] via-[#0e1628] to-[#0b1220]'
      >
        {/* HEADER */}
        <div className='relative col-span-12'>
          <Header user={data.user} year={year} />
          <div className='h-12 md:h-16'></div>
        </div>

        {/* ANIME & MANGA TOTALS */}
        <div className='col-span-12'>
          <div className='max-w-6xl mx-auto w-full'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-5'>
              {/* LEFT: Total Anime / Manga */}
              <div className='lg:col-span-5'>
                <div className='grid grid-cols-2 gap-4 h-full'>
                  <StatCard
                    title='Total Anime Watched'
                    value={data.anime.completed}
                    subtitle='titles'
                    gradient='linear-gradient(135deg, #9810FA 0%, #E60076 100%)'
                  />
                  <StatCard
                    title='Total Manga Read'
                    value={data.manga.completed}
                    subtitle='titles'
                    gradient='linear-gradient(313.56deg, #F54900 2.08%, #D08700 97.82%)'
                  />
                </div>
              </div>

              {/* RIGHT: Anime & Manga Stats */}
              <div className='lg:col-span-7 flex flex-col justify-between h-full space-y-5'>
                {/* Anime Stats */}
                <div className='space-y-2'>
                  <div className='flex items-center gap-2 pl-1'>
                    <div className='w-1 h-4 bg-purple-500 rounded-full'></div>
                    <h4 className='text-[10px] font-bold tracking-widest text-gray-400 uppercase'>
                      Anime Stats
                    </h4>
                  </div>
                  <div className='grid grid-cols-5 gap-3'>
                    {[
                      {
                        label: "Episodes",
                        value: data.anime.episodes.toLocaleString(),
                      },
                      {
                        label: "Completed",
                        value: data.anime.completed.toLocaleString(),
                      },
                      {
                        label: "Mean Score",
                        value: data.anime.meanScore.toFixed(1),
                      },
                      { label: "Paused", value: data.anime.paused },
                      { label: "Drop", value: data.anime.dropped },
                    ].map((stat, i) => (
                      <SmallStatCard
                        key={i}
                        label={stat.label}
                        value={stat.value}
                      />
                    ))}
                  </div>
                </div>

                {/* Manga Stats */}
                <div className='space-y-2'>
                  <div className='flex items-center gap-2 pl-1'>
                    <div className='w-1 h-4 bg-orange-500 rounded-full'></div>
                    <h4 className='text-[10px] font-bold tracking-widest text-gray-400 uppercase'>
                      Manga Stats
                    </h4>
                  </div>
                  <div className='grid grid-cols-5 gap-3'>
                    {[
                      {
                        label: "Chapters",
                        value: data.manga.episodes.toLocaleString(),
                      },
                      {
                        label: "Completed",
                        value: data.manga.completed.toLocaleString(),
                      },
                      {
                        label: "Mean Score",
                        value: data.manga.meanScore.toFixed(1),
                      },
                      { label: "Paused", value: data.manga.paused },
                      { label: "Drop", value: data.manga.dropped },
                    ].map((stat, i) => (
                      <SmallStatCard
                        key={i}
                        label={stat.label}
                        value={stat.value}
                        bgColor='#2B231D'
                        borderColor='#562C17'
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='col-span-12'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
            <div className='lg:col-span-5 space-y-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <ActivityStats
                  stats={[
                    {
                      label: "Days Active",
                      value: `${data.activity.daysActive}/366`,
                    },
                    {
                      label: "Most Active Day",
                      value: data.activity.mostActiveMonth,
                    },
                    {
                      label: "List Activity",
                      value: data.activity.listActivity,
                    },
                    { label: "Status Post", value: data.activity.listActivity }, // bisa diganti kalau beda
                  ]}
                />

                <DailyActivityCard data={data} />
              </div>

              <div className='card-bg rounded-2xl p-6'>
                <div className='flex items-center gap-2 mb-6'>
                  <div className='w-1 h-4 bg-white rounded-full'></div>
                  <h4 className='text-sm font-bold text-gray-200'>
                    Monthly Activity
                  </h4>
                </div>

                <div className='h-48 w-full'>
                  <MonthlyChart data={data.anime.monthly} color='#ec4899' />
                </div>
              </div>
              <TopTagsAndGenres
                topTags={data.topTags}
                topGenres={data.topGenres}
              />
            </div>

            <div className='lg:col-span-7 space-y-6'>
              <div className='space-y-4'>
                <TopList
                  title='Top Anime'
                  items={data.anime.entries.slice(0, 5)}
                />
                <TopList
                  title='Top Manga'
                  items={data.manga.entries.slice(0, 5)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
