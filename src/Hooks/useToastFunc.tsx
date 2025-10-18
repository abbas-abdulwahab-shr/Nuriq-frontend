import { useToast } from '@chakra-ui/react'

export const useToastFunc = () => {
  const toast = useToast()

  const showToast = (
    title: string,
    description: string,
    status: 'success' | 'error',
  ) => {
    toast({
      title,
      description,
      status,
      duration: 2000,
      isClosable: true,
    })
  }

  return { showToast }
}
