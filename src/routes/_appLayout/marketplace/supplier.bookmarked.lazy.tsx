import {
  createLazyFileRoute,
  useParams,
  useRouter,
} from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getAllBookmarkedSuppliers } from '@/services/supplierService'
import { SupplierCard } from '@/components/marketPlace/SupplierCard'
import { Loader } from '@/components/Loader'

export const Route = createLazyFileRoute(
  '/_appLayout/marketplace/supplier/bookmarked',
)({
  component: BookmarkedSuppliers,
})

function BookmarkedSuppliers() {
  const { ingredientId, slug } = useParams({ strict: false })
  const router = useRouter()

  const { data, isLoading, error } = useQuery({
    queryKey: ['bookmarkedSuppliers'],
    queryFn: async () => {
      const response: any = await getAllBookmarkedSuppliers()
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
    refetchOnWindowFocus: false, // don't refetch on tab focus
  })

  return (
    <div className="p-6">
      {/* Top Row */}
      {/* Header */}

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.navigate({ to: `/marketplace` })}
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ChevronLeft className="mr-1 h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold">Bookmarked Suppliers</h1>
        </div>
      </div>

      {isLoading && <Loader text="Loading suppliers..." />}

      {error && <div>Error loading suppliers</div>}

      {!isLoading && data && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((supplier: any) => (
            <SupplierCard
              key={supplier.id}
              supplier={supplier}
              isActionable={false}
              ingredientId={ingredientId ? parseInt(ingredientId) : 0}
            />
          ))}
        </div>
      )}

      {/* Grid */}
    </div>
  )
}
