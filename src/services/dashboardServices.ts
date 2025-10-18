import { apiGetClient, apiPostClient } from './apiClients'

export const getScrappedTrends = (params: any) => {
  return apiGetClient('/trends', {
    params: {
      limit: params.limit || 50,
      search: params.search || '',
      category: params.category || '',
      skip: params.skip || false,
    },
  })
}

export const fetchAndProcessTrends = () => {
  return apiPostClient('/trends/fetch-and-process')
}

export const getAllNewsFeed = (params: any) => {
  return apiGetClient('/news-feed', {
    params: { skip: params.skip || false, limit: params.limit || 50 },
  })
}

export const fetchAndProcessNewsFeed = () => {
  return apiPostClient('/news-feed/fetch-and-process')
}

export const getBookmarkFeeds = () => {
  return apiGetClient('/news-feed/bookmarked')
}

export const createBookmarkFeed = (news_id: string) => {
  return apiPostClient(`/news-feed/${news_id}/bookmark`)
}
