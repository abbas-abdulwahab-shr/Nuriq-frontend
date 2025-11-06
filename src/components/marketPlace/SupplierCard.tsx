import React, { useState } from 'react'
import { CheckCircle, Star, Truck } from 'lucide-react'
import { bookmarkSupplier } from '@/services/supplierService'
import { useToastFunc } from '@/Hooks/useToastFunc'

import { capitalizeText } from '@/utils/utils'

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
  available: string
}

export const SupplierCard: React.FC<{ supplier: Supplier }> = ({
  supplier,
}) => {
  const [hover, setHover] = useState(false)
  const [, setIsBookmarking] = useState(false)
  const { showToast } = useToastFunc()

  const handleBookmarkSupplier = async () => {
    setIsBookmarking(true)
    try {
      const response: any = await bookmarkSupplier(supplier.id)
      showToast(
        'Supplier bookmarked',
        response.message || 'Supplier bookmarked successfully!',
        'success',
      )
    } catch (error: any) {
      showToast(
        'Error',
        error.response.data.detail || 'Failed to bookmark supplier',
        'error',
      )
    } finally {
      setIsBookmarking(false)
    }
  }

  const handleAddIngredientToFormular = () => {
    showToast(
      'Add to formula',
      `${supplier.product} added to formula!`,
      'success',
    )
  }

  return (
    <div className="rounded-xl border border-[#B2B2B2] bg-white shadow-sm overflow-hidden group">
      <div className="flex items-center justify-between mb-2 px-4 pt-4">
        <div className="flex items-center gap-2">
          <img
            src={`https://i.pravatar.cc/32?u=${supplier.id}`}
            alt={supplier.name}
            className="h-[40px] w-[40px] object-cover rounded-full"
          />
          <span className="text-md font-medium text-[#000000]">
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
          <h3 className="text-sm font-semibold leading-[150%]">
            {capitalizeText(supplier.product)}
          </h3>
          <button
            className={`flex items-center gap-2 border ${supplier.available === 'In Stock' ? 'border-[#44AC21]' : 'border-[#FF4D4D]'} ${supplier.available === 'In Stock' ? 'bg-[#EBFCD5]' : 'bg-transparent'} px-3 py-1 rounded-full`}
          >
            <span
              className={`block h-[6px] w-[6px] rounded-full ${supplier.available === 'In Stock' ? 'bg-[#5FC92E]' : 'bg-[#FF4D4D]'}`}
            ></span>
            <span
              className={`text-sm ${supplier.available === 'In Stock' ? 'text-[#44AC21]' : 'text-[#FF4D4D]'}`}
            >
              {supplier.available === 'In Stock' ? 'Available' : 'Unavailable'}
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
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center gap-4">
            <button
              onClick={handleBookmarkSupplier}
              className="rounded-full bg-transparent border border-yellow-400 px-4 py-2 text-sm text-yellow-400 font-medium cursor-pointer"
            >
              Bookmark
            </button>
            <button
              onClick={handleAddIngredientToFormular}
              className="rounded-full bg-yellow-400 px-4 py-2 text-sm text-[#312C13] font-medium cursor-pointer"
            >
              Add to formula
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
