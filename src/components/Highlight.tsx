import React, { useState } from 'react'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  isChefRecommendation: boolean
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce',
    price: 28.99,
    isChefRecommendation: false
  },
  {
    id: '2',
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with black truffle and parmesan',
    price: 24.99,
    isChefRecommendation: false
  },
  {
    id: '3',
    name: 'Wagyu Beef Steak',
    description: 'Premium Japanese Wagyu with seasonal vegetables',
    price: 45.99,
    isChefRecommendation: false
  },
  {
    id: '4',
    name: 'Pan-Seared Scallops',
    description: 'Diver scallops with asparagus and hollandaise',
    price: 32.99,
    isChefRecommendation: false
  },
  {
    id: '5',
    name: 'Herb-Crusted Lamb',
    description: 'Rosemary and thyme crusted lamb chops',
    price: 38.99,
    isChefRecommendation: false
  }
]

const MOCK_CHEF_ID = 'chef_001'

export default function Highlight() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS)
  const [isChef] = useState(true)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const toggleChefRecommendation = (itemId: string) => {
    setMenuItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, isChefRecommendation: !item.isChefRecommendation }
          : item
      )
    )
    setSelectedItemId(null)
  }

  const chefRecommendationCount = menuItems.filter(
    item => item.isChefRecommendation
  ).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Chef's Menu Highlights
          </h1>
          <p className="text-slate-600">
            {isChef
              ? 'You can highlight your chef recommendations'
              : 'View chef recommendations'}
          </p>
        </div>

        {/* Chef Status Badge */}
        {isChef && (
          <div className="mb-6 inline-block bg-amber-100 border border-amber-300 rounded-lg px-4 py-2">
            <p className="text-amber-900 font-semibold text-sm">
              ✓ Chef Mode Active
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6 border border-slate-200">
          <p className="text-slate-700">
            <span className="font-bold text-lg text-amber-600">
              {chefRecommendationCount}
            </span>
            <span className="ml-2 text-slate-600">
              of {menuItems.length} items highlighted as chef recommendations
            </span>
          </p>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`rounded-lg border-2 transition-all duration-200 ${
                item.isChefRecommendation
                  ? 'border-amber-400 bg-amber-50 shadow-md'
                  : 'border-slate-200 bg-white shadow-sm hover:shadow-md'
              }`}
            >
              <div className="p-6">
                {/* Item Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-slate-600 text-sm">{item.description}</p>
                  </div>
                  {item.isChefRecommendation && (
                    <div className="ml-3 flex-shrink-0">
                      <span className="inline-block bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
                        ★ Chef Pick
                      </span>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4 pt-3 border-t border-slate-200">
                  <p className="text-2xl font-bold text-slate-900">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Action Button */}
                {isChef && (
                  <button
                    onClick={() => toggleChefRecommendation(item.id)}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      item.isChefRecommendation
                        ? 'bg-amber-400 text-amber-900 hover:bg-amber-500 active:scale-95'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300 active:scale-95'
                    }`}
                  >
                    {item.isChefRecommendation
                      ? '★ Remove from Highlights'
                      : '☆ Add to Highlights'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">About Chef Highlights</h3>
          <p className="text-blue-800 text-sm">
            Only chefs can highlight menu items as recommendations. Highlighted
            items will be prominently displayed to customers with a special
            badge, helping them discover your signature dishes and specialties.
          </p>
        </div>
      </div>
    </div>
  )
}