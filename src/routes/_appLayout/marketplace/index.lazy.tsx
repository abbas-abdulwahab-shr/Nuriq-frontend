import {
  createLazyFileRoute,
  useParams,
  useRouter,
} from '@tanstack/react-router'

import { useState } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { Filters } from '@/components/Filters'
import { LayoutToggle } from '@/components/LayoutToggle'

const categories = [
  'Beverages',
  'Snacks',
  'Alt Proteins',
  'Supplements',
  'Organic',
  'Fibers',
]

const ingredients = [
  {
    name: 'Sea Moss',
    image: '/moses-image.jpg',
  },
  {
    name: 'Spirulina',
    image: '/water-sparkling.jpg',
  },
  {
    name: 'Irish Moss',
    image: '/mush-chocolate.jpg',
  },
  {
    name: 'Bladderwrack',
    image: '/water-sparkling.jpg',
  },
  {
    name: 'Kelp',
    image: '/mush-chocolate.jpg',
  },
  {
    name: 'Spirulina',
    image: '/moses-image.jpg',
  },
  {
    name: 'Chlorella',
    image: '/water-sparkling.jpg',
  },
  {
    name: 'Moringa',
    image: '/mush-chocolate.jpg',
  },
  {
    name: 'Wheatgrass',
    image: '/water-sparkling.jpg',
  },
  {
    name: 'Barley Grass',
    image: '/mush-chocolate.jpg',
  },
  {
    name: 'Matcha',
    image: '/moses-image.jpg',
  },
  {
    name: 'Aloe Vera',
    image: '/water-sparkling.jpg',
  },
  {
    name: 'Turmeric',
    image: '/mush-chocolate.jpg',
  },
  {
    name: 'Ginger',
    image: '/moses-image.jpg',
  },
  {
    name: 'Ashwagandha',
    image: '/water-sparkling.jpg',
  },
  {
    name: 'Maca',
    image: '/moses-image.jpg',
  },
  {
    name: 'Camu Camu',
    image: '/mush-chocolate.jpg',
  },
  {
    name: 'Baobab',
    image: '/water-sparkling.jpg',
  },
  {
    name: 'Lucuma',
    image: '/moses-image.jpg',
  },
  {
    name: 'Mesquite',
    image: '/moses-image.jpg',
  },
  {
    name: 'Sacha Inchi',
    image: '/mush-chocolate.jpg',
  },
  {
    name: 'Hemp Seeds',
    image: '/water-sparkling.jpg',
  },
  {
    name: 'Flaxseeds',
    image: '/moses-image.jpg',
  },
]

export const Route = createLazyFileRoute('/_appLayout/marketplace/')({
  component: MarketplaceIndex,
})

function MarketplaceIndex() {
  const [searchProduct, setSearchProduct] = useState('')
  const [category, setCategory] = useState('')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')

  const router = useRouter()
  const params = useParams({ strict: false })

  function handleRouteToSupplier() {
    router.navigate({ to: `/marketplace/supplier/${params.ingredientId}` })
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="border border-[#D9D9D9] p-4 rounded-xl flex flex-col"
            >
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className="h-[148px] w-[286px] rounded-xl object-cover mb-2"
              />
              <p className="font-semibold text-[#1A1A1A] text-[18px] leading-[150%] mb-4">
                {ingredient.name}
              </p>
              <button
                onClick={handleRouteToSupplier}
                className="bg-[#F4DD5F] text-[#1A1A1A] py-3 px-4 rounded-full text-center"
              >
                Open suppliers List
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
