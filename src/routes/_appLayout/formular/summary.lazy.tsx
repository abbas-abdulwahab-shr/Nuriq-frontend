import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { ArrowLeft, Download } from 'lucide-react'
import { useStore } from '@tanstack/react-store'
import { useState } from 'react'
import { Spinner } from '@chakra-ui/react'

import { NutritionTable } from '@/components/formular/NutritionTable'
import { ProgressBar } from '@/components/formular/ProgressBar'
import aiStarIcon from '/chatIcons/AI-stars.png'
import productMockup from '/mock-product.png'
import { Loader } from '@/components/Loader'
import { useToastFunc } from '@/Hooks/useToastFunc'

import { appStore } from '@/appStore'
import { generatetMarkettingCopyUsingId } from '@/services/formularServices'

export const Route = createLazyFileRoute('/_appLayout/formular/summary')({
  component: FormularSummaryComponent,
})

function FormularSummaryComponent() {
  const router = useRouter()
  const lastCreatedMarkettingInfo = useStore(
    appStore,
    (state) => state.lastCreatedMarkettingInfo,
  )
  const lastCreatedFormularId = useStore(
    appStore,
    (state) => state.lastCreatedFormularId,
  )
  const [loadingRegeneration, setLoadingRegeneration] = useState(false)
  const [loading] = useState(false)
  const { showToast } = useToastFunc()

  const handleGoBack = () => {
    router.navigate({ to: '/formular' })
  }
  const supplierData = [
    { label: 'Jeremy Lynn', value: 60 },
    { label: 'Jessy Vaughn', value: 80 },
    { label: 'Felicity Cawley', value: 45 },
  ]

  const assistantAnalysisData = []

  for (const item in lastCreatedMarkettingInfo) {
    const value = lastCreatedMarkettingInfo[item]
    if (item === 'estimated_cost_per_unit') {
      const createdObject = {
        title: '💰 Estimated Cost per Unit: $' + value.amount,
        description: value.description,
      }
      assistantAnalysisData.push(createdObject)
    }
    if (item === 'potential_savings') {
      const createdObject = {
        title: `💡 Potential Savings: ${value.percentage}%`,
        description: value.description,
      }
      assistantAnalysisData.push(createdObject)
    }
    if (item === 'sustainability') {
      const createdObject = {
        title: `🌱 Sustainability Score: ${value.score}/${value.max_score}`,
        description: value.factors.join(', '),
      }
      assistantAnalysisData.push(createdObject)
    }
    if (item === 'batch_cost') {
      const createdObject = {
        title: `📦 Batch Cost: $${value.amount}`,
        description: value.description,
      }
      assistantAnalysisData.push(createdObject)
    }
    if (item === 'allergen_alerts') {
      const createdObject = {
        title: `⚠️ Allergen Alerts: ${value.detected ? 'Detected' : 'None detected'}`,
        description: value.description,
      }
      assistantAnalysisData.push(createdObject)
    }
  }

  const handleMockupRegeneration = async () => {
    setLoadingRegeneration(true)

    try {
      const response: any = await generatetMarkettingCopyUsingId(
        lastCreatedFormularId!,
      )
      console.log('regenerate marketing copy response', response)
      if (response && response.data.id) {
        // we need to save the generated markeeting information
        showToast('Success', response.message, 'success')
      }
    } catch (reqError: any) {
      showToast(
        'Error',
        reqError.response.data.detail || 'Failed to create formular',
        'error',
      )
    } finally {
      setLoadingRegeneration(false)
    }
  }

  return (
    <div className="p-6 bg-[#F5F5F5] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center gap-2 text-gray-700 hover:text-black">
          <ArrowLeft size={20} onClick={handleGoBack} />
          <span className="font-semibold">Formula module</span> /{' '}
          <span className="">COGS & Formula Summary</span>
        </button>
        {lastCreatedMarkettingInfo && (
          <button className="flex items-center gap-2 bg-[#F4DD5F] hover:bg-yellow-500 text-black px-4 py-2 rounded-full font-medium">
            <Download size={18} />
            Export to Brief
          </button>
        )}
      </div>

      {/* Title */}

      {!lastCreatedMarkettingInfo && (
        <Loader text="Generating marketing information..." />
      )}

      {lastCreatedMarkettingInfo && (
        <div className="border border-[#D9D9D9] rounded-2xl p-6 space-y-6">
          <h2 className="text-lg text-[#000000] font-semibold mb-4">
            {lastCreatedMarkettingInfo.product_name}
          </h2>

          {/* Assistant Analysis */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D9D9D9]">
            <p className="mb-4 text-[20px] text-[#6C6C6C]">
              Assistant Analysis
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              {assistantAnalysisData.map((item, idx) => (
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
              {lastCreatedMarkettingInfo.suggestions.map(
                (suggestion: any, index: number) => (
                  <div className="flex items-center gap-3 mb-2" key={index}>
                    <span className="text-[18px]">{suggestion}</span>
                    <button className="px-4 py-2 rounded-full font-medium border border-[#312C13] flex items-center gap-2">
                      <span>Accept swap</span>
                      <img
                        src={aiStarIcon}
                        alt="ai-stats"
                        className="w-[18.33px] h-[18.33px]"
                      />
                      {loading && (
                        <Spinner
                          size="sm"
                          thickness="4px"
                          speed="0.65s"
                          className="ml-3 inline-block align-middle"
                        />
                      )}
                    </button>
                  </div>
                ),
              )}
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
                <p className="font-semibold text-lg mb-12">
                  Calories:{' '}
                  {lastCreatedMarkettingInfo.calories
                    ? lastCreatedMarkettingInfo.calories
                    : 'Not Available'}
                </p>
                <p className="text-sm mt-2 font-semibold mb-3">Key note</p>
                <ul className="list-disc ml-6 text-sm text-[#1A1A1A]">
                  {lastCreatedMarkettingInfo.key_features.map(
                    (feature: string, index: number) => (
                      <li className="mb-6" key={index}>
                        {feature}
                      </li>
                    ),
                  )}
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
                  <button
                    onClick={handleMockupRegeneration}
                    className="px-4 py-2 rounded-full font-medium border border-[#312C13] flex items-center gap-2"
                  >
                    <span className="text-[#312C13]">Refresh image</span>
                    <img
                      src={aiStarIcon}
                      alt="ai-stats"
                      className="w-[18.33px] h-[18.33px]"
                    />
                    {loadingRegeneration && (
                      <Spinner
                        size="sm"
                        thickness="4px"
                        speed="0.65s"
                        className="ml-3 inline-block align-middle"
                      />
                    )}
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
                <NutritionTable
                  rows={lastCreatedMarkettingInfo.nutritional_facts}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
