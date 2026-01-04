"use client";

import { useMonthlyChart } from "@/hooks/useChartSetup";

interface MonthlyChartProps {
  data: number[];
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  const chartRef = useMonthlyChart(data);

  return (
    <div className='bg-[#151f2e] rounded-2xl p-6'>
      <div className='flex items-center gap-2 mb-6'>
        <div className='w-1 h-4 bg-white rounded-full'></div>
        <h4 className='text-sm font-bold text-gray-200'>Monthly Activity</h4>
      </div>
      <div className='h-48 w-full'>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
