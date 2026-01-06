"use client";

import { useState } from "react";
import { WrappedDashboard } from "@/presentation/components/wrapped-dashboard/WrappedDashboard";
import { AniListRepositoryImpl } from "@/infrastructure/anilist/AniListRepositoryImpl";
import { getWrappedData } from "@/application/wrapped/GetWrappedData";

export default function Home() {
  const [username, setUsername] = useState("PdBear");
  const [year, setYear] = useState(2025);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!username) return alert("Please enter the AniList username");
    setLoading(true);
    try {
      const repo = new AniListRepositoryImpl();
      const d = await getWrappedData(repo, username, year);
      setData(d);
    } catch (err: any) {
      console.error(err);
      alert("Failed to fetch AniList data. Make sure the username is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-black text-white p-10 flex flex-col items-center'>
      {/* INPUT USERNAME & YEAR */}
      <div className='w-full max-w-md mb-8 space-y-3'>
        <input
          className='w-full p-3 rounded-xl bg-zinc-800 placeholder:text-zinc-400'
          placeholder='AniList Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Wrapped"}
        </button>
      </div>

      {/* DASHBOARD */}
      {data && <WrappedDashboard data={data} year={year} />}
    </div>
  );
}
