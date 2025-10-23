import { apiGetClient, apiPostClient } from './apiClients'

export const getAllAvailableSuppliers = (params: any) => {
  return apiGetClient('/suppliers', {
    params: {
      skip: params.skip || 0,
      limit: params.limit || 50,
      search: params.search || '',
      min_price: params.min_price || null,
      max_price: params.max_price || null,
      min_moq: params.min_moq || null,
      max_moq: params.max_moq || null,
      us_approved: params.us_approved || null,
    },
  })
}

export const bookmarkSupplier = (supplierID: any) => {
  return apiPostClient(`/suppliers/${supplierID}/bookmark`, {})
}

export const getAllBookmarkedSuppliers = () => {
  return apiGetClient('/suppliers/bookmarked')
}

export const getAllSupplierPerIngredient = (params: any) => {
  return apiGetClient(`/suppliers/by-ingredient/${params.ingredient_id}`, {
    params: {
      skip: params.skip || 0,
      limit: params.limit || 50,
      search: params.search || '',
      min_price: params.min_price || null,
      max_price: params.max_price || null,
      min_moq: params.min_moq || null,
      max_moq: params.max_moq || null,
      us_approved: params.us_approved || null,
    },
  })
}
