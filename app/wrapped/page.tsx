"use client";

import { useState } from "react";
import { fetchAniListWrapped } from "@/lib/anilist";
import { WrappedDashboard } from "@/components/wrapped/WrappedDashboard";

export default function Page() {
  const [token, setToken] = useState("");
  const [year, setYear] = useState(2024);
  const [data, setData] = useState<any>(null);

  const generate = async () => {
    const d = await fetchAniListWrapped(token, year);
    setData(d);
  };

  return (
    <div className='min-h-screen bg-black text-white p-10'>
      <div className='max-w-md space-y-3'>
        <input
          className='w-full p-2 rounded bg-zinc-800'
          placeholder='AniList Token'
          onChange={(e) => setToken(e.target.value)}
        />
        <select
          className='w-full p-2 rounded bg-zinc-800'
          onChange={(e) => setYear(+e.target.value)}
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
        <button
          onClick={generate}
          className='w-full bg-pink-500 py-2 rounded font-bold'
        >
          Generate Wrapped
        </button>
      </div>

      {data && <WrappedDashboard data={data} />}
    </div>
  );
}
