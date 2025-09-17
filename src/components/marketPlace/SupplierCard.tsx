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
    <div className="rounded-xl border border-[#B2B2B2] bg-white shadow-sm overflow-hidden group">
      <div className="flex items-center justify-between mb-2 px-4 pt-4">
        <div className="flex items-center gap-2">
          <img
            src={`https://i.pravatar.cc/32?u=${supplier.id}`}
            alt={supplier.name}
            className="h-[40px] w-[40px] object-cover rounded-full"
          />
          <span className="text-lg font-medium text-[#000000]">
            {supplier.name}
          </span>
        </div>
        <div className="flex items-center text-yellow-500 text-sm">
          <Star size={16} className="fill-yellow-500" />
          <span className="ml-1">{supplier.rating}</span>
        </div>
      </div>

      <img
        src={supplier.image}
        alt={supplier.product}
        className="h-[148px] w-full object-cover rounded-2xl mb-2 px-4"
      />

      <div
        className="relative px-4 pb-4"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold leading-[150%]">
            {supplier.product}
          </h3>
          <button
            className={`flex items-center gap-2 border ${supplier.available ? 'border-[#44AC21]' : 'border-[#FF4D4D]'} ${supplier.available ? 'bg-[#EBFCD5]' : 'bg-transparent'} px-3 py-1 rounded-full`}
          >
            <span
              className={`block h-[6px] w-[6px] rounded-full ${supplier.available ? 'bg-[#5FC92E]' : 'bg-[#FF4D4D]'}`}
            ></span>
            <span
              className={`text-sm ${supplier.available ? 'text-[#44AC21]' : 'text-[#FF4D4D]'}`}
            >
              {supplier.available ? 'Available' : 'Unavailable'}
            </span>
          </button>
        </div>

        <p className="text-sm text-[#6C6C6C] mb-2">{supplier.description}</p>

        <div className="flex items-center justify-between text-sm font-medium">
          <span className="font-bold">{supplier.price}</span>
          <span>
            MOQ: <span className="font-bold">{supplier.moq}</span>
          </span>
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

        {/* Hover Overlay */}
        {hover && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px] flex items-center justify-center gap-4">
            <button className="rounded-full bg-transparent border border-yellow-400 px-4 py-2 text-sm text-yellow-400 font-medium">
              Bookmark
            </button>
            <button className="rounded-full bg-yellow-400 px-4 py-2 text-sm text-[#312C13] font-medium">
              Add to formular
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
