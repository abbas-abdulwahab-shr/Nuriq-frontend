import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { ArrowLeft, Download } from 'lucide-react'
import { NutritionTable } from '@/components/formular/NutritionTable'
import { ProgressBar } from '@/components/formular/ProgressBar'
import aiStarIcon from '/chatIcons/AI-stars.png'
import productMockup from '/mock-product.png'

export const Route = createLazyFileRoute('/formular/summary')({
  component: FormularSummaryComponent,
})

function FormularSummaryComponent() {
  const router = useRouter()

  const handleGoBack = () => {
    router.navigate({ to: '/formular' })
  }
  const supplierData = [
    { label: 'Jeremy Lynn', value: 60 },
    { label: 'Jessy Vaughn', value: 80 },
    { label: 'Felicity Cawley', value: 45 },
  ]

  const nutritionRows = [
    { nutrient: 'Total fat', amount: '0 g', daily: '0%' },
    { nutrient: 'Sodium', amount: '5 g', daily: '3%' },
    { nutrient: 'Total Carbohydrate', amount: '7 g', daily: '15%' },
    { nutrient: 'Sugar', amount: '0 g', daily: '0%' },
    { nutrient: 'Protein', amount: '2 g', daily: '12%' },
    { nutrient: 'Vitamin C', amount: '1.5 g', daily: '25%' },
    { nutrient: 'Iodine (Sea Moss)', amount: '0 g', daily: '40%' },
  ]

  const AssistantAnalysis = [
    {
      title: '💰 Estimated Cost per Unit: $5.24',
      description: 'Based on quantities and price per unit on the table.',
    },
    {
      title: '💡 Potential Savings: 8%',
      description: 'If Monk Fruit is swapped for Stevia.',
    },
    {
      title: '🌱 Sustainability Score: 8.5/10',
      description:
        '80% ingredients sourced locally or regionally. All certified organic.',
    },
    {
      title: '📦 Batch Cost: $24.00',
      description: 'For a batch of 100 bottles at 250ml each',
    },
    {
      title: '⚠️ Allergen Alerts: None detected',
      description: 'All ingredients plant-based. no allergens presence.',
    },
  ]

  return (
    <div className="p-6 bg-[#F5F5F5] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center gap-2 text-gray-700 hover:text-black">
          <ArrowLeft size={20} onClick={handleGoBack} />
          <span className="font-semibold">Formula module</span> /{' '}
          <span className="">COGS & Formula Summary</span>
        </button>
        <button className="flex items-center gap-2 bg-[#F4DD5F] hover:bg-yellow-500 text-black px-4 py-2 rounded-full font-medium">
          <Download size={18} />
          Export to Brief
        </button>
      </div>

      {/* Title */}

      <div className="border border-[#D9D9D9] rounded-2xl p-6 space-y-6">
        <h2 className="text-lg text-[#000000] font-semibold mb-4">
          Producing Sparkling Sea moss tonic
        </h2>

        {/* Assistant Analysis */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D9D9D9]">
          <p className="mb-4 text-[20px] text-[#6C6C6C]">Assistant Analysis</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {AssistantAnalysis.map((item, idx) => (
              <div
                key={item.title}
                className={`pb-6 ${idx !== 2 ? 'border-r border-gray-200' : ''} ${idx !== 0 && idx !== 3 ? 'pl-6' : 'pl-2'}`}
              >
                <div className="max-w-[337px]">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-[16px]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="font-semibold mt-4">Suggestions</p>
            <div className="flex items-center gap-3">
              <span className="text-[18px]">Swap Monk fruit for Stevia</span>
              <button className="px-4 py-2 rounded-full font-medium border border-[#312C13] flex items-center gap-2">
                <span>Accept swap</span>
                <img
                  src={aiStarIcon}
                  alt="ai-stats"
                  className="w-[18.33px] h-[18.33px]"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-3 gap-6 h-[380px]">
          {/* Left column */}
          <div className="space-y-6 col-span-2">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 h-[380px] overflow-y-scroll">
              <h3 className="text-[18px] text-[#6C6C6C] mb-4">
                Mock Nutritional facts
              </h3>
              <p className="font-semibold text-lg mb-2">
                Serving Size: 250 ml (1 bottle)
              </p>
              <p className="font-semibold text-lg mb-12">Calories: 250</p>
              <p className="text-sm mt-2 font-semibold mb-3">Key note</p>
              <ul className="list-disc ml-6 text-sm text-[#1A1A1A]">
                <li className="mb-6">
                  Sea Moss contributes trace minerals like iodine and iron.
                </li>
                <li className="mb-6">
                  Monk fruit keeps sugar content at 0 g while adding sweetness.
                </li>
                <li className="mb-6">
                  Lemon juice adds Vitamin C for immune support.
                </li>
              </ul>
            </div>
          </div>
          {/* Right column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 h-[380px] overflow-y-scroll">
              <h3 className="font-semibold mb-4">Supplier index</h3>
              {supplierData.map((s) => (
                <ProgressBar key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          <strong>Disclaimer:</strong> This label is auto-generated for
          presentation only and is not legally compliant for retail packaging.
        </p>

        <div className="flex lg:flex-row flex-col lg:justify-between gap-6">
          <div>
            <div className="">
              <div className="flex items-center gap-6 mb-2">
                <span className="text-[18px] font-semibold">
                  Product mockup
                </span>
                <button className="px-4 py-2 rounded-full font-medium border border-[#312C13] flex items-center gap-2">
                  <span className="text-[#312C13]">Refresh image</span>
                  <img
                    src={aiStarIcon}
                    alt="ai-stats"
                    className="w-[18.33px] h-[18.33px]"
                  />
                </button>
              </div>

              <img
                src={productMockup}
                alt="Product mockup"
                className="rounded-xl h-[492px] w-[709px] object-cover"
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-3">Nutritional facts</h3>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 h-[492px] w-[515px] overflow-y-scroll">
              <NutritionTable rows={nutritionRows} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
