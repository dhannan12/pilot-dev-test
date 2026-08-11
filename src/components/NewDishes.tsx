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
    description: 'Fresh Atlantic salmon with seasonal vegetables',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    isNew: false,
    category: 'Seafood'
  },
  {
    id: 4,
    name: 'Miso Glazed Cod',
    description: 'Delicate white fish with miso glaze and bok choy',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1580959375944-abd7e991f971?w=400&h=300&fit=crop',
    isNew: true,
    category: 'Seafood'
  },
  {
    id: 5,
    name: 'Herb Crusted Lamb',
    description: 'Tender lamb chops with rosemary and thyme crust',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=300&fit=crop',
    isNew: false,
    category: 'Main Course'
  },
  {
    id: 6,
    name: 'Beetroot Carpaccio',
    description: 'Thinly sliced roasted beetroot with goat cheese and walnuts',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    isNew: true,
    category: 'Appetizer'
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
              className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                dish.isNew ? 'ring-2 ring-amber-400 ring-offset-2' : ''
              }`}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
                {dish.isNew && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    NEW
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`p-5 ${
                dish.isNew ? 'bg-amber-50' : 'bg-white'
              }`}>
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
                  <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
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