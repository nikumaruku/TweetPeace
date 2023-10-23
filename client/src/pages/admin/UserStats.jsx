import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function UserStats() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [userCount, setUserCount] = useState(0); 

  useEffect(() => {
    fetch(`http://localhost:3001/users/count`)
      .then((response) => response.json())
      .then((data) => {
        setUserCount(data.userCount); 
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const labels = ["Registered", "Active", "Unique Visitors"];

      const data = [userCount, 1, 15]; 

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "User Count",
              data: data,
              backgroundColor: ["#63B3ED", "#93C5FD", "#A5B4FC", "#FF0000"], 
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
  }, [userCount]); 

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
