"use client";

import { useState } from "react";
import { WrappedDashboard } from "@/presentation/pages/WrappedDashboard";
import { AniListRepositoryImpl } from "@/infrastructure/anilist/AniListRepositoryImpl";
import { getWrappedData } from "@/application/wrapped/GetWrappedData";
import { WrappedResult } from "@/domain/entities/WrappedResult";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [username, setUsername] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [displayYear, setDisplayYear] = useState(currentYear);
  const [data, setData] = useState<WrappedResult>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const years: number[] = [];
  for (let y = 2024; y <= currentYear; y++) years.push(y);

  const generate = async () => {
    const trimmed = username.trim();
    if (!trimmed) {
      setError("Please enter your AniList username.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const repo = new AniListRepositoryImpl();
      const d = await getWrappedData(repo, trimmed, selectedYear);
      setData(d);
      setDisplayYear(selectedYear);
    } catch {
      setError(
        "Failed to fetch AniList data. Make sure the username is correct.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) generate();
  };

  return (
    <div className='relative min-h-screen flex flex-col items-center p-10 bg-gradient-to-b from-background to-card'>
      {/* INPUT SECTION */}
      <div
        className='w-full max-w-md mb-5 space-y-5 z-10'
        onKeyDown={handleKeyDown}
      >
        {/* Username */}
        <div className='relative'>
          <label
            htmlFor='username'
            className='block text-sm font-medium text-text-subtle mb-1.5'
          >
            AniList Username
          </label>
          <input
            id='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter username...'
            className='w-full px-4 py-3 rounded-[1.25rem] bg-card border border-card-border text-white
              placeholder:text-text-faint
              focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent
              shadow-[0_0_8px_rgba(236,72,153,0.15)] transition-all duration-200'
          />
        </div>

        {/* Year */}
        <div className='relative'>
          <label
            htmlFor='year'
            className='block text-sm font-medium text-text-subtle mb-1.5'
          >
            Select Year
          </label>
          <select
            id='year'
            value={selectedYear}
            onChange={(e) => setSelectedYear(+e.target.value)}
            className='w-full px-4 py-3 rounded-[1.25rem] bg-card border border-card-border text-white
              focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent
              shadow-[0_0_8px_rgba(236,72,153,0.15)] transition-all duration-200
              appearance-none cursor-pointer'
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Error banner */}
        {error && (
          <div className='flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm'>
            <svg
              className='w-4 h-4 shrink-0'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Generate button */}
        <button
          onClick={generate}
          disabled={loading}
          className='w-full py-3.5 rounded-[1.5rem] font-bold text-white text-base
            bg-gradient-to-r from-accent to-accent-light
            shadow-[0_0_12px_var(--accent),0_0_24px_var(--accent-light)]
            hover:from-accent-light hover:to-accent
            disabled:opacity-60 disabled:cursor-not-allowed
            transition-all duration-300 cursor-pointer'
        >
          {loading ? "Generating..." : "Generate Wrapped"}
        </button>
      </div>

      {/* DASHBOARD */}
      <div className='w-full flex justify-center relative'>
        {data && <WrappedDashboard data={data} year={displayYear} />}

        {/* Loading overlay */}
        {loading && (
          <div className='absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50 rounded-3xl'>
            <svg
              className='animate-spin h-12 w-12 text-accent mb-4'
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
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
              />
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
