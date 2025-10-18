import { apiGetClient, apiPostClient } from './apiClients'

interface IngredientPayload {
  name: string
  slug: string
  description: string
  benefits: string
  claims: string
  regulatory_notes: string
  weight: number
  unit: string
  allergies: string
  function: string
}

export const getAllAvailableIngredients = (params: any) => {
  return apiGetClient('/ingredients', {
    params: {
      limit: params.limit || 50,
      search: params.search || '',
      type: params.type || '',
      trending: params.trending || false,
      skip: params.skip || 0,
    },
  })
}

export const createIngredientManually = (data: IngredientPayload) => {
  return apiPostClient('/ingredients', data)
}

export const getChartDataForIngredient = (ingredientSlug: string) => {
  return apiGetClient(`/ingredients/${ingredientSlug}/price-chart`)
}
