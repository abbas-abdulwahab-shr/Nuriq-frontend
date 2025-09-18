import { useState } from 'react'
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'
import FormulaTable from '@/components/formular/FormulaTable'
import aiStarIcon from '/chatIcons/AI-stars.png'
import AddIngredient from '/add-ingredient.png'

export const Route = createLazyFileRoute('/formular/')({
  component: FormularModulePage,
})

function FormularModulePage() {
  const [ingredients] = useState(dummyData)

  const router = useRouter()

  const totalItems = ingredients.length
  const totalQuantity = ingredients.reduce((a, i) => a + i.weight, 0)
  const totalCost = ingredients.reduce((a, i) => a + i.price, 0)
  const costPerUnit = (totalCost / totalQuantity).toFixed(2)

  const handleCalculationSummary = () => {
    router.navigate({ to: '/formular/summary' })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Formula module</h1>
        <div className="flex items-center gap-3">
          <button
            className="bg-[#F4DD5F] px-4 py-2 rounded-full font-medium border border-[#312C13] flex items-center gap-2"
            onClick={handleCalculationSummary}
          >
            <span>Run calculation</span>
            <img
              src={aiStarIcon}
              alt="ai-stats"
              className="w-[18.33px] h-[18.33px]"
            />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="border border-gray-300 rounded-xl p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full px-4 py-2"
            style={{ width: '40%' }}
          />

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-full font-medium border border-black flex items-center gap-2">
              <span>Add ingredient</span>
              <img
                src={AddIngredient}
                alt="add-ingredient"
                className="w-[18.33px] h-[18.33px]"
              />
            </button>
            <ExportDropdown />
          </div>
        </div>

        {/* Product concept */}
        <div className="flex flex-col gap-3 mb-4">
          <p className="font-semibold">Product concept:</p>
          <div className="flex items-center gap-3">
            <span className="text-[18px]">Sparkling Sea moss tonic</span>
            <button className="px-4 py-2 rounded-full font-medium border border-[#312C13] flex items-center gap-2">
              <span>Change idea</span>
              <img
                src={aiStarIcon}
                alt="ai-stats"
                className="w-[18.33px] h-[18.33px]"
              />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="text-sm space-x-4 mb-6">
          <span>
            Total ingredients:{'  '}
            <span className="font-semibold">{totalItems}</span>
          </span>
          <span>
            Total quantity:{' '}
            <span className="font-semibold">{totalQuantity}g</span>
          </span>
          <span>
            Total cost: <span className="font-semibold">${totalCost}</span>
          </span>
          <span>
            Cost/unit: <span className="font-semibold">{costPerUnit}</span>
          </span>
        </div>

        {/* Table Component */}
        <FormulaTable data={ingredients} />
      </div>
    </div>
  )
}

function ExportDropdown() {
  return (
    <div className="relative">
      <button className="border px-4 py-2 rounded-full flex items-center gap-1">
        Export data <ChevronDown size={16} />
      </button>
      {/* Add dropdown logic or menu here */}
    </div>
  )
}

const dummyData = [
  {
    id: 1,
    name: 'Sea moss',
    weight: 0.23,
    unit: 'g',
    supplier: 'Jeremy lynn',
    price: 28,
    allergies: 'SGO',
    regulatory: 'Approved',
    functionDesc: 'Carries hydration',
    notes: 'Adjust for viscosity',
    costUnit: 0.5,
  },
  {
    id: 2,
    name: 'Sea moss',
    weight: 0.23,
    unit: 'g',
    supplier: 'Jeremy lynn',
    price: 28,
    allergies: 'SGO',
    regulatory: 'Approved',
    functionDesc: 'Carries hydration',
    notes: 'Adjust for viscosity',
    costUnit: 0.5,
  },
  {
    id: 3,
    name: 'Sea moss',
    weight: 0.23,
    unit: 'g',
    supplier: 'Jeremy lynn',
    price: 28,
    allergies: 'SGO',
    regulatory: 'Approved',
    functionDesc: 'Carries hydration',
    notes: 'Adjust for viscosity',
    costUnit: 0.5,
  },
  {
    id: 4,
    name: 'Sea moss',
    weight: 0.23,
    unit: 'g',
    supplier: 'Jeremy lynn',
    price: 28,
    allergies: 'SGO',
    regulatory: 'Approved',
    functionDesc: 'Carries hydration',
    notes: 'Adjust for viscosity',
    costUnit: 0.5,
  },
  {
    id: 5,
    name: 'Sea moss',
    weight: 0.23,
    unit: 'g',
    supplier: 'Jeremy lynn',
    price: 28,
    allergies: 'SGO',
    regulatory: 'Approved',
    functionDesc: 'Carries hydration',
    notes: 'Adjust for viscosity',
    costUnit: 0.5,
  },
  {
    id: 6,
    name: 'Sea moss',
    weight: 0.23,
    unit: 'g',
    supplier: 'Jeremy lynn',
    price: 28,
    allergies: 'SGO',
    regulatory: 'Approved',
    functionDesc: 'Carries hydration',
    notes: 'Adjust for viscosity',
    costUnit: 0.5,
  },
  {
    id: 7,
    name: 'Sea moss',
    weight: 0.23,
    unit: 'g',
    supplier: 'Jeremy lynn',
    price: 28,
    allergies: 'SGO',
    regulatory: 'Approved',
    functionDesc: 'Carries hydration',
    notes: 'Adjust for viscosity',
    costUnit: 0.5,
  },
  {
    id: 8,
    name: 'Sea moss',
    weight: 0.23,
    unit: 'g',
    supplier: 'Jeremy lynn',
    price: 28,
    allergies: 'SGO',
    regulatory: 'Approved',
    functionDesc: 'Carries hydration',
    notes: 'Adjust for viscosity',
    costUnit: 0.5,
  },
  {
    id: 9,
    name: 'Sea moss',
    weight: 0.23,
    unit: 'g',
    supplier: 'Jeremy lynn',
    price: 28,
    allergies: 'SGO',
    regulatory: 'Approved',
    functionDesc: 'Carries hydration',
    notes: 'Adjust for viscosity',
    costUnit: 0.5,
  },
  {
    id: 10,
    name: 'Sea moss',
    weight: 0.23,
    unit: 'g',
    supplier: 'Jeremy lynn',
    price: 28,
    allergies: 'SGO',
    regulatory: 'Approved',
    functionDesc: 'Carries hydration',
    notes: 'Adjust for viscosity',
    costUnit: 0.5,
  },
  {
    id: 11,
    name: 'Sea moss',
    weight: 0.23,
    unit: 'g',
    supplier: 'Jeremy lynn',
    price: 28,
    allergies: 'SGO',
    regulatory: 'Approved',
    functionDesc: 'Carries hydration',
    notes: 'Adjust for viscosity',
    costUnit: 0.5,
  },
  {
    id: 12,
    name: 'Sea moss',
    weight: 0.23,
    unit: 'g',
    supplier: 'Jeremy lynn',
    price: 28,
    allergies: 'SGO',
    regulatory: 'Approved',
    functionDesc: 'Carries hydration',
    notes: 'Adjust for viscosity',
    costUnit: 0.5,
  },
  // …additional rows
]
