/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React from 'react'
import type { TrendingItem } from '../data/trendingMock'

export const TrendingListItem: React.FC<{ item: TrendingItem }> = ({
  item,
}) => (
  <div className="flex border rounded-lg overflow-hidden shadow-sm bg-white">
    <img src={item.image} alt={item.title} className="w-40 h-40 object-cover" />
    <div className="p-4 flex-1">
      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
      <div className="text-xs text-gray-500 flex flex-wrap gap-2">
        {item.tags?.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  </div>
)
