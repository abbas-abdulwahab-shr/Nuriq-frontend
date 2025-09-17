import { Bar } from 'react-chartjs-2'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip)

export default function GenderBiasChart() {
  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [15000, 25000],
        backgroundColor: ['#a78bfa', '#6ee7b7'],
        borderRadius: 8,
      },
    ],
  }
  const options = {
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
  return <Bar data={data} options={options} height="164px" />
}
