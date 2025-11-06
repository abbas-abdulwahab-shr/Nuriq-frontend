import {
  createLazyFileRoute,
  useParams,
  useRouter,
} from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getAllSupplierPerIngredient } from '@/services/supplierService'
import { FilterDropdown } from '@/components/marketPlace/FilterDropdown'
import { SupplierCard } from '@/components/marketPlace/SupplierCard'
import { Loader } from '@/components/Loader'
import { useToastFunc } from '@/Hooks/useToastFunc'

export const Route = createLazyFileRoute(
  '/_appLayout/marketplace/supplier/$slug/$ingredientId',
)({
  component: MarketPlaceComponent,
})

function MarketPlaceComponent() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<string | null>(null)
  const { ingredientId, slug } = useParams({ strict: false })
  const { showToast } = useToastFunc()
  const router = useRouter()

  const { data, isLoading, error } = useQuery({
    queryKey: ['suppliers', query, filter],
    queryFn: async () => {
      const response: any = await getAllSupplierPerIngredient({
        ingredient_id: ingredientId,
        search: query,
        min_price: filter === 'Price' ? 0 : null,
        max_price: filter === 'Price' ? 0 : null,
        min_moq: filter === 'MOQ' ? 0 : null,
        max_moq: filter === 'MOQ' ? 0 : null,
        us_approved: filter === 'Approval' ? true : null,
      })
      console.log(response.data)

      const formattedData = response.data?.map((item: any) => ({
        id: item.id,
        name: item.full_name,
        rating: 4.5,
        product: slug,
        description: item.description,
        price: `${item.price_per_unit} per kg`,
        moq: `${item.moq_weight_kg}kg`,
        delivery: item.delivery_duration,
        approved: item.us_approved_status,
        image:
          item.image ??
          'https://placeimg.dev/286x148?text=Image+Unavailable&textColor=fff',
        available: item.availability,
      }))
      return formattedData
    },
    enabled: !!query || !!filter || !!ingredientId,
    // refetchOnWindowFocus: false, // don't refetch on tab focus
    // refetchOnMount: false, // don't refetch on remount
    // refetchOnReconnect: false, // don't refetch on reconnect
    // retry: false,
  })

  const handleLockIngredient = () => {
    showToast('Locked', `${slug} successfully locked to formula!`, 'success')
  }

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
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.navigate({ to: `/marketplace` })}
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ChevronLeft className="mr-1 h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold">Supplier list</h1>
        </div>
        <button
          onClick={handleLockIngredient}
          className="rounded-full border border-gray-400 px-4 py-2 hover:bg-[#F4DD5F] hover:border-transparent cursor-pointer"
        >
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
