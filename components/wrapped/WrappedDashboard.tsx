"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";

import { SectionCard } from "./SectionCard";
import { MonthlyChart } from "./MonthlyChart";
import { GenreRadar } from "./GenreRadar";
import { TopGrid } from "./TopGrid";
import { TopTags } from "./TopTags";
import { StatRow } from "./StatRow";
import { BigMetric } from "./BigMetric";

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
      {/* EXPORT BUTTON */}
      <div className='flex justify-end'>
        <button
          onClick={exportImage}
          className='px-4 py-2 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600'
        >
          Export Image
        </button>
      </div>

      {/* DASHBOARD WRAPPER */}
      <div
        ref={ref}
        className='w-full max-w-[1200px] mx-auto rounded-3xl p-6 grid grid-cols-12 gap-4
        bg-gradient-to-br from-[#0b1220] via-[#0e1628] to-[#0b1220]'
      >
        {/* HEADER */}
        <div className='relative col-span-12'>
          <header
            className='w-full h-96 relative bg-cover bg-center flex items-end rounded-t-2xl'
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, #0b1622 100%), url(${data.user.banner})`,
            }}
          >
            <div className='relative z-10 flex justify-between items-end w-full max-w-7xl mx-auto p-6 md:p-10'>
              <div>
                <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight'>
                  YOUR <br />
                  <span className='bg-gradient-to-r from-[#3db4f2] to-[#c063ff] bg-clip-text text-transparent'>
                    {year}
                  </span>
                </h1>
                <p className='text-gray-300 text-lg mt-2 font-medium'>
                  AniList Wrapped
                </p>
              </div>
            </div>

            <div className='absolute right-6 md:right-10 bottom-0 translate-y-1/2 flex items-center gap-3 md:gap-4'>
              <div className='text-right hidden md:block'>
                <h2 className='text-2xl font-bold text-white'>
                  {data.user.name}
                </h2>
                <p className='text-sm text-gray-400'>
                  Member since {data.user.memberSince}
                </p>
              </div>
              <div className='w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-[#1A2130] overflow-hidden shadow-lg'>
                <img
                  src={data.user.avatar}
                  alt='User Avatar'
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </header>
          <div className='h-12 md:h-16'></div>
        </div>

        {/* ANIME & MANGA TOTALS */}
        <div className='col-span-12'>
          <div className='max-w-6xl mx-auto w-full'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-5'>
              {/* LEFT: Total Anime / Manga */}
              <div className='lg:col-span-5'>
                <div className='grid grid-cols-2 gap-4 h-full'>
                  {/* Total Anime Watched */}
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #9810FA 0%, #E60076 100%)",
                    }}
                    className='rounded-2xl p-6 shadow-xl transform transition hover:scale-105 flex flex-col justify-center items-start h-full'
                  >
                    <p className='text-[11px] font-bold tracking-widest text-white/80 uppercase mb-2 text-left'>
                      Total Anime Watched
                    </p>
                    <h3 className='text-5xl font-extrabold text-white leading-none text-left'>
                      {data.anime.completed.toLocaleString()}
                    </h3>
                    <p className='text-white/90 font-semibold text-sm mt-1 text-left'>
                      titles
                    </p>
                  </div>

                  {/* Total Manga Read */}
                  <div
                    style={{
                      background:
                        "linear-gradient(313.56deg, #F54900 2.08%, #D08700 97.82%)",
                    }}
                    className='rounded-2xl p-6 shadow-xl transform transition hover:scale-105 flex flex-col justify-center items-start h-full'
                  >
                    <p className='text-[11px] font-bold tracking-widest text-white/80 uppercase mb-2 text-left'>
                      Total Manga Read
                    </p>
                    <h3 className='text-5xl font-extrabold text-white leading-none text-left'>
                      {data.manga.completed.toLocaleString()}
                    </h3>
                    <p className='text-white/90 font-semibold text-sm mt-1 text-left'>
                      titles
                    </p>
                  </div>
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
                      <div
                        key={i}
                        style={{
                          background: "#271932",
                          borderColor: "#40225C",
                        }}
                        className='border rounded-2xl p-3 shadow-lg hover:scale-105 transition text-center'
                      >
                        <div className='text-xl font-bold text-white mb-1'>
                          {stat.value}
                        </div>
                        <div className='text-[8px] text-gray-400 uppercase tracking-wide font-semibold'>
                          {stat.label}
                        </div>
                      </div>
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
                      <div
                        key={i}
                        style={{
                          background: "#2B231D",
                          borderColor: "#562C17",
                        }}
                        className='border rounded-2xl p-3 shadow-lg hover:scale-105 transition text-center'
                      >
                        <div className='text-xl font-bold text-white mb-1'>
                          {stat.value}
                        </div>
                        <div className='text-[8px] text-gray-400 uppercase tracking-wide font-semibold'>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
