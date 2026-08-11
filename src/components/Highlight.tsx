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
    price: 26.99,
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

interface HighlightProps {
  showOnlyRecommendations?: boolean
}

export default function Highlight({ showOnlyRecommendations = false }: HighlightProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...new Set(MOCK_MENU_ITEMS.map(item => item.category))]
  
  const filteredItems = MOCK_MENU_ITEMS.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory
    const recommendationMatch = !showOnlyRecommendations || item.isChefRecommendation
    return categoryMatch && recommendationMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Menu</h1>
          <p className="text-lg text-slate-600">Chef's Curated Selection</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
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
              className={`rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                item.isChefRecommendation
                  ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 shadow-lg'
                  : 'bg-white border border-slate-200 shadow-md'
              }`}
            >
              {/* Chef Recommendation Badge */}
              {item.isChefRecommendation && (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 text-center font-bold text-sm tracking-wide">
                  ⭐ CHEF'S RECOMMENDATION
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-900 flex-1">{item.name}</h3>
                  <span className="text-2xl font-bold text-amber-600 ml-2">${item.price.toFixed(2)}</span>
                </div>

                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{item.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                  {item.isChefRecommendation && (
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <span key={i} className="text-amber-500 text-lg">★</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-slate-500">No items found in this category.</p>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-600">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-amber-600">{MOCK_MENU_ITEMS.filter(i => i.isChefRecommendation).length}</p>
              <p className="text-slate-600 text-sm">Chef's Recommendations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{MOCK_MENU_ITEMS.length}</p>
              <p className="text-slate-600 text-sm">Total Items</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{categories.length - 1}</p>
              <p className="text-slate-600 text-sm">Categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}