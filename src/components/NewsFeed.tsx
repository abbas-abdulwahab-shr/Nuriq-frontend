import React from 'react'
import { newsFeed } from '../data/newsMock'
import bookmarkIcon from '/bookmark-icon.png'

export const NewsFeed: React.FC = () => (
  <div className="space-y-4 border border-[#B2B2B2] rounded-lg p-4">
    <div className="flex justify-between items-center">
      <h2 className="font-semibold text-[24px]">News feed</h2>
      <button className="text-[16px] text-[#312C13] hover:underline">
        View more
      </button>
    </div>
    {newsFeed.map((item) => (
      <div key={item.id} className="pb-3 border-b last:border-b-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <img
              src={item.image}
              alt={item.title}
              className="h-[40px] w-[40px] object-cover rounded-full"
            />
            <p className="text-xs text-gray-500">{item.author}</p>
          </div>
          <p className="text-xs text-gray-500">{item.source}</p>
        </div>
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-semibold text-[#1A1A1A] leading-[150%]">
            {item.title}
          </p>
          <img
            src={item.newsImg}
            alt={item.source}
            className="w-[72px] h-[56px] object-cover rounded-lg"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400 mt-1">
            {item.date} · {item.views} views
          </p>
          <img src={bookmarkIcon} alt="Bookmark Icon" className="w-4 h-4" />
        </div>
      </div>
    ))}
  </div>
)
