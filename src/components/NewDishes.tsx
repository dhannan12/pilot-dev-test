import React, { useState } from 'react'

interface Dish {
  id: number
  name: string
  description: string
  price: number
  image: string
  isNew: boolean
  category: string
}

const MOCK_DISHES: Dish[] = [
  {
    id: 1,
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with black truffle and parmesan',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1476124369162-f4978d1b89e9?w=400&h=300&fit=crop',
    isNew: true,
    category: 'Main Course'
  },
  {
    id: 2,
    name: 'Seared Scallops',
    description: 'Pan-seared scallops with lemon butter sauce',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    isNew: true,
    category: 'Seafood'
  },
  {
    id: 3,
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with herb crust and seasonal vegetables',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    isNew: false,
    category: 'Seafood'
  },
  {
    id: 4,
    name: 'Miso Glazed Cod',
    description: 'Fresh cod with miso glaze and pickled vegetables',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=400&h=300&fit=crop',
    isNew: true,
    category: 'Seafood'
  },
  {
    id: 5,
    name: 'Beef Wellington',
    description: 'Prime beef tenderloin wrapped in mushroom duxelles and pastry',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    isNew: false,
    category: 'Main Course'
  },
  {
    id: 6,
    name: 'Spiced Duck Breast',
    description: 'Crispy duck breast with five-spice glaze and cherry compote',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    isNew: true,
    category: 'Main Course'
  }
]

export default function NewDishes() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...new Set(MOCK_DISHES.map(dish => dish.category))]
  const filteredDishes = selectedCategory === 'All'
    ? MOCK_DISHES
    : MOCK_DISHES.filter(dish => dish.category === selectedCategory)

  const newDishes = filteredDishes.filter(dish => dish.isNew)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            New Dishes
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

        {/* New Dishes Grid */}
        {newDishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newDishes.map(dish => (
              <div
                key={dish.id}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105"
              >
                {/* New Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                    ✨ NEW
                  </div>
                </div>

                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 flex-1">
                      {dish.name}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
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

                  {/* CTA Button */}
                  <button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-slate-600 mb-4">
              No new dishes in this category yet.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200"
            >
              View All Dishes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}