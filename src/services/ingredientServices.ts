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
  const query: any = {
    limit: params.limit ?? 50,
    skip: params.skip ?? 0,
  }

  if (params.search) query.search = params.search
  if (params.type) query.type = params.type
  if (params.trending) query.trending = params.trending

  return apiGetClient('/ingredients', {
    params: {
      ...query,
    },
  })
}

export const createIngredientManually = (data: IngredientPayload) => {
  return apiPostClient('/ingredients', data)
}

export const getChartDataForIngredient = (ingredientSlug: string) => {
  return apiGetClient(`/ingredients/${ingredientSlug}/price-chart`)
}
