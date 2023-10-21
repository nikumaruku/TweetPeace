// const stats = [
//   { name: "Total Reports", stat: "10" },
//   { name: "Reports Reviewed", stat: "7" },
//   { name: "Unreviewed reports", stat: "3" },
// ];

// export default function ReportStats() {
//   return (
//     <div>
//       <h3 className="text-base font-semibold leading-6 text-gray-900">
//         Report Statistics
//       </h3>
//       <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
//         {stats.map((item) => (
//           <div
//             key={item.name}
//             className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
//           >
//             <dt className="truncate text-sm font-medium text-gray-500">
//               {item.name}
//             </dt>
//             <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
//               {item.stat}
//             </dd>
//           </div>
//         ))}
//       </dl>
//     </div>
//   );
// }

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const stats = [
  { name: 'Total Reports', stat: '10' },
  { name: 'Reports Reviewed', stat: '7' },
  { name: 'Unreviewed reports', stat: '3' },
];

export default function ReportStats() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance.current) {
        // If a chart instance already exists, destroy it before creating a new one.
        chartInstance.current.destroy();
      }

      // Extract data for the chart
      const labels = stats.map((item) => item.name);
      const data = stats.map((item) => Number(item.stat));

      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        },
        options: {
          responsive: true, // Enable responsiveness
          maintainAspectRatio: false, // Disable aspect ratio (allows custom width and height)
        },
      });
    }
  }, []);

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Report Statistics
      </h3>
      <div className="mt-5">
        <canvas ref={chartRef} width="300" height="300"></canvas>
      </div>
    </div>
  );
}

