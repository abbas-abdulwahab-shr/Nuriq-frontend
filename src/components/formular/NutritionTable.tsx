import React from 'react'

interface Row {
  name: string
  amount_per_serving: string
  daily_value_percent: string
}

interface NutritionTableProps {
  rows: Array<Row>
}

export const NutritionTable: React.FC<NutritionTableProps> = ({ rows }) => (
  <table className="w-full text-sm border-gray-200">
    <thead className="">
      <tr className="text-left text-gray-500">
        <th className="py-4">Nutrition</th>
        <th className="py-4">Amount per serving</th>
        <th className="py-4">Daily value %</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((r, i) => (
        <tr key={i} className="border-t border-gray-100">
          <td className="py-4 font-medium">{r.name}</td>
          <td className="py-4 text-center">{r.amount_per_serving}</td>
          <td className="py-4 text-center">{r.daily_value_percent}</td>
        </tr>
      ))}
    </tbody>
  </table>
)
