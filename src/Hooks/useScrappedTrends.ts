import { useQuery } from '@tanstack/react-query'
import { getScrappedTrends } from '@/services/dashboardServices'

interface ScrappedTrendsParams {
  category?: string
  limit?: number
  skip?: number
  search?: string
}

export const useScrappedTrends = (params: ScrappedTrendsParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['scrapped-trends', params],
    queryFn: async () => {
      const response: any = await getScrappedTrends(params)

      const formattedData = response.data?.map((item: any) => ({
        id: item.id,
        title: (item.title as string).split(' - ')[0] || item.title,
        description: item.description,
        tags: item.tags,
        image: item.image,
        category: item.category,
        // industry: item.industry,
      }))
      return formattedData
    },
    retry: 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })

  return {
    scrappedTrendsData: data ?? [],
    trendLoading: isLoading,
    trendError: error,
  }
}
