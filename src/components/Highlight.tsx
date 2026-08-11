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

        {/* Chef Badge */}
        {isChef && (
          <div className="mb-6 inline-block bg-amber-100 border border-amber-300 rounded-lg px-4 py-2">
            <p className="text-amber-900 font-semibold text-sm">
              👨‍🍳 Chef Mode Active
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6 border border-slate-200">
          <p className="text-slate-700">
            <span className="font-semibold text-slate-900">
              {chefRecommendationCount}
            </span>
            {' '}
            of {menuItems.length} items highlighted as chef recommendations
          </p>
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg border-2 transition-all duration-200 ${
                item.isChefRecommendation
                  ? 'border-amber-400 bg-amber-50 shadow-md'
                  : 'border-slate-200 bg-white shadow-sm hover:shadow-md'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-slate-600 text-sm">{item.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-bold text-slate-900">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Chef Recommendation Badge and Button */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  {item.isChefRecommendation && (
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-amber-400 rounded-full"></span>
                      <span className="text-sm font-semibold text-amber-700">
                        Chef's Recommendation
                      </span>
                    </div>
                  )}
                  {!item.isChefRecommendation && <div></div>}

                  {isChef && (
                    <button
                      onClick={() => toggleChefRecommendation(item.id)}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                        item.isChefRecommendation
                          ? 'bg-amber-400 text-amber-900 hover:bg-amber-500 shadow-sm'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {item.isChefRecommendation
                        ? '★ Remove Highlight'
                        : '☆ Highlight'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        {!isChef && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900 text-sm">
              💡 Only chefs can highlight menu items as recommendations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}