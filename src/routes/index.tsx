import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { trendingItems } from '../data/trendingMock'
import { SearchBar } from '../components/SearchBar'
import { Filters } from '../components/Filters'
import { IndustryDropdown } from '../components/IndustryDropdown'
import { LayoutToggle } from '../components/LayoutToggle'
import { TrendingCard } from '../components/TrendingCard'
import { TrendingListItem } from '../components/TrendingListItem'
import { NewsFeed } from '../components/NewsFeed'
import { PriceTracker } from '../components/PriceTracker'

import type { TrendingItem } from '../data/trendingMock'

const categories = [
  'Beverages',
  'Snacks',
  'Alt Proteins',
  'Supplements',
  'Organic',
]
const industries = ['TikTok', 'Instagram', 'Twitter', 'Reddit']

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [industry, setIndustry] = useState('')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [visibleCount, setVisibleCount] = useState(6)

  const filtered = trendingItems.filter((item) => {
    const matchCategory = category ? item.category === category : true
    const matchIndustry = industry ? item.industry === industry : true
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchIndustry && matchSearch
  })

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setVisibleCount((prev) => Math.min(prev + 6, filtered.length))
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [filtered.length])

  const visibleItems: Array<TrendingItem> = filtered.slice(0, visibleCount)

  return (
    <div className="">
      <div className="mx-auto w-[50%]">
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <div className="container mx-auto px-4 py-6 lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
        {/* Main Content */}
        <div>
          <p className="text-3xl font-bold text-[#1A1A1A] mb-6">Trending</p>
          <div className="flex items-center justify-between">
            <Filters
              categories={categories}
              selected={category}
              onSelect={(c) => setCategory(c === category ? '' : c)}
            />

            <LayoutToggle layout={layout} onChange={setLayout} />
          </div>

          <IndustryDropdown
            options={industries}
            selected={industry}
            onSelect={setIndustry}
          />

          <div
            className={`grid gap-6 ${
              layout === 'grid'
                ? 'sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {visibleItems.map((item) =>
              layout === 'grid' ? (
                <TrendingCard key={item.id} item={item} />
              ) : (
                <TrendingListItem key={item.id} item={item} />
              ),
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="mt-8 lg:mt-0">
          <NewsFeed />
          <PriceTracker />
        </aside>
      </div>
    </div>
  )
}
