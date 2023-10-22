import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const stats = [
  { name: "Registered Users", stat: "3" },
  { name: "Active users", stat: "1" },
  { name: "Unique Visitors", stat: "15" },
];

export default function UserStats() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const labels = stats.map((item) => item.name);
      const data = stats.map((item) => Number(item.stat));

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Statistics",
              data: data,
              backgroundColor: ["#63B3ED", "#93C5FD", "#A5B4FC"],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, []);

  return (
    <div className="mb-8">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        User Statistics
      </h3>
      <div className="mt-5 bg-white shadow-xl p-8 rounded-xl">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
