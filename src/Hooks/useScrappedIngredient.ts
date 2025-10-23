import { useQuery } from '@tanstack/react-query'
import { getAllAvailableIngredients } from '@/services/ingredientServices'

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

      const formattedData = response.data?.map((item: any, index: number) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        image: item.image
          ? item.image
          : index % 3 === 0
            ? '/moses-image.jpg'
            : index % 3 === 1
              ? '/water-sparkling.jpg'
              : '/mush-chocolate.jpg',
      }))
      return formattedData
    },
    retry: 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })

  return {
    scrappedIngredientsData: data ?? [],
    ingredientLoading: isLoading,
    ingredientError: error,
  }
}
