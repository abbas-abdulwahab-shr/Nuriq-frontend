import React from 'react'

interface ProgressBarProps {
  label: string
  value: number // 0–100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ label, value }) => (
  <div className="mb-3">
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium">{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 rounded-full bg-gray-200">
      <div
        className="h-2 rounded-full bg-emerald-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
)
