import { Bar } from 'react-chartjs-2'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip)

export default function GenderBiasChart({
  demoData,
  label,
}: {
  demoData: Array<number>
  label: Array<string>
}) {
  const data = {
    labels: label,
    datasets: [
      {
        data: demoData,
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
