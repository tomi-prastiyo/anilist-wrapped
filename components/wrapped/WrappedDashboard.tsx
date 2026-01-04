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
      {/* EXPORT */}
      <div className='flex justify-end'>
        <button
          onClick={exportImage}
          className='px-4 py-2 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600'
        >
          Export Image
        </button>
      </div>

      {/* WRAPPED DASHBOARD */}
      <div
        ref={ref}
        className='w-full max-w-[1200px] mx-auto rounded-3xl p-6 grid grid-cols-12 gap-4
    bg-gradient-to-br from-[#0b1220] via-[#0e1628] to-[#0b1220]'
      >
        {/* HEADER */}
        <div className='relative col-span-12'>
          <header
            className='w-full h-96 relative bg-cover bg-center flex items-end rounded-2xl'
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, #0b1622 100%), url(${data.user.banner})`,
            }}
          >
            <div className='relative z-10 flex justify-between items-end w-full max-w-7xl mx-auto p-6 md:p-10'>
              {/* Teks AniList Wrapped */}
              <div>
                <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight'>
                  YOUR <br />
                  <span className='bg-gradient-to-r from-[#3db4f2] to-[#c063ff] bg-clip-text text-transparent'>
                    2024
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

        {/* Contoh SectionCard / konten di bawah hero */}
        <div className='col-span-12'>
          <SectionCard
            title={`Your AniList Wrapped ${new Date().getFullYear()}`}
            colSpan='col-span-12'
          >
            {/* Konten bisa ditempatkan di sini */}
            <p className='text-gray-300'>
              This is where your AniList summary goes.
            </p>
          </SectionCard>
        </div>
      </div>
      <div
        className='
    w-[1200px] rounded-3xl p-6 grid grid-cols-12 gap-4
    bg-gradient-to-br from-[#0b1220] via-[#0e1628] to-[#0b1220]
  '
      >
        {/* STATS ROW */}
        <SectionCard title='Activity' colSpan='col-span-4'>
          <StatRow
            label='Days Active'
            value={`${data.activity.daysActive} days`}
            highlight
          />

          <StatRow
            label='Most Active Month'
            value={data.activity.mostActiveMonth}
          />
          <StatRow
            label='Daily Episodes'
            value={`${data.activity.dailyEpisodes} eps/day`}
          />
        </SectionCard>

        <SectionCard title='Percentile' colSpan='col-span-4'>
          <StatRow label='Anime' value={data.percentile.anime} highlight />
          <StatRow label='Overall' value={data.percentile.overall} />
        </SectionCard>

        <SectionCard title='Anime Stats' colSpan='col-span-4'>
          <div className='grid grid-cols-2 gap-4'>
            <BigMetric label='Episodes' value={data.anime.episodes} />
            <BigMetric label='Completed' value={data.anime.completed} />
            <BigMetric
              label='Mean Score'
              value={data.anime.meanScore.toFixed(1)}
            />
          </div>
        </SectionCard>

        {/* MONTHLY */}
        <SectionCard title='Monthly Activity' colSpan='col-span-12'>
          <MonthlyChart data={data.monthly} />
        </SectionCard>

        {/* TOPS */}
        <SectionCard title='Top Anime' colSpan='col-span-8'>
          <TopGrid items={data.topAnime} />
        </SectionCard>

        <SectionCard title='Top Genres' colSpan='col-span-4'>
          <GenreRadar data={data.topGenres} />
        </SectionCard>

        {/* EXTRAS */}
        <SectionCard title='Top Tags' colSpan='col-span-4'>
          <TopTags tags={data.topTags} />
        </SectionCard>

        <SectionCard title='First & Last Anime' colSpan='col-span-8'>
          <TopGrid items={[data.firstAnime, data.lastAnime]} />
        </SectionCard>
      </div>
    </div>
  );
}
