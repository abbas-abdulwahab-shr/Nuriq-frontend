import React, { useState } from 'react'
import { CheckCircle, Star, Truck } from 'lucide-react'

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

export const SupplierCard: React.FC<{ supplier: Supplier }> = ({
  supplier,
}) => {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="relative rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={supplier.image}
        alt={supplier.product}
        className="h-40 w-full object-cover"
      />

      {/* Hover Overlay */}
      {hover && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4">
          <button className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-medium">
            Bookmark
          </button>
          <button className="rounded-full bg-emerald-500 px-4 py-2 text-sm text-white font-medium">
            Add to formular
          </button>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img
              src={`https://i.pravatar.cc/32?u=${supplier.id}`}
              alt={supplier.name}
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-medium">{supplier.name}</span>
          </div>
          <div className="flex items-center text-yellow-500 text-sm">
            <Star size={16} className="fill-yellow-500" />
            <span className="ml-1">{supplier.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold">{supplier.product}</h3>
        <p className="text-sm text-gray-600 mb-2">{supplier.description}</p>

        <div className="flex items-center justify-between text-sm font-medium">
          <span>{supplier.price}</span>
          <span>MOQ: {supplier.moq}</span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Truck size={16} /> {supplier.delivery}
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle size={16} className="text-emerald-500" />
            {supplier.approved ? 'US approved' : 'Pending'}
          </div>
        </div>

        {supplier.available && (
          <span className="absolute top-3 right-3 rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">
            Available
          </span>
        )}
      </div>
    </div>
  )
}
