import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function StockChart({ data }) {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sortedData = [...data].sort((a, b) => a.stock - b.stock);

  const chartData = {
    labels: sortedData.map((item) => item.categoria),
    datasets: [
      {
        label: "Stock",
        data: sortedData.map((item) => item.stock),
        borderRadius: 12,
        backgroundColor: "#74D3AE",
        borderColor: "#549C81",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",

    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },

    animations: {
      x: {
        from: 0,
        delay: (ctx) => ctx.dataIndex * 200,
      },
    },

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div ref={containerRef} style={{ height: "350px" }}>
      {visible && (
        <Bar
          key={JSON.stringify(chartData)}
          data={chartData}
          options={options}
        />
      )}
    </div>
  );
}   