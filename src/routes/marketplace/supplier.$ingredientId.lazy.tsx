import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FilterDropdown } from '@/components/marketPlace/FilterDropdown'
import { SupplierCard } from '@/components/marketPlace/SupplierCard'

interface Supplier {
  id: number
  name: string
  rating: number
  product: string
  description: string
  price: string
  moq: string
  delivery: string
  approved: boolean
  image: string
  available: boolean
}

const dummySuppliers: Array<Supplier> = [
  {
    id: 1,
    name: 'Jeremy Lynn',
    rating: 4.5,
    product: 'Sea Moss',
    description: 'Supports skin hydration, aids digestion',
    price: '3$ per kg',
    moq: '20kg',
    delivery: '5 days',
    approved: true,
    image: '/images/sea-moss.jpg',
    available: true,
  },
  {
    id: 2,
    name: 'Esther Howard',
    rating: 4.5,
    product: 'Irish Moss',
    description: 'Supports skin hydration, aids digestion',
    price: '6$ per kg',
    moq: '40kg',
    delivery: '5 days',
    approved: true,
    image: '/images/irish-moss.jpg',
    available: true,
  },
  // …add as many as you like
]

export const Route = createLazyFileRoute('/marketplace/supplier/$ingredientId')(
  {
    component: MarketPlaceComponent,
  },
)

function MarketPlaceComponent() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<string | null>(null)

  const filtered = dummySuppliers.filter((s) =>
    s.product.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="p-6">
      {/* Top Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search suppliers"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <FilterDropdown
            selected={filter}
            onChange={setFilter}
            options={['Time of delivery', 'MOQ', 'Price', 'Approval']}
          />
          <button className="rounded-full border border-gray-400 px-4 py-2 hover:bg-gray-100">
            Ingredient lockup
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Supplier list</h1>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
    </div>
  )
}
