import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import foxImg from '/fox-newsImg.png'
import bookmarkIcon from '/bookmark-icon.png'

import {
  createBookmarkFeed,
  getAllNewsFeed,
} from '@/services/dashboardServices'
import { useToastFunc } from '@/Hooks/useToastFunc'

export const NewsFeed: React.FC = () => {
  const { showToast } = useToastFunc()
  const [triggerRefetch, setTriggerRefetch] = useState(0)

  const {
    data: refactoredNewsFeed,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['news-feed', triggerRefetch],
    queryFn: async () => {
      const response: any = await getAllNewsFeed({ limit: 5, skip: 0 })

      const formattedData = response.data?.map((item: any) => ({
        id: item.id,
        author: item.author || 'System Author',
        source: item.source || 'System Source',
        title: item.title,
        date: formatDateToReadable(item.published_at),
        views: item.views,
        image: item.image || foxImg,
        newsImg: item.image || foxImg,
        link: item.url,
        is_bookmarked: item.is_bookmarked || false,
      }))
      return formattedData
    }, // don't refetch on reconnect
  })

  const handleFeedBookmark = async (news_id: string) => {
    try {
      const response: any = await createBookmarkFeed(news_id)

      if (response) {
        showToast(
          'Bookmark',
          response.message || 'Bookmark successful!',
          'success',
        )
        setTriggerRefetch((prev) => prev + 1)
      }
    } catch (resError: any) {
      showToast(
        'Bookmark error',
        resError.response.data.detail ||
          'An error occurred during bookmarking.',
        'error',
      )
    }
  }

  function formatDateToReadable(dateString: string): string {
    const date = new Date(dateString)

    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'short' })
    const year = date.getFullYear()

    // Add ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (day: number): string => {
      if (day >= 11 && day <= 13) return 'th'
      switch (day % 10) {
        case 1:
          return 'st'
        case 2:
          return 'nd'
        case 3:
          return 'rd'
        default:
          return 'th'
      }
    }

    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading news feed</div>

  return (
    <div className="space-y-4 border border-[#B2B2B2] rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-[24px]">News feed</h2>
      </div>
      {refactoredNewsFeed?.map((item: any) => (
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
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <p
                role="link"
                className="text-sm font-semibold text-[#1A1A1A] leading-[150%]"
              >
                {item.title}
              </p>
            </a>
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
            <span
              onClick={() => handleFeedBookmark(item.id)}
              className="cursor-pointer"
            >
              <img
                src={bookmarkIcon}
                alt="Bookmark Icon"
                className={`w-4 h-4`}
                style={{
                  backgroundColor: item.is_bookmarked ? 'gold' : 'transparent',
                }}
              />
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
