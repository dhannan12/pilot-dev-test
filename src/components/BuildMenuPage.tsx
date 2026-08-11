import React, { useState } from 'react'

const MOCK_MENU_ITEMS = [
  { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, description: 'Classic tomato, mozzarella, basil' },
  { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: 14.99, description: 'Tomato, mozzarella, pepperoni' },
  { id: 3, name: 'Caesar Salad', category: 'Salad', price: 9.99, description: 'Romaine, parmesan, croutons, dressing' },
  { id: 4, name: 'Greek Salad', category: 'Salad', price: 10.99, description: 'Mixed greens, feta, olives, tomatoes' },
  { id: 5, name: 'Spaghetti Carbonara', category: 'Pasta', price: 13.99, description: 'Pasta, eggs, bacon, parmesan' },
  { id: 6, name: 'Fettuccine Alfredo', category: 'Pasta', price: 12.99, description: 'Fettuccine, cream, parmesan' },
  { id: 7, name: 'Tiramisu', category: 'Dessert', price: 6.99, description: 'Mascarpone, coffee, cocoa' },
  { id: 8, name: 'Panna Cotta', category: 'Dessert', price: 5.99, description: 'Vanilla cream, berry compote' },
]

const CATEGORIES = ['All', 'Pizza', 'Salad', 'Pasta', 'Dessert']

export default function BuildMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState<number[]>([])
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')

  const filteredItems = selectedCategory === 'All' 
    ? MOCK_MENU_ITEMS 
    : MOCK_MENU_ITEMS.filter(item => item.category === selectedCategory)

  const handleAddToCart = (itemId: number) => {
    setCart([...cart, itemId])
  }

  const handleRemoveFromCart = (itemId: number) => {
    setCart(cart.filter((id, index) => !(id === itemId && index === cart.indexOf(itemId))))
  }

  const cartTotal = cart.reduce((sum, itemId) => {
    const item = MOCK_MENU_ITEMS.find(m => m.id === itemId)
    return sum + (item?.price || 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-slate-900">Build Your Menu</h1>
          <p className="text-slate-600 mt-2">Create and customize your restaurant menu</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Categories</h2>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
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
                <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32 flex items-center justify-center">
                    <span className="text-white text-5xl">🍽️</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-bold text-blue-600">${item.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Cart & Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Cart Summary</h2>
              
              {/* Cart Items */}
              <div className="mb-6 max-h-64 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map((itemId, index) => {
                      const item = MOCK_MENU_ITEMS.find(m => m.id === itemId)
                      return (
                        <div key={index} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{item?.name}</p>
                            <p className="text-sm text-blue-600">${item?.price.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(itemId)}
                            className="text-red-600 hover:text-red-700 font-bold ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200 my-4"></div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-700">Subtotal:</span>
                  <span className="font-semibold text-slate-900">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-700">Tax (10%):</span>
                  <span className="font-semibold text-slate-900">${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold bg-blue-50 p-3 rounded-lg">
                  <span className="text-slate-900">Total:</span>
                  <span className="text-blue-600">${(cartTotal * 1.1).toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mb-3">
                Checkout
              </button>
              <button
                onClick={() => setCart([])}
                className="w-full bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold py-3 rounded-lg transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}