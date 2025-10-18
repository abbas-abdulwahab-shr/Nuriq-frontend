import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '@/services/profileService'

export const useUserDetails = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response: any = await getUserProfile()
      return response.data
    },
    retry: 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })

  return {
    userDetails: data ?? null,
    loading: isLoading,
    error: isError
      ? (error as any)?.response?.data?.detail || 'Failed to fetch user details'
      : null,
  }
}
