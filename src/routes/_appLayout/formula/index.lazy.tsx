import { useState } from 'react'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import { SearchBar } from '@/components/SearchBar'

import { getAllGeneratedFormulars } from '@/services/formularServices'
import { Loader } from '@/components/Loader'
import { truncateText } from '@/utils/utils'

export const Route = createLazyFileRoute('/_appLayout/formula/')({
  component: FormularIndex,
})

function FormularIndex() {
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const [search, setSearch] = useState('')
  const router = useRouter()

  const { data, isLoading, error } = useQuery({
    queryKey: ['allFormulas'],
    queryFn: async () => {
      const response: any = await getAllGeneratedFormulars()
      console.log(response.data)
      return response.data
    },
    refetchOnWindowFocus: false, // don't refetch on tab focus
  })

  const filtered = data?.filter((f: any) =>
    f.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
      <div className="mx-auto w-[50%]">
        <SearchBar value={search} onChange={setSearch} disabled={isLoading} />
      </div>

      <header className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Formulas</h1>
          <p className="text-lg text-muted-foreground mb-3">
            Manage your created product formulas.
          </p>
        </div>
      </header>

      {filtered?.length === 0 && !isLoading && !error && (
        <div className="text-center text-gray-500 text-xl mt-10 font-semibold">
          No formulas found.
        </div>
      )}

      {filtered?.length > 0 && !isLoading && !error && (
        <Box
          borderWidth="1px"
          borderRadius="md"
          borderColor={borderColor}
          overflowX="auto"
        >
          <Table variant="simple">
            <Thead bg={useColorModeValue('gray.50', 'gray.800')}>
              <Tr>
                <Th>Name</Th>
                <Th>Product Concept</Th>
                <Th>Cost Per Unit</Th>
                <Th textAlign="right">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered?.map((formula: any) => (
                <Tr
                  key={formula.id}
                  _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                >
                  <Td>{formula.name}</Td>
                  <Td>{truncateText(formula.product_concept, 70)}</Td>
                  <Td>${formula.cost_per_unit.toFixed(2)}</Td>
                  <Td textAlign="right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        router.navigate({ to: `/formula/${formula.id}` })
                      }
                    >
                      View
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {isLoading && <Loader text="Loading formula..." />}
      {error && (
        <div className="text-red-500 text-xl mt-10 font-semibold">
          Error retrieving formula. Kindly refresh or try again later.
        </div>
      )}
    </div>
  )
}
