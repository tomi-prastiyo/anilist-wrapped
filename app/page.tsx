"use client";

import { useState } from "react";
import { fetchAniListWrapped } from "@/lib/anilist";
import { WrappedDashboard } from "@/components/wrapped/WrappedDashboard";

export default function Home() {
  const [token, setToken] = useState("");
  const [year, setYear] = useState(2024);
  const [data, setData] = useState<any>(null);

  const generate = async () => {
    if (!token) return alert("Please enter your AniList token");
    const d = await fetchAniListWrapped(token, year);
    setData(d);
  };

  return (
    <div className='min-h-screen bg-black text-white p-10 flex flex-col items-center'>
      {/* INPUT TOKEN & YEAR */}
      <div className='w-full max-w-md mb-8 space-y-3'>
        <input
          className='w-full p-3 rounded-xl bg-zinc-800 placeholder:text-zinc-400'
          placeholder='AniList Token'
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <select
          className='w-full p-3 rounded-xl bg-zinc-800'
          value={year}
          onChange={(e) => setYear(+e.target.value)}
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
        <button
          onClick={generate}
          className='w-full bg-pink-500 py-3 rounded-xl font-bold hover:bg-pink-600 transition'
        >
          Generate Wrapped
        </button>
      </div>

      {/* DASHBOARD */}
      {data && <WrappedDashboard data={data} />}
    </div>
  );
}
