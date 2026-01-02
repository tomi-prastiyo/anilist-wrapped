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

export function WrappedDashboard({ data }: { data: any }) {
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

      {/* DASHBOARD */}
      <div
        ref={ref}
        className='
    w-[1200px] rounded-3xl p-6 grid grid-cols-12 gap-4
    bg-gradient-to-br from-[#0b1220] via-[#0e1628] to-[#0b1220]
  '
      >
        {/* HERO */}
        <SectionCard title='Your 2025 Anime Wrapped' colSpan='col-span-12'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-slate-400 text-sm'>AniList Wrapped</p>
              <h1
                className='text-4xl font-extrabold bg-gradient-to-r 
        from-pink-400 to-fuchsia-500 bg-clip-text text-transparent'
              >
                {data.user.name}
              </h1>
            </div>

            <div className='relative'>
              <div
                className='absolute inset-0 rounded-full 
        bg-pink-500 blur-md opacity-40'
              />
              <img
                src={data.user.avatar}
                className='relative w-16 h-16 rounded-full border-2 border-pink-400'
              />
            </div>
          </div>
        </SectionCard>

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
