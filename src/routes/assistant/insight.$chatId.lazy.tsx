import { createLazyFileRoute } from '@tanstack/react-router'
import { FaInstagram, FaRedditAlien, FaTiktok } from 'react-icons/fa'
import HeaderBar from '@/components/insights/HeaderBar'
import MentionCard from '@/components/insights/MentionCard'
import ProductConceptTabs from '@/components/insights/ProductConceptTabs'
import AssistantRecommendation from '@/components/insights/AssistantRecommendation'
import DemographyChart from '@/components/insights/DemographyChart'
import GenderBiasChart from '@/components/insights/GenderBiasChart'
import GeoLocationChart from '@/components/insights/GeoLocationChart'

export const Route = createLazyFileRoute('/assistant/insight/$chatId')({
  component: InsightsPanelComponent,
})

function InsightsPanelComponent() {
  const mentions = [
    {
      platform: 'TikTok',
      count: 7265,
      growth: 11.01,
      color: 'bg-purple-50',
      icon: <FaTiktok className="text-purple-600" />,
    },
    {
      platform: 'Reddit',
      count: 5365,
      growth: -11.01,
      color: 'bg-yellow-50',
      icon: <FaRedditAlien className="text-orange-600" />,
    },
    {
      platform: 'Instagram',
      count: 8267,
      growth: 11.01,
      color: 'bg-pink-50',
      icon: <FaInstagram className="text-pink-600" />,
    },
  ]

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <HeaderBar />

      {/* Top Mentions */}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_499px] gap-6">
        <div className="space-y-6">
          <div className="border border-[#D9D9D9] p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[20px]">
                Top Ingredient mention{' '}
                <span className="italic">“Sea Moss”</span>
              </p>
              <button>Last Month</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mentions.map((m) => (
                <MentionCard key={m.platform} {...m} />
              ))}
            </div>
          </div>
          <ProductConceptTabs />
          <AssistantRecommendation />
          <div className="mt-4 flex space-x-3">
            <button className="px-4 py-2 rounded-full bg-[#F4DD5F] text-[#312C13] font-medium">
              Explore supplier
            </button>
            <button className="px-4 py-2 rounded-full border font-medium">
              Build formular
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-2">Demography</h3>
            <DemographyChart />
          </div>
          <p className="text-sm text-gray-500 mt-0">
            GenZ age group interest fall in 60% of total engagements
          </p>

          <div className="bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-4">Gender Bias</h3>
            <GenderBiasChart />
          </div>

          <div className="bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-4">Top Geographic location</h3>
            <GeoLocationChart />
          </div>
        </div>
      </div>
    </div>
  )
}
