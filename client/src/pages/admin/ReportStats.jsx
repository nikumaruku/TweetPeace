import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const stats = [
  { name: "Total Reports", stat: "10" },
  { name: "Reports Reviewed", stat: "7" },
  { name: "Unreviewed reports", stat: "3" },
];

export default function ReportStats() {
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
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ["#DAFFFB", "#64CCC5", "#176B87"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, []);

  return (
    <div className="space-y-5">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Report Statistics
      </h3>
      <div className="py-10 bg-white shadow-xl rounded-lg border-black border-1">
        <canvas ref={chartRef} width="300" height="300"  />
      </div>
    </div>
  );
}
