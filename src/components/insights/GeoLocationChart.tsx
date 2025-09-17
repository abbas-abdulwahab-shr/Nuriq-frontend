import { Bar } from 'react-chartjs-2'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip)

export default function GeoLocationChart() {
  const labels = ['Colorado', 'Arizona', 'New York', 'San Francisco', 'Miami']
  const data = {
    labels,
    datasets: [
      {
        axis: 'y',
        data: [90, 70, 60, 55, 40],
        backgroundColor: '#000',
        borderRadius: 8,
      },
    ],
  }
  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  }
  return <Bar data={data} options={options} />
}
