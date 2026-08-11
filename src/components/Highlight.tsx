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
              ? 'You can highlight your chef recommendations below'
              : 'View chef recommendations'}
          </p>
        </div>

        {/* Chef Status Badge */}
        {isChef && (
          <div className="mb-6 inline-block bg-amber-100 border border-amber-300 rounded-lg px-4 py-2">
            <p className="text-amber-900 font-semibold text-sm">
              ⭐ Chef Mode Active
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-amber-500">
            <p className="text-slate-600 text-sm font-medium">Total Items</p>
            <p className="text-3xl font-bold text-slate-900">{menuItems.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-amber-500">
            <p className="text-slate-600 text-sm font-medium">
              Chef Recommendations
            </p>
            <p className="text-3xl font-bold text-amber-600">
              {chefRecommendationCount}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`rounded-lg shadow-md transition-all duration-200 ${
                item.isChefRecommendation
                  ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400'
                  : 'bg-white border border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-slate-900">
                        {item.name}
                      </h3>
                      {item.isChefRecommendation && (
                        <span className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          ⭐ Chef's Pick
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-bold text-slate-900">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Chef Actions */}
                {isChef && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <button
                      onClick={() => toggleChefRecommendation(item.id)}
                      className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        item.isChefRecommendation
                          ? 'bg-amber-500 text-white hover:bg-amber-600 active:scale-95'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300 active:scale-95'
                      }`}
                    >
                      {item.isChefRecommendation
                        ? '★ Remove from Highlights'
                        : '☆ Add to Highlights'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Message */}
        {chefRecommendationCount === 0 && isChef && (
          <div className="mt-8 text-center p-8 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
            <p className="text-slate-600 text-lg">
              No chef recommendations yet. Start highlighting your favorite dishes!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}