import { useEffect } from "https://esm.sh/v118/preact@10.13.2/hooks/src/index.js";

export default function TrackingChart() {
  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [{
          label: "My First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        }],
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "month",
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <div>
      <h2>Chart title</h2>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <canvas id="myChart"></canvas>
    </div>
  );
}
