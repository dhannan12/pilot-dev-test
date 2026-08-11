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

const MOCK_CHEF_ROLE = true

export default function Highlight() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS)
  const [isChef] = useState<boolean>(MOCK_CHEF_ROLE)

  const toggleChefRecommendation = (id: string) => {
    if (!isChef) return
    setMenuItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, isChefRecommendation: !item.isChefRecommendation }
          : item
      )
    )
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
            Chef's Menu Recommendations
          </h1>
          <p className="text-slate-600">
            {isChef
              ? 'You can highlight your chef recommendations below'
              : 'View chef recommendations'}
          </p>
        </div>

        {/* Chef Status Badge */}
        <div className="mb-6 flex items-center gap-3">
          <div
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              isChef
                ? 'bg-amber-100 text-amber-800'
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            {isChef ? '👨‍🍳 Chef Mode' : '👤 Guest View'}
          </div>
          <div className="text-sm text-slate-600">
            {chefRecommendationCount} recommendation{chefRecommendationCount !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`rounded-lg border-2 transition-all duration-200 ${
                item.isChefRecommendation
                  ? 'border-amber-400 bg-amber-50 shadow-lg shadow-amber-200'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="p-6">
                {/* Item Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {item.description}
                    </p>
                  </div>
                  {item.isChefRecommendation && (
                    <div className="ml-3 text-2xl">⭐</div>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4 pt-3 border-t border-slate-200">
                  <p className="text-2xl font-bold text-slate-900">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Chef Action Button */}
                {isChef && (
                  <button
                    onClick={() => toggleChefRecommendation(item.id)}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      item.isChefRecommendation
                        ? 'bg-amber-400 text-amber-900 hover:bg-amber-500 shadow-md'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {item.isChefRecommendation
                      ? '★ Remove from Recommendations'
                      : '☆ Add to Recommendations'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-white rounded-lg border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            About Chef Recommendations
          </h2>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-amber-500 font-bold mt-0.5">•</span>
              <span>Only chefs can highlight menu items as recommendations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 font-bold mt-0.5">•</span>
              <span>Highlighted items appear with a star and golden background</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 font-bold mt-0.5">•</span>
              <span>Guests can view all chef recommendations on the menu</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}