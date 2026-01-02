"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { SectionCard } from "./SectionCard";
import { StatCard } from "./StatCard";
import { MonthlyChart } from "./MonthlyChart";
import { GenreRadar } from "./GenreRadar";
import { TopGrid } from "./TopGrid";
import { TopTags } from "./TopTags";
import { PercentileCard } from "./PercentileCard";
import { StatRow } from "./StatRow";
import { BigMetric } from "./BigMetric";

export function WrappedDashboard({ data }: { data: any }) {
  const ref = useRef<HTMLDivElement>(null);

  const exportImage = async () => {
    if (!ref.current) return;
    const url = await toPng(ref.current, { pixelRatio: 2 });
    const a = document.createElement("a");
    a.href = url;
    a.download = "anilist-wrapped.png";
    a.click();
  };

  return (
    <>
      <div
        ref={ref}
        className='bg-[#0B1220] rounded-3xl p-6 grid grid-cols-12 gap-4 w-[1200px]'
      >
        {/* LEFT */}
        <SectionCard title='Activity' colSpan='col-span-3'>
          <StatRow label='Days Active' value='253 / 366' highlight />
          <StatRow label='Most Active Day' value='May 11' />
          <StatRow label='List Activity' value='826' />
          <StatRow label='Status Posts' value='1' />
        </SectionCard>

        {/* ANIME */}
        <SectionCard title='Anime' colSpan='col-span-3'>
          <div className='grid grid-cols-2 gap-4'>
            <BigMetric label='Episodes Watched' value='1,808' />
            <BigMetric label='Completed' value='150' />
            <BigMetric label='Dropped' value='0' />
            <BigMetric label='Mean Score' value='87.34' />
          </div>
        </SectionCard>

        {/* MANGA */}
        <SectionCard title='Manga' colSpan='col-span-3'>
          <div className='grid grid-cols-2 gap-4'>
            <BigMetric label='Chapters Read' value='451' />
            <BigMetric label='Completed' value='7' />
            <BigMetric label='Dropped' value='0' />
            <BigMetric label='Mean Score' value='87.00' />
          </div>
        </SectionCard>

        {/* PERCENTILE */}
        <SectionCard title='Percentile' colSpan='col-span-3'>
          <div className='space-y-3'>
            <StatRow label='Anime' value='Top 1%' highlight />
            <StatRow label='Manga' value='Top 61%' />
            <StatRow label='Overall' value='Top 10%' highlight />
          </div>
        </SectionCard>

        {/* MONTHLY */}
        <SectionCard title='Monthly Activity' colSpan='col-span-6'>
          <MonthlyChart data={data.monthly} />
        </SectionCard>

        {/* TOP ANIME */}
        <SectionCard title='Top Anime' colSpan='col-span-6'>
          <TopGrid items={data.topAnime} />
        </SectionCard>

        {/* TAGS */}
        <SectionCard title='Top Tags' colSpan='col-span-3'>
          <TopTags tags={data.topTags} />
        </SectionCard>

        {/* GENRE */}
        <SectionCard title='Genre Stats' colSpan='col-span-3'>
          <GenreRadar data={data.topGenres} />
        </SectionCard>

        {/* FIRST & LAST */}
        <SectionCard title='First & Last' colSpan='col-span-6'>
          <TopGrid items={[data.firstAnime, data.lastAnime]} />
        </SectionCard>
      </div>
    </>
  );
}
