import { createLazyFileRoute, useRouter } from '@tanstack/react-router'

import { useState } from 'react'
import { useScrappedIngredients } from '@/Hooks/useScrappedIngredient'
import { SearchBar } from '@/components/SearchBar'
import { Filters } from '@/components/Filters'
import { LayoutToggle } from '@/components/LayoutToggle'

import { Loader } from '@/components/Loader'

const categories = [
  { title: 'All', value: '' },
  { title: 'Beverages', value: 'beverages' },
  { title: 'Snacks', value: 'snacks' },
  { title: 'Alt Protein', value: 'protein' },
  { title: 'Supplements', value: 'supplements' },
  { title: 'Organic', value: 'organic' },
  { title: 'Fibers', value: 'fibers' },
]

export const Route = createLazyFileRoute('/_appLayout/marketplace/')({
  component: MarketplaceIndex,
})

function MarketplaceIndex() {
  const [searchProduct, setSearchProduct] = useState('')
  const [category, setCategory] = useState('')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')

  const { scrappedIngredientsData, ingredientLoading, ingredientError } =
    useScrappedIngredients({
      type: category,
      limit: 100,
      skip: 0,
      search: searchProduct,
    })

  const router = useRouter()

  function handleRouteToSupplier(slug: string, ingredientId: number) {
    router.navigate({ to: `/marketplace/supplier/${slug}/${ingredientId}` })
  }
  return (
    <div className="">
      <div className="mx-auto w-[50%]">
        <SearchBar value={searchProduct} onChange={setSearchProduct} />
      </div>
      <div>
        <p className="text-3xl font-bold text-[#1A1A1A] mb-6">
          Ingredients Marketplace
        </p>
        <div className="flex items-center justify-between">
          <Filters
            categories={categories}
            selected={category}
            onSelect={(c) => setCategory(c === category ? '' : c)}
          />

          <LayoutToggle layout={layout} onChange={setLayout} />
        </div>
        {ingredientLoading && <Loader text="Loading ingredients..." />}

        {ingredientError && <div>Error loading ingredients</div>}

        {!ingredientLoading && scrappedIngredientsData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {scrappedIngredientsData.map((ingredient: any, index: number) => (
              <div
                key={index}
                className="border border-[#D9D9D9] p-4 rounded-xl flex flex-col"
              >
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="h-[148px] w-[286px] rounded-xl object-cover mb-2"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/150?text=No+Image'
                  }}
                />
                <p className="font-semibold text-[#1A1A1A] text-[18px] leading-[150%] mb-4">
                  {ingredient.name}
                </p>
                <button
                  onClick={() =>
                    handleRouteToSupplier(ingredient.slug, ingredient.id)
                  }
                  className="bg-[#F4DD5F] text-[#1A1A1A] py-3 px-4 rounded-full text-center"
                >
                  Open suppliers List
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
