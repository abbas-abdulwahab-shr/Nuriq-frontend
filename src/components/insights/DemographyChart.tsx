import { Line } from 'react-chartjs-2'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
)

export default function DemographyChart({
  demoData,
  label,
}: {
  demoData?: Array<string>
  label: Array<string>
}) {
  const data = {
    labels: label,
    datasets: [
      {
        label: 'This Month',
        data: demoData
          ? demoData.map((el) => parseInt(el))
          : [8000, 12000, 18000, 14000, 20000],
        borderColor: '#000',
        fill: false,
      },
      {
        label: 'Last Month',
        data: [10000, 15000, 20000, 17000, 21000],
        borderColor: '#93c5fd',
        borderDash: [5, 5],
        fill: false,
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
  return <Line data={data} options={options} />
}
