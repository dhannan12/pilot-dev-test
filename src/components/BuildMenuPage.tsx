import React, { useState } from 'react'

const MOCK_MENU_ITEMS = [
  { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, description: 'Classic tomato, mozzarella, basil' },
  { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: 14.99, description: 'Tomato, mozzarella, pepperoni' },
  { id: 3, name: 'Caesar Salad', category: 'Salad', price: 9.99, description: 'Romaine, parmesan, croutons, dressing' },
  { id: 4, name: 'Greek Salad', category: 'Salad', price: 10.99, description: 'Mixed greens, feta, olives, tomatoes' },
  { id: 5, name: 'Garlic Bread', category: 'Appetizer', price: 5.99, description: 'Toasted bread with garlic butter' },
  { id: 6, name: 'Bruschetta', category: 'Appetizer', price: 7.99, description: 'Toasted bread with tomato and basil' },
  { id: 7, name: 'Tiramisu', category: 'Dessert', price: 6.99, description: 'Classic Italian dessert' },
  { id: 8, name: 'Panna Cotta', category: 'Dessert', price: 7.99, description: 'Creamy Italian custard' }
]

const CATEGORIES = ['All', 'Pizza', 'Salad', 'Appetizer', 'Dessert']

interface MenuItem {
  id: number
  name: string
  category: string
  price: number
  description: string
}

export default function BuildMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState<MenuItem[]>([])
  const [showCart, setShowCart] = useState(false)

  const filteredItems = selectedCategory === 'All'
    ? MOCK_MENU_ITEMS
    : MOCK_MENU_ITEMS.filter(item => item.category === selectedCategory)

  const addToCart = (item: MenuItem) => {
    setCart([...cart, item])
  }

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">Build Your Menu</h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Categories</h2>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-slate-700 border border-slate-300 hover:border-blue-400'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-slate-200"
                >
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-32 flex items-center justify-center">
                    <span className="text-white text-4xl">🍽️</span>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                      <span className="text-lg font-bold text-blue-600">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{item.category}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded font-semibold text-sm transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          {showCart && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Cart</h2>
                {cart.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">Cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                      {cart.map((item, index) => (
                        <div key={index} className="flex justify-between items-start bg-slate-50 p-3 rounded border border-slate-200">
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900 text-sm">{item.name}</p>
                            <p className="text-blue-600 font-bold text-sm">${item.price.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-red-500 hover:text-red-700 font-bold ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-200 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-slate-900">Total:</span>
                        <span className="text-2xl font-bold text-blue-600">${cartTotal.toFixed(2)}</span>
                      </div>
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold transition-colors">
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}