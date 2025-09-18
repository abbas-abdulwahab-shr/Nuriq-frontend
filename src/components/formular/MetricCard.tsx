import React from 'react'

interface MetricCardProps {
  icon: React.ReactNode
  title: string
  value: string
  description?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  description,
}) => (
  <div className="flex flex-col rounded-2xl border border-gray-200 p-4 bg-white shadow-sm">
    <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
      {icon}
      {title}
    </div>
    <p className="text-xl font-bold">{value}</p>
    {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
  </div>
)
