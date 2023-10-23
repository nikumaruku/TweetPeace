import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function ReportStats() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [reportsCount, setReportsCount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3001/report/report/reportsCount`)
      .then((response) => response.json())
      .then((data) => {
        setReportsCount(data.reportsCount);
      })
      .catch((error) => {
        console.error("Error fetching reports count:", error);
      });

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const labels = [
        "Total Reports",
        "Reports Reviewed",
        "Unreviewed reports",
      ];
      const data = [reportsCount, 1, 1];

      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ["#DAFFFB", "#64CCC5", "#176B87", "#FF0000"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [reportsCount]);

  return (
    <div className="space-y-5">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Report Statistics
      </h3>
      <div className="py-10 bg-white shadow-xl rounded-lg border-black border-1">
        <canvas ref={chartRef} width="300" height="300" />
      </div>
    </div>
  );
}
