import React, { useState } from 'react'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  isChefRecommendation: boolean
  category: string
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Pan-Seared Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce',
    price: 28.99,
    isChefRecommendation: true,
    category: 'Main Course'
  },
  {
    id: '2',
    name: 'Grilled Chicken Breast',
    description: 'Herb-marinated chicken with seasonal vegetables',
    price: 22.99,
    isChefRecommendation: false,
    category: 'Main Course'
  },
  {
    id: '3',
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with black truffle and parmesan',
    price: 24.99,
    isChefRecommendation: true,
    category: 'Main Course'
  },
  {
    id: '4',
    name: 'Caesar Salad',
    description: 'Crisp romaine with house-made dressing and croutons',
    price: 14.99,
    isChefRecommendation: false,
    category: 'Appetizer'
  },
  {
    id: '5',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 12.99,
    isChefRecommendation: true,
    category: 'Dessert'
  }
]

export default function Highlight() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...new Set(MOCK_MENU_ITEMS.map(item => item.category))]
  
  const filteredItems = selectedCategory === 'All' 
    ? MOCK_MENU_ITEMS 
    : MOCK_MENU_ITEMS.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-2">Our Menu</h1>
          <p className="text-lg text-slate-600">Discover our chef's finest selections</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl ${
                item.isChefRecommendation
                  ? 'ring-2 ring-amber-400 bg-gradient-to-br from-amber-50 to-white'
                  : 'bg-white'
              }`}
            >
              {/* Chef Recommendation Badge */}
              {item.isChefRecommendation && (
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 flex items-center justify-center gap-2">
                  <span className="text-xl">⭐</span>
                  <span className="font-bold text-sm tracking-wide">CHEF'S RECOMMENDATION</span>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-900 flex-1">{item.name}</h3>
                  <span className="text-2xl font-bold text-amber-600 ml-2">${item.price.toFixed(2)}</span>
                </div>

                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{item.description}</p>

                {/* Category Tag */}
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  {item.isChefRecommendation && (
                    <span className="text-amber-600 font-semibold text-xs">Highly Recommended</span>
                  )}
                </div>
              </div>

              {/* Highlight Border for Chef Recommendations */}
              {item.isChefRecommendation && (
                <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"></div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">No items found in this category</p>
          </div>
        )}

        {/* Legend */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-md border-l-4 border-amber-600">
          <h3 className="text-lg font-bold text-slate-900 mb-3">About Chef's Recommendations</h3>
          <p className="text-slate-700">
            Items marked with ⭐ are specially selected by our chef. These dishes showcase our finest ingredients and culinary expertise. We highly recommend trying them!
          </p>
        </div>
      </div>
    </div>
  )
}