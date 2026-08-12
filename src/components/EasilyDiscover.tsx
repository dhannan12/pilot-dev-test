import React, { useState } from 'react'

interface CraftBeverage {
  id: number
  name: string
  brewery: string
  type: string
  abv: number
  ibu: number
  description: string
  rating: number
  imageUrl: string
  isNew: boolean
  price: number
}

const MOCK_BEVERAGES: CraftBeverage[] = [
  {
    id: 1,
    name: 'Hazy Dream IPA',
    brewery: 'Sunset Brewing Co.',
    type: 'IPA',
    abv: 6.8,
    ibu: 55,
    description: 'A juicy, hazy IPA with tropical fruit notes and a smooth finish.',
    rating: 4.5,
    imageUrl: 'https://via.placeholder.com/300x400/FF6B35/FFFFFF?text=Hazy+Dream',
    isNew: true,
    price: 8.99
  },
  {
    id: 2,
    name: 'Midnight Stout',
    brewery: 'Dark Horse Brewery',
    type: 'Stout',
    abv: 9.2,
    ibu: 45,
    description: 'Rich and bold with notes of chocolate, coffee, and vanilla.',
    rating: 4.7,
    imageUrl: 'https://via.placeholder.com/300x400/2D3142/FFFFFF?text=Midnight+Stout',
    isNew: false,
    price: 10.99
  },
  {
    id: 3,
    name: 'Golden Wheat Ale',
    brewery: 'Harvest Fields Brewery',
    type: 'Wheat Ale',
    abv: 5.2,
    ibu: 20,
    description: 'Light and refreshing with citrus and wheat flavors, perfect for any occasion.',
    rating: 4.2,
    imageUrl: 'https://via.placeholder.com/300x400/F4D35E/FFFFFF?text=Golden+Wheat',
    isNew: true,
    price: 7.49
  },
  {
    id: 4,
    name: 'Amber Horizon Lager',
    brewery: 'Mountain Peak Brewing',
    type: 'Lager',
    abv: 5.5,
    ibu: 28,
    description: 'A crisp lager with a balanced malt profile and subtle hop bitterness.',
    rating: 4.3,
    imageUrl: 'https://via.placeholder.com/300x400/EE964B/FFFFFF?text=Amber+Lager',
    isNew: false,
    price: 6.99
  },
  {
    id: 5,
    name: 'Tropical Sour',
    brewery: 'Wild Yeast Collective',
    type: 'Sour',
    abv: 4.8,
    ibu: 15,
    description: 'Tart and tangy with passion fruit, mango, and guava.',
    rating: 4.6,
    imageUrl: 'https://via.placeholder.com/300x400/95B8D1/FFFFFF?text=Tropical+Sour',
    isNew: true,
    price: 9.49
  },
  {
    id: 6,
    name: 'Pine Forest Pale Ale',
    brewery: 'Evergreen Brewing',
    type: 'Pale Ale',
    abv: 5.8,
    ibu: 42,
    description: 'A classic pale ale with piney hop character and caramel malt backbone.',
    rating: 4.4,
    imageUrl: 'https://via.placeholder.com/300x400/588157/FFFFFF?text=Pine+Pale',
    isNew: false,
    price: 7.99
  },
  {
    id: 7,
    name: 'Belgian Tripel Delight',
    brewery: 'Monastery Craft Works',
    type: 'Belgian Tripel',
    abv: 8.5,
    ibu: 30,
    description: 'Complex and spicy with notes of banana, clove, and peppery yeast.',
    rating: 4.8,
    imageUrl: 'https://via.placeholder.com/300x400/C9ADA7/FFFFFF?text=Belgian+Tripel',
    isNew: true,
    price: 11.49
  }
]

export default function EasilyDiscover() {
  const [selectedBeverages, setSelectedBeverages] = useState<number[]>([])
  const [filterType, setFilterType] = useState<string>('all')
  const [showNewOnly, setShowNewOnly] = useState(false)

  const handleSelectBeverage = (id: number) => {
    if (selectedBeverages.includes(id)) {
      setSelectedBeverages(selectedBeverages.filter(bevId => bevId !== id))
    } else {
      setSelectedBeverages([...selectedBeverages, id])
    }
  }

  const filteredBeverages = MOCK_BEVERAGES.filter(beverage => {
    const matchesType = filterType === 'all' || beverage.type === filterType
    const matchesNew = !showNewOnly || beverage.isNew
    return matchesType && matchesNew
  })

  const uniqueTypes = Array.from(new Set(MOCK_BEVERAGES.map(b => b.type)))

  const canProceed = selectedBeverages.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Discover New Craft Beverages
          </h1>
          <p className="text-lg text-gray-600">
            Explore our curated selection of craft beverages. Select at least one to continue.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Type
              </label>
              <select
                id="type-filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="new-only"
                checked={showNewOnly}
                onChange={(e) => setShowNewOnly(e.target.checked)}
                className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="new-only" className="text-sm font-medium text-gray-700">
                Show New Arrivals Only
              </label>
            </div>

            <div className="ml-auto">
              <div className="text-sm text-gray-600">
                Selected: <span className="font-bold text-orange-600">{selectedBeverages.length}</span>
                {!canProceed && (
                  <span className="ml-2 text-red-600 font-medium">
                    (Select at least 1)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Beverage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredBeverages.map(beverage => {
            const isSelected = selectedBeverages.includes(beverage.id)
            return (
              <div
                key={beverage.id}
                onClick={() => handleSelectBeverage(beverage.id)}
                className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 ${
                  isSelected ? 'ring-4 ring-orange-500' : ''
                }`}
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={beverage.imageUrl}
                    alt={beverage.name}
                    className="w-full h-48 object-cover"
                  />
                  {beverage.isNew && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </span>
                  )}
                  {isSelected && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white rounded-full p-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {beverage.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{beverage.brewery}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded">
                      {beverage.type}
                    </span>
                    <span className="text-xs text-gray-600">
                      {beverage.abv}% ABV
                    </span>
                    <span className="text-xs text-gray-600">
                      {beverage.ibu} IBU
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {beverage.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {beverage.rating}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-orange-600">
                      ${beverage.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredBeverages.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-600">
              No beverages match your filters. Try adjusting your selection.
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="fixed bottom-6 right-6">
          <button
            disabled={!canProceed}
            className={`px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 ${
              canProceed
                ? 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-xl cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue with {selectedBeverages.length} {selectedBeverages.length === 1 ? 'item' : 'items'}
          </button>
        </div>
      </div>
    </div>
  )
}
