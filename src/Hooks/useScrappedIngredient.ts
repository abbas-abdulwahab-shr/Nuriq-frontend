import { useQuery } from '@tanstack/react-query'
import { getAllAvailableIngredients } from '@/services/ingredientServices'
import {
  getIngredientImage,
  optimizedIngredientImageUrl,
} from '@/utils/ingriedientImageHelper'

interface ScrappedIngredientParams {
  type?: string
  trending?: boolean
  limit?: number
  skip?: number
  search?: string
}

export const useScrappedIngredients = (params: ScrappedIngredientParams) => {
  optimizedIngredientImageUrl()
  const { data, isLoading, error } = useQuery({
    queryKey: ['scrapped-ingredients', params],
    queryFn: async () => {
      const response: any = await getAllAvailableIngredients(params)

      const formattedData = response.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        image: getIngredientImage(item.name.replace(/\s+/g, '_').toLowerCase()),
      }))
      return formattedData
    },
    enabled:
      !!params.type || !!params.limit || !!params.search || !!params.skip,
    refetchOnWindowFocus: false,
    refetchOnMount: false, // don't refetch on mount
    refetchOnReconnect: false, // don't refetch on reconnect
  })

  return {
    scrappedIngredientsData: data ?? [],
    ingredientLoading: isLoading,
    ingredientError: error,
  }
}
