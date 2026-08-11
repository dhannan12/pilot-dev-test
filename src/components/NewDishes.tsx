import React, { useState } from 'react'

interface Dish {
  id: number
  name: string
  description: string
  price: number
  isNew: boolean
  image: string
  category: string
}

const MOCK_DISHES: Dish[] = [
  {
    id: 1,
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with black truffle and parmesan',
    price: 24.99,
    isNew: true,
    image: '🍚',
    category: 'Main Course'
  },
  {
    id: 2,
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce',
    price: 28.99,
    isNew: false,
    image: '🐟',
    category: 'Main Course'
  },
  {
    id: 3,
    name: 'Miso Glazed Eggplant',
    description: 'Japanese-inspired eggplant with miso glaze and sesame',
    price: 16.99,
    isNew: true,
    image: '🍆',
    category: 'Vegetarian'
  },
  {
    id: 4,
    name: 'Beef Wellington',
    description: 'Tender beef tenderloin wrapped in mushroom duxelles and pastry',
    price: 34.99,
    isNew: false,
    image: '🥩',
    category: 'Main Course'
  },
  {
    id: 5,
    name: 'Saffron Paella',
    description: 'Spanish rice with seafood, saffron, and bell peppers',
    price: 26.99,
    isNew: true,
    image: '🥘',
    category: 'Main Course'
  },
  {
    id: 6,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 12.99,
    isNew: false,
    image: '🍰',
    category: 'Dessert'
  }
]

export default function NewDishes() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...new Set(MOCK_DISHES.map(dish => dish.category))]
  const filteredDishes = selectedCategory === 'All' 
    ? MOCK_DISHES 
    : MOCK_DISHES.filter(dish => dish.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Our Menu
          </h1>
          <p className="text-lg text-slate-600">
            Discover our latest culinary creations
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-amber-500 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-500 hover:text-amber-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map(dish => (
            <div
              key={dish.id}
              className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* New Badge */}
              {dish.isNew && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    NEW
                  </div>
                </div>
              )}

              {/* Image Section */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-48 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                {dish.image}
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900 flex-1">
                    {dish.name}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {dish.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-600">
                    ${dish.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {dish.category}
                  </span>
                </div>
              </div>

              {/* Hover Effect Border */}
              {dish.isNew && (
                <div className="absolute inset-0 border-2 border-amber-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDishes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">No dishes found in this category.</p>
          </div>
        )}

        {/* New Dishes Count */}
        <div className="mt-12 text-center">
          <p className="text-slate-600">
            <span className="font-bold text-amber-600">
              {MOCK_DISHES.filter(d => d.isNew).length}
            </span>
            {' '}new dishes available this season
          </p>
        </div>
      </div>
    </div>
  )
}