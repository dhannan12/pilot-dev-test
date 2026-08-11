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
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce',
    price: 22.50,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    isNew: false,
    category: 'Main Course'
  },
  {
    id: 3,
    name: 'Miso Glazed Eggplant',
    description: 'Japanese-inspired eggplant with miso glaze and sesame',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    isNew: true,
    category: 'Vegetarian'
  },
  {
    id: 4,
    name: 'Beef Tenderloin',
    description: 'Prime cut beef with roasted vegetables and red wine reduction',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    isNew: false,
    category: 'Main Course'
  },
  {
    id: 5,
    name: 'Saffron Paella',
    description: 'Spanish rice with seafood, saffron, and bell peppers',
    price: 26.50,
    image: 'https://images.unsplash.com/photo-1476124369162-f4978d1b89e9?w=400&h=300&fit=crop',
    isNew: true,
    category: 'Main Course'
  },
  {
    id: 6,
    name: 'Mushroom Pasta',
    description: 'Fresh tagliatelle with wild mushrooms and truffle oil',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    isNew: false,
    category: 'Pasta'
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
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
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
              className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                dish.isNew ? 'ring-2 ring-amber-400 bg-white' : 'bg-white'
              }`}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                {/* New Badge */}
                {dish.isNew && (
                  <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 px-4 py-1 rounded-full font-bold text-sm shadow-lg animate-pulse">
                    ✨ NEW
                  </div>
                )}
              </div>

              {/* Content */}
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
                  <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDishes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">
              No dishes found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  )
}