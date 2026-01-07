"use client";

import { useState } from "react";
import { WrappedDashboard } from "@/presentation/pages/WrappedDashboard";
import { AniListRepositoryImpl } from "@/infrastructure/anilist/AniListRepositoryImpl";
import { getWrappedData } from "@/application/wrapped/GetWrappedData";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [username, setUsername] = useState("PdBear");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [displayYear, setDisplayYear] = useState(currentYear);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const years = [];
  for (let y = 2024; y <= currentYear; y++) years.push(y);

  const generate = async () => {
    if (!username) return alert("Please enter the AniList username");
    setLoading(true);
    try {
      const repo = new AniListRepositoryImpl();
      const d = await getWrappedData(repo, username, selectedYear);
      setData(d);
      setDisplayYear(selectedYear);
    } catch (err: any) {
      console.error(err);
      alert("Failed to fetch AniList data. Make sure the username is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#0B0B15] text-white p-10 flex flex-col items-center relative'>
      {/* INPUT & YEAR SELECT */}
      <div className='w-full max-w-md mb-8 space-y-4'>
        <input
          placeholder='AniList Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-full p-3 rounded-xl bg-[#1C1C27] border border-[#31313B] placeholder:text-zinc-500 text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition'
        />

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(+e.target.value)}
          className='w-full p-3 rounded-xl bg-[#1C1C27] border border-[#31313B] text-white placeholder:text-zinc-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition'
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <button
          onClick={generate}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition 
            ${
              loading
                ? "bg-zinc-700 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500"
            }`}
        >
          {loading && (
            <svg
              className='animate-spin h-5 w-5 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
              ></path>
            </svg>
          )}
          {loading ? "Generating..." : "Generate Wrapped"}
        </button>
      </div>

      {/* DASHBOARD */}
      <div
        className={`w-full flex justify-center relative ${
          loading ? "blur-sm" : ""
        }`}
      >
        {data && <WrappedDashboard data={data} year={displayYear} />}

        {/* Fullscreen Loading Overlay */}
        {loading && (
          <div className='absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50'>
            <svg
              className='animate-spin h-12 w-12 text-pink-400 mb-4'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
              ></path>
            </svg>
            <span className='text-white font-bold text-lg'>
              Loading Wrapped Data...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
