import React, { useState } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isChefRecommendation: boolean;
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Pan-Seared Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce',
    price: 28.99,
    isChefRecommendation: false,
  },
  {
    id: '2',
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with black truffle and parmesan',
    price: 24.99,
    isChefRecommendation: false,
  },
  {
    id: '3',
    name: 'Wagyu Beef Steak',
    description: 'Premium Japanese Wagyu with seasonal vegetables',
    price: 45.99,
    isChefRecommendation: false,
  },
  {
    id: '4',
    name: 'Lobster Bisque',
    description: 'Silky smooth lobster soup with crème fraîche',
    price: 16.99,
    isChefRecommendation: false,
  },
  {
    id: '5',
    name: 'Duck Confit',
    description: 'Slow-cooked duck leg with cherry gastrique',
    price: 32.99,
    isChefRecommendation: false,
  },
];

const MOCK_USER_ROLE = 'chef';

export default function Highlight() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS);
  const [isChef] = useState(MOCK_USER_ROLE === 'chef');

  const toggleChefRecommendation = (itemId: string) => {
    if (!isChef) return;
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, isChefRecommendation: !item.isChefRecommendation }
          : item
      )
    );
  };

  const chefRecommendationCount = menuItems.filter(
    (item) => item.isChefRecommendation
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Menu Management
          </h1>
          <p className="text-slate-600">
            {isChef
              ? 'You can highlight your chef recommendations'
              : 'View chef recommendations'}
          </p>
        </div>

        {/* Chef Status Badge */}
        <div className="mb-6 flex items-center gap-3">
          <div
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              isChef
                ? 'bg-amber-100 text-amber-800'
                : 'bg-slate-200 text-slate-800'
            }`}
          >
            {isChef ? '👨‍🍳 Chef Mode' : '👤 Guest Mode'}
          </div>
          <div className="text-sm text-slate-600">
            Chef Recommendations: <span className="font-bold">{chefRecommendationCount}</span>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                item.isChefRecommendation
                  ? 'border-amber-400 bg-amber-50 shadow-lg shadow-amber-200'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {item.name}
                    </h3>
                    {item.isChefRecommendation && (
                      <span className="inline-block px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
                        ⭐ Chef's Pick
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mb-3">{item.description}</p>
                  <p className="text-lg font-semibold text-slate-900">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Highlight Button - Only for Chef */}
                {isChef && (
                  <button
                    onClick={() => toggleChefRecommendation(item.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                      item.isChefRecommendation
                        ? 'bg-amber-400 text-amber-900 hover:bg-amber-500 shadow-md'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {item.isChefRecommendation ? '★ Highlighted' : '☆ Highlight'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">ℹ️ Info:</span> Only users with Chef role can
            highlight menu items as chef recommendations. These highlighted items will be
            featured on the menu page.
          </p>
        </div>
      </div>
    </div>
  );
}