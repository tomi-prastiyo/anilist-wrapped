import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import {
  MONTHS,
  GENRE_LABELS,
  CHART_COLORS,
} from "@/constants/wrapped.constants";

Chart.register(...registerables);

export function useMonthlyChart(data: number[]) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const config: ChartConfiguration<"line"> = {
      type: "line",
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: "Activity",
            data,
            borderColor: CHART_COLORS.monthly.line,
            backgroundColor: CHART_COLORS.monthly.fill,
            borderWidth: 2,
            pointBackgroundColor: CHART_COLORS.monthly.line,
            pointRadius: 3,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1F2937",
            titleColor: "#F3F4F6",
            bodyColor: "#F3F4F6",
            padding: 10,
            cornerRadius: 8,
            displayColors: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "rgba(75,85,99,0.2)", drawBorder: false },
            ticks: { color: "#9CA3AF", font: { size: 10 } },
          },
          x: {
            grid: { display: false },
            ticks: { color: "#9CA3AF", font: { size: 10 } },
          },
        },
      },
    };

    chartInstanceRef.current = new Chart(ctx, config);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return chartRef;
}

export function useRadarChart(data: number[]) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const config: ChartConfiguration<"radar"> = {
      type: "radar",
      data: {
        labels: GENRE_LABELS,
        datasets: [
          {
            label: "Genres",
            data,
            backgroundColor: CHART_COLORS.genre.fill,
            borderColor: CHART_COLORS.genre.line,
            pointBackgroundColor: CHART_COLORS.genre.line,
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: CHART_COLORS.genre.line,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            angleLines: { color: "rgba(75,85,99,0.2)" },
            grid: { color: "rgba(75,85,99,0.2)" },
            pointLabels: { color: "#D1D5DB", font: { size: 9 } },
            ticks: { display: false, backdropColor: "transparent" },
          },
        },
      },
    };

    chartInstanceRef.current = new Chart(ctx, config);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return chartRef;
}
