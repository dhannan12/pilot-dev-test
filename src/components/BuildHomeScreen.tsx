import React, { useState } from 'react'

interface Beverage {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  featured: boolean
  rating: number
}

interface Category {
  id: string
  name: string
  icon: string
  beverageCount: number
}

const MOCK_BEVERAGES: Beverage[] = [
  {
    id: 'bev-1',
    name: 'Mountain Sunrise IPA',
    description: 'Citrus-forward IPA with notes of grapefruit and pine',
    price: 8.99,
    category: 'IPA',
    imageUrl: '/images/mountain-sunrise.jpg',
    featured: true,
    rating: 4.8
  },
  {
    id: 'bev-2',
    name: 'Dark Forest Stout',
    description: 'Rich and creamy stout with chocolate and coffee notes',
    price: 9.49,
    category: 'Stout',
    imageUrl: '/images/dark-forest.jpg',
    featured: true,
    rating: 4.7
  },
  {
    id: 'bev-3',
    name: 'Golden Wheat Ale',
    description: 'Light and refreshing wheat beer with hints of banana',
    price: 7.99,
    category: 'Wheat',
    imageUrl: '/images/golden-wheat.jpg',
    featured: true,
    rating: 4.6
  },
  {
    id: 'bev-4',
    name: 'Crimson Berry Sour',
    description: 'Tart sour ale with raspberry and blackberry flavors',
    price: 10.49,
    category: 'Sour',
    imageUrl: '/images/crimson-berry.jpg',
    featured: true,
    rating: 4.9
  },
  {
    id: 'bev-5',
    name: 'Sunset Amber Lager',
    description: 'Smooth amber lager with caramel malt sweetness',
    price: 8.49,
    category: 'Lager',
    imageUrl: '/images/sunset-amber.jpg',
    featured: true,
    rating: 4.5
  },
  {
    id: 'bev-6',
    name: 'Tropical Haze Pale Ale',
    description: 'Juicy pale ale with mango and pineapple aromatics',
    price: 9.99,
    category: 'Pale Ale',
    imageUrl: '/images/tropical-haze.jpg',
    featured: false,
    rating: 4.7
  }
]

const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'IPA',
    icon: '🍺',
    beverageCount: 24
  },
  {
    id: 'cat-2',
    name: 'Stout',
    icon: '🍻',
    beverageCount: 18
  },
  {
    id: 'cat-3',
    name: 'Wheat',
    icon: '🌾',
    beverageCount: 15
  },
  {
    id: 'cat-4',
    name: 'Sour',
    icon: '🍒',
    beverageCount: 12
  },
  {
    id: 'cat-5',
    name: 'Lager',
    icon: '🍶',
    beverageCount: 20
  }
]

export default function BuildHomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const featuredBeverages = MOCK_BEVERAGES.filter(bev => bev.featured)
  
  const displayedBeverages = selectedCategory
    ? MOCK_BEVERAGES.filter(bev => bev.category === selectedCategory)
    : featuredBeverages

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🍺</div>
              <h1 className="text-2xl font-bold text-gray-900">CraftBev</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                Shop
              </button>
              <button className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                About
              </button>
              <button className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                Contact
              </button>
            </nav>
            <button className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium">
              Cart (0)
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Perfect Craft Beverage
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-amber-100">
            Premium craft beers delivered to your door. Explore our curated selection.
          </p>
          <button className="bg-white text-amber-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-50 transition-colors shadow-lg">
            Explore Collection
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {MOCK_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(
                selectedCategory === category.name ? null : category.name
              )}
              className={`p-6 rounded-xl transition-all transform hover:scale-105 hover:shadow-lg ${
                selectedCategory === category.name
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-gray-800 shadow-md'
              }`}
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <div className="font-semibold text-lg">{category.name}</div>
              <div className={`text-sm mt-1 ${
                selectedCategory === category.name ? 'text-amber-100' : 'text-gray-500'
              }`}>
                {category.beverageCount} items
              </div>
            </button>
          ))}
        </div>
        {selectedCategory && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-amber-600 hover:text-amber-700 font-medium underline"
            >
              Clear filter
            </button>
          </div>
        )}
      </section>

      {/* Featured/Filtered Beverages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {selectedCategory ? `${selectedCategory} Beverages` : 'Featured Selection'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedBeverages.map((beverage) => (
            <div
              key={beverage.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <div className="text-6xl">🍺</div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-xl font-bold text-gray-900 flex-1">
                    {beverage.name}
                  </h4>
                  <div className="flex items-center space-x-1 ml-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {beverage.rating}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {beverage.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium mb-2">
                      {beverage.category}
                    </span>
                    <div className="text-2xl font-bold text-amber-600">
                      ${beverage.price.toFixed(2)}
                    </div>
                  </div>
                  <button className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {displayedBeverages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg">No beverages found in this category.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-lg font-bold mb-4">CraftBev</h5>
              <p className="text-gray-400 text-sm">
                Your source for premium craft beverages delivered fresh to your door.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button className="hover:text-white transition-colors">Shop</button></li>
                <li><button className="hover:text-white transition-colors">About Us</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
                <li><button className="hover:text-white transition-colors">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-4">Connect</h5>
              <p className="text-gray-400 text-sm mb-4">
                Stay updated with our latest offerings and special deals.
              </p>
              <div className="flex space-x-4 text-2xl">
                <button className="hover:text-amber-500 transition-colors">📘</button>
                <button className="hover:text-amber-500 transition-colors">📸</button>
                <button className="hover:text-amber-500 transition-colors">🐦</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2026 CraftBev. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
