import {
  createLazyFileRoute,
  useParams,
  useRouter,
} from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Spinner } from '@chakra-ui/react'

import HeaderBar from '@/components/insights/HeaderBar'
import MentionCard from '@/components/insights/MentionCard'
import ProductConceptTabs from '@/components/insights/ProductConceptTabs'
import AssistantRecommendation from '@/components/insights/AssistantRecommendation'
import DemographyChart from '@/components/insights/DemographyChart'
import GenderBiasChart from '@/components/insights/GenderBiasChart'
import GeoLocationChart from '@/components/insights/GeoLocationChart'
import { Loader } from '@/components/Loader'
import { useToastFunc } from '@/Hooks/useToastFunc'
import { createFormularFromInsights } from '@/services/formularServices'

import instagramIcon from '/instagram-logo.png'
import redditIcon from '/pinterest-icon.png'
import tiktokIcon from '/music-icon.png'

import { generateInsightsFromChat } from '@/services/chatServices'
import { updateFormularId } from '@/appStore'

export const Route = createLazyFileRoute(
  '/_appLayout/assistant/insight/$chatId',
)({
  component: InsightsPanelComponent,
})

function InsightsPanelComponent() {
  const { chatId } = useParams({ strict: false })
  const [loading, setLoading] = useState(false)
  const { showToast } = useToastFunc()
  const router = useRouter()

  const { data, isLoading, error } = useQuery({
    queryKey: ['insights-portal', chatId],
    queryFn: async () => {
      const response: any = await generateInsightsFromChat({
        conversationId: Number(chatId),
      })
      return response.data
    },
    enabled: !!chatId,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const mentionsData = []

  if (data) {
    for (const mention in data.top_ingredient_mentions) {
      const value = data.top_ingredient_mentions[mention]
      mentionsData.push({
        platform: mention.toString(),
        count: value.count,
        growth: Number(value.change.replace('%', '')),
        color:
          mention.toString().toLowerCase() === 'tiktok'
            ? 'bg-purple-50'
            : mention.toString().toLowerCase() === 'reddit'
              ? 'bg-yellow-50'
              : 'bg-pink-50',
        icon:
          mention.toString().toLowerCase() === 'tiktok'
            ? tiktokIcon
            : mention.toString().toLowerCase() === 'reddit'
              ? redditIcon
              : instagramIcon,
      })
    }
  }

  const handleBuildFormular = async () => {
    if (!data || isLoading) return
    setLoading(true)
    const product_concept = `${data?.shared_product_concepts[0].title || ''} with ingredients like ${data?.shared_product_concepts[0].key_ingredients.join(', ')}`
    try {
      const response: any = await createFormularFromInsights({
        product_concept,
      })

      if (response && response.data.id) {
        updateFormularId(response.data.id)
      }
      showToast('Success', response.message, 'success')
      router.navigate({ to: `/formula/${response.data.id}` })
    } catch (reqError: any) {
      showToast(
        'Error',
        reqError.response.data.detail || 'Failed to create formula',
        'error',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleViewAllSuppliers = () => {
    showToast('Redirecting', 'Navigating to marketplace...', 'success')
    router.navigate({ to: '/marketplace' })
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {isLoading && <Loader text="Generating insights..." />}
      {error && (
        <>
          <p>Insight Error</p>
          <div className="text-red-500">
            {(error as any).response?.data?.detail || 'Error loading insights.'}
          </div>
        </>
      )}
      {data && (
        <div>
          <HeaderBar />
          <div className="grid grid-cols-1 md:grid-cols-[1fr_499px] gap-6">
            <div className="space-y-6">
              <div className="border border-[#D9D9D9] p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[20px]">
                    Top Ingredient mention{' '}
                    <span className="italic">"{data.top_ingredient}"</span>
                  </p>
                  <button>Last Month</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mentionsData.slice(0, 3).map((m) => (
                    <MentionCard key={m.platform} {...m} />
                  ))}
                </div>
              </div>
              <ProductConceptTabs
                productConcept={data.shared_product_concepts}
                competitors={data.company_competitors}
              />
              <AssistantRecommendation
                opportunities={data.assistant_recommendations.opportunity}
                risk={data.assistant_recommendations.risk}
              />
              <div className="mt-4 flex space-x-3">
                <button
                  disabled={loading || isLoading || !data}
                  onClick={handleViewAllSuppliers}
                  className="px-4 py-2 rounded-full bg-[#F4DD5F] text-[#312C13] font-medium"
                >
                  Explore supplier
                </button>
                <button
                  disabled={loading || isLoading || !data}
                  onClick={handleBuildFormular}
                  className="px-4 py-2 rounded-full border font-medium"
                >
                  Build formula
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
            </div>

            <div className="space-y-6">
              <div className="bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold mb-2">Demography</h3>
                <DemographyChart
                  demoData={Object.values(data.demography_data)}
                  label={Object.keys(data.demography_data)}
                />
              </div>
              <p className="text-sm text-gray-500 mt-0">
                GenZ age group interest fall in 60% of total engagements
              </p>

              <div className="bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold mb-4">Gender Bias</h3>
                <GenderBiasChart
                  demoData={Object.values(data.gender_bias)}
                  label={Object.keys(data.gender_bias)}
                />
              </div>

              <div className="bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold mb-4">Top Geographic location</h3>
                <GeoLocationChart label={data.top_geographic_locations} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
