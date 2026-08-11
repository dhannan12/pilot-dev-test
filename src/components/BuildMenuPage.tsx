import React, { useState } from 'react'

const MOCK_MENU_ITEMS = [
  { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, description: 'Classic tomato, mozzarella, basil', available: true },
  { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: 14.99, description: 'Tomato, mozzarella, pepperoni', available: true },
  { id: 3, name: 'Caesar Salad', category: 'Salad', price: 9.99, description: 'Romaine, parmesan, croutons, dressing', available: true },
  { id: 4, name: 'Greek Salad', category: 'Salad', price: 10.99, description: 'Mixed greens, feta, olives, tomatoes', available: false },
  { id: 5, name: 'Spaghetti Carbonara', category: 'Pasta', price: 13.99, description: 'Pasta, eggs, bacon, parmesan', available: true },
  { id: 6, name: 'Fettuccine Alfredo', category: 'Pasta', price: 12.99, description: 'Fettuccine, cream, parmesan', available: true },
  { id: 7, name: 'Chocolate Cake', category: 'Dessert', price: 6.99, description: 'Rich chocolate cake with frosting', available: true },
  { id: 8, name: 'Tiramisu', category: 'Dessert', price: 7.99, description: 'Classic Italian dessert', available: true },
]

const CATEGORIES = ['All', 'Pizza', 'Salad', 'Pasta', 'Dessert']

interface MenuItem {
  id: number
  name: string
  category: string
  price: number
  description: string
  available: boolean
}

interface CartItem extends MenuItem {
  quantity: number
}

export default function BuildMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)

  const filteredItems = selectedCategory === 'All'
    ? MOCK_MENU_ITEMS
    : MOCK_MENU_ITEMS.filter(item => item.category === selectedCategory)

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      )
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Build Your Menu</h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="mr-2">🛒 Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartCount}
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
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
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <span className="text-lg font-bold text-blue-600">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${
                        item.available ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.available ? '✓ Available' : '✗ Unavailable'}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        disabled={!item.available}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          item.available
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className={`lg:col-span-1 ${
            showCart ? 'block' : 'hidden lg:block'
          }`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shopping Cart</h2>
              
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">${item.price.toFixed(2)}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <p className="text-right text-sm text-gray-600 mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="text-2xl font-bold text-blue-600">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}