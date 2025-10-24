import { useQuery } from '@tanstack/react-query'
import { getAllAvailableIngredients } from '@/services/ingredientServices'
import { getIngredientImage } from '@/utils/ingriedientImageHelper'

interface ScrappedIngredientParams {
  type?: string
  trending?: boolean
  limit?: number
  skip?: number
  search?: string
}

export const useScrappedIngredients = (params: ScrappedIngredientParams) => {
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
    retry: false,
    refetchOnWindowFocus: false, // don't refetch on tab focus
    refetchOnMount: false, // don't refetch on remount
    refetchOnReconnect: false, // don't refetch on reconnect
  })

  return {
    scrappedIngredientsData: data ?? [],
    ingredientLoading: isLoading,
    ingredientError: error,
  }
}
