"use client";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ScriptableContext,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

interface ChartDataEntry {
  timestamp: number;
  value: number;
}

const Chart = ({ data }: { data: ChartDataEntry[] }) => {
  const firstTimestamp = data[0].timestamp;
  const lastTimestamp = data[data.length - 1].timestamp;

  const stepSize = Math.round((lastTimestamp - firstTimestamp) / 7);

  let labels = [];
  let finalData = [];

  // Define a maximum number of bars (data points) to display
  const maxDataPoints = 50;

  for (let i = 0; i < 8; i++) {
    const startDate = new Date((firstTimestamp + i * stepSize) * 1000);
    const endDate = new Date((firstTimestamp + (i + 1) * stepSize) * 1000);

    labels.push(startDate.toLocaleDateString());

    // Find data points within the date range and keep their values
    const dataPointsInRange = data.filter((entry) => {
      return (
        entry.timestamp >= startDate.getTime() &&
        entry.timestamp < endDate.getTime()
      );
    });

    // If there are data points in the range, calculate their average value
    if (dataPointsInRange.length > 0) {
      const sumValue = dataPointsInRange.reduce(
        (total, entry) => total + entry.value,
        0
      );
      finalData.push(sumValue / dataPointsInRange.length);
    } else {
      finalData.push(0); // No data points in this range, so push 0.
    }
  }

  // Limit the number of data points to 50
  if (finalData.length > maxDataPoints) {
    const step = Math.ceil(finalData.length / maxDataPoints);
    finalData = finalData.filter((_, index) => index % step === 0);
  }

  console.log(finalData);

  const chartData = {
    labels: data.map((item) =>
      new Date(item.timestamp * 1000).toLocaleDateString("ru-RU")
    ),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 360);
          gradient.addColorStop(0, "#0575E6");
          gradient.addColorStop(1, "#021B79");
          return gradient;
        },
        legend: false,
        borderRadius: 20,
        borderSkipped: false,
        barPercentage: 0.4,
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default Chart;
