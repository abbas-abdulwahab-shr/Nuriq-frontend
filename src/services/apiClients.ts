import axiosClient from '@/api/axiosClient'

// Generic GET
export const apiGetClient = async <T>(
  url: string,
  params?: object,
): Promise<T> => {
  const response = await axiosClient.get<T>(url, { params })
  return response.data
}

// Generic POST
export const apiPostClient = async <T>(
  url: string,
  data?: object,
): Promise<T> => {
  const response = await axiosClient.post<T>(url, data)
  return response.data
}

// Generic PUT
export const apiPutClient = async <T>(
  url: string,
  data?: object,
): Promise<T> => {
  const response = await axiosClient.put<T>(url, data)
  return response.data
}

// Generic DELETE
export const apiDeleteClient = async <T>(url: string): Promise<T> => {
  const response = await axiosClient.delete<T>(url)
  return response.data
}
