import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllAvailableSuppliers } from '@/services/supplierService'
import { FilterDropdown } from '@/components/marketPlace/FilterDropdown'
import { SupplierCard } from '@/components/marketPlace/SupplierCard'
import { Loader } from '@/components/Loader'

// interface Supplier {
//   id: number
//   name: string
//   rating: number
//   product: string
//   description: string
//   price: string
//   moq: string
//   delivery: string
//   approved: boolean
//   image: string
//   available: boolean
// }

export const Route = createLazyFileRoute(
  '/_appLayout/marketplace/supplier/$ingredientId',
)({
  component: MarketPlaceComponent,
})

function MarketPlaceComponent() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<string | null>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['suppliers', query, filter],
    queryFn: async () => {
      const response: any = await getAllAvailableSuppliers({
        search: query,
        min_price: filter === 'Price' ? 0 : null,
        max_price: filter === 'Price' ? 0 : null,
        min_moq: filter === 'MOQ' ? 0 : null,
        max_moq: filter === 'MOQ' ? 0 : null,
        us_approved: filter === 'Approval' ? true : null,
      })
      console.log('suppliers data', response)
      const formattedData = response.data?.map((item: any) => ({
        id: item.id,
        name: item.full_name,
        rating: 4.5,
        product: 'Irish Moss',
        description: item.description,
        price: `${item.price_per_unit} per kg`,
        moq: `${item.moq_weight_kg}kg`,
        delivery: item.delivery_duration,
        approved: item.us_approved_status,
        image: item.image,
        available: item.availability,
      }))
      return formattedData
    },
    // enabled: !!query || !!filter,
  })

  // console.log('Suppliers data', data, isLoading, error)

  return (
    <div className="p-6">
      {/* Top Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="mx-auto flex gap-6 w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search suppliers"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <FilterDropdown
            selected={filter}
            onChange={setFilter}
            options={['Time of delivery', 'MOQ', 'Price', 'Approval']}
          />
        </div>
      </div>
      {/* Header */}

      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold mb-6">Supplier list</h1>
        <button className="rounded-full border border-gray-400 px-4 py-2 hover:bg-[">
          Ingredient lockup
        </button>
      </div>

      {isLoading && <Loader text="Loading suppliers..." />}

      {error && <div>Error loading suppliers</div>}

      {!isLoading && data && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((supplier: any) => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </div>
      )}

      {/* Grid */}
    </div>
  )
}
