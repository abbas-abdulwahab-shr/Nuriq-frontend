import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

// ✅ Create reusable Axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ✅ Request Interceptor
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Attach token if available
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`
    }

    return config
  },
  (error: AxiosError) => {
    // Error while setting up request (e.g., invalid config)
    return Promise.reject(error)
  },
)

// ✅ Response Interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify or log successful responses here
    return response
  },
  (error: AxiosError) => {
    // Handle common errors globally (optional)
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data)
    } else {
      console.error('Network Error:', error.message)
    }

    // Forward the error to the caller (e.g. hook or component)
    return Promise.reject(error)
  },
)

export default axiosClient
