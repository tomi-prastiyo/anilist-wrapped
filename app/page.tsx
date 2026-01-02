"use client";

import { useState } from "react";
import * as htmlToImage from "html-to-image";
import WrappedCanvas from "@/components/WrappedCanvas";
import { fetchAniListWrapped } from "@/lib/anilist";

export default function Page() {
  const [token, setToken] = useState("");
  const [year, setYear] = useState(2025);
  const [data, setData] = useState<any>(null);

  const exportPNG = async () => {
    const node = document.getElementById("wrapped");
    if (!node) return;

    const dataUrl = await htmlToImage.toPng(node, {
      pixelRatio: 2,
      cacheBust: true,
    });

    const link = document.createElement("a");
    link.download = `anilist-wrapped-${year}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <main className='min-h-screen flex flex-col items-center gap-6 p-10'>
      <div className='flex gap-4'>
        <input
          placeholder='AniList Token'
          className='px-4 py-2 rounded-xl bg-[#121A2A]'
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className='px-4 py-2 rounded-xl bg-[#121A2A]'
        >
          {[2024, 2025].map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>

        <button
          onClick={async () => setData(await fetchAniListWrapped(token, year))}
          className='px-6 py-2 rounded-xl bg-pink-500'
        >
          Generate
        </button>

        {data && (
          <button
            onClick={exportPNG}
            className='px-6 py-2 rounded-xl border border-pink-500 text-pink-400'
          >
            Export PNG
          </button>
        )}
      </div>

      {data && <WrappedCanvas data={data} year={year} />}
    </main>
  );
}
