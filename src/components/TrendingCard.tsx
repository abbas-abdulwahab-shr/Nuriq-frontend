import React from 'react'
import type { TrendingItem } from '../data/trendingMock'

export const TrendingCard: React.FC<{ item: TrendingItem }> = ({ item }) => (
  <div className="border-[#B2B2B2] rounded-lg overflow-hidden shadow-sm bg-white p-4">
    <img
      src={item.image}
      alt={item.title}
      className="w-[272px] h-[148px] object-cover rounded-lg mb-2"
    />
    <div className="flex flex-col justify-between items-start flex-1">
      <p className="font-semibold text-lg mb-2">{item.title}</p>
      <p className="text-[16px] text-[#6C6C6C] mb-2 leading-[150%]">
        {item.description}
      </p>
      <div>
        <p className="font-medium mb-1 text-[14px] text-[#1A1A1A]">Tags:</p>
        <div className="text-xs text-gray-500 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
)
