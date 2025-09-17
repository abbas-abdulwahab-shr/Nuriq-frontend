import React from 'react'
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { priceTracker } from '../data/priceMock'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip)

export const PriceTracker: React.FC = () => (
  <div className="space-y-6 mt-8 border border-[#B2B2B2] rounded-lg p-6">
    <h2 className="font-semibold text-lg">Ingredients Price Tracker</h2>

    {priceTracker.map((item) => {
      const data = {
        labels: item.trend.map((_, i) => i + 1),
        datasets: [
          {
            data: item.trend,
            borderColor: item.change >= 0 ? '#16a34a' : '#dc2626', // Tailwind green-600 or red-600
            backgroundColor: 'transparent',
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      }

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { display: false },
          y: { display: false },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx: any) => `$${ctx.parsed.y.toFixed(2)}`,
            },
          },
        },
      }

      return (
        <div
          key={item.id}
          className="rounded-lg border p-4 shadow-sm bg-white flex flex-col"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">${item.price}</p>
            </div>
            <span
              className={`text-sm font-semibold ${
                item.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {item.change}%
            </span>
          </div>

          <div className="h-16 w-full">
            <Line data={data} options={options} />
          </div>
        </div>
      )
    })}
  </div>
)
