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
    isChefRecommendation: true,
  },
  {
    id: '2',
    name: 'Ribeye Steak',
    description: 'Premium 12oz cut with garlic mashed potatoes',
    price: 42.99,
    isChefRecommendation: false,
  },
  {
    id: '3',
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with black truffle and parmesan',
    price: 24.99,
    isChefRecommendation: true,
  },
  {
    id: '4',
    name: 'Herb-Roasted Chicken',
    description: 'Free-range chicken with seasonal vegetables',
    price: 22.99,
    isChefRecommendation: false,
  },
  {
    id: '5',
    name: 'Lobster Tail',
    description: 'Maine lobster tail with drawn butter',
    price: 38.99,
    isChefRecommendation: true,
  },
];

const MOCK_USER = {
  id: 'chef-001',
  name: 'Chef Marcus',
  role: 'chef',
};

export default function Highlight() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const isChef = MOCK_USER.role === 'chef';

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

  const handleItemClick = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Menu</h1>
          <p className="text-lg text-slate-600">
            Welcome, {MOCK_USER.name}
          </p>
          {isChef && (
            <p className="text-sm text-amber-600 font-semibold mt-2">
              ⭐ Chef Mode: Click items to highlight as chef recommendations
            </p>
          )}
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                item.isChefRecommendation
                  ? 'border-amber-400 bg-amber-50 shadow-lg shadow-amber-200'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              } ${
                selectedItemId === item.id ? 'ring-2 ring-amber-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {item.name}
                    </h3>
                    {item.isChefRecommendation && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-sm font-semibold">
                        ⭐ Chef's Pick
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mb-3">{item.description}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Highlight Button - Chef Only */}
                {isChef && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleChefRecommendation(item.id);
                    }}
                    className={`ml-4 px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex-shrink-0 ${
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

        {/* Stats Footer */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-slate-200">
          <p className="text-slate-600 text-sm">
            <span className="font-semibold text-slate-900">
              {menuItems.filter((item) => item.isChefRecommendation).length}
            </span>
            {' '}of{' '}
            <span className="font-semibold text-slate-900">{menuItems.length}</span>
            {' '}items highlighted as chef recommendations
          </p>
        </div>
      </div>
    </div>
  );
}