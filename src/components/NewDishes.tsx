import React, { useState } from 'react'

interface Dish {
  id: string
  name: string
  description: string
  price: number
  image: string
  isNew: boolean
  category: string
}

const MOCK_DISHES: Dish[] = [
  {
    id: '1',
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with black truffle and parmesan',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1476124369162-f4978d1a23e2?w=400&h=300&fit=crop',
    isNew: true,
    category: 'Main Course'
  },
  {
    id: '2',
    name: 'Seared Scallops',
    description: 'Pan-seared scallops with lemon butter sauce',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    isNew: true,
    category: 'Seafood'
  },
  {
    id: '3',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with herb crust and seasonal vegetables',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    isNew: false,
    category: 'Seafood'
  },
  {
    id: '4',
    name: 'Mushroom Pasta',
    description: 'Fresh pappardelle with wild mushrooms and truffle oil',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    isNew: true,
    category: 'Pasta'
  },
  {
    id: '5',
    name: 'Beef Wellington',
    description: 'Prime beef tenderloin wrapped in mushroom duxelles and pastry',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    isNew: false,
    category: 'Main Course'
  },
  {
    id: '6',
    name: 'Crispy Duck Confit',
    description: 'Slow-cooked duck leg with cherry gastrique',
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
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-600'
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
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* New Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                    ✨ NEW
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                      {dish.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-600">
                      ${dish.price.toFixed(2)}
                    </span>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">
              No new dishes in this category yet. Check back soon!
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-amber-600 mb-2">
                {newDishes.length}
              </p>
              <p className="text-slate-600 font-medium">New Dishes Available</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-amber-600 mb-2">
                {categories.length - 1}
              </p>
              <p className="text-slate-600 font-medium">Categories</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-amber-600 mb-2">
                ${(newDishes.reduce((sum, dish) => sum + dish.price, 0) / newDishes.length).toFixed(2)}
              </p>
              <p className="text-slate-600 font-medium">Average Price</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}