"use client";

import { useRadarChart } from "@/hooks/useChartSetup";

interface GenreRadarProps {
  data: number[];
}

export function GenreRadar({ data }: GenreRadarProps) {
  const chartRef = useRadarChart(data);

  return (
    <div className='bg-[#151f2e] rounded-2xl p-5 flex flex-col items-center justify-center'>
      <div className='w-full flex items-center gap-2 mb-2'>
        <div className='w-1 h-4 bg-white rounded-full'></div>
        <h4 className='text-sm font-bold text-gray-200'>Genre Stat</h4>
      </div>
      <div className='h-40 w-40 relative'>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
