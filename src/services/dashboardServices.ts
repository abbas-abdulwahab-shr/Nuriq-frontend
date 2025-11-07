import { apiGetClient, apiPostClient } from './apiClients'

export const getScrappedTrends = (params: any) => {
  const query: any = {
    limit: params.limit ?? 50,
    skip: params.skip ?? 0,
  }

  if (params.search) query.search = params.search
  if (params.category) query.category = params.category

  return apiGetClient('/trends', {
    params: {
      ...query,
    },
  })
}

export const fetchAndProcessTrends = () => {
  return apiPostClient('/trends/fetch-and-process')
}

export const getAllNewsFeed = (params: any) => {
  return apiGetClient('/news-feed', {
    params: { skip: params.skip || 0, limit: params.limit || 50 },
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
