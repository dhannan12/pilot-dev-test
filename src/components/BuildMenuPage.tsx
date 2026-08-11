import React, { useState } from 'react'

const MOCK_MENU_ITEMS = [
  { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, description: 'Classic pizza with tomato and mozzarella', available: true },
  { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: 14.99, description: 'Pizza with pepperoni and cheese', available: true },
  { id: 3, name: 'Caesar Salad', category: 'Salad', price: 8.99, description: 'Fresh romaine with parmesan and croutons', available: true },
  { id: 4, name: 'Greek Salad', category: 'Salad', price: 9.99, description: 'Tomatoes, cucumbers, olives, and feta', available: false },
  { id: 5, name: 'Spaghetti Carbonara', category: 'Pasta', price: 13.99, description: 'Creamy pasta with bacon and eggs', available: true },
  { id: 6, name: 'Fettuccine Alfredo', category: 'Pasta', price: 12.99, description: 'Pasta in rich cream sauce', available: true },
  { id: 7, name: 'Tiramisu', category: 'Dessert', price: 6.99, description: 'Classic Italian dessert', available: true },
  { id: 8, name: 'Panna Cotta', category: 'Dessert', price: 5.99, description: 'Silky smooth Italian cream dessert', available: true },
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

export default function BuildMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [cartItems, setCartItems] = useState<MenuItem[]>([])
  const [showCart, setShowCart] = useState(false)

  const filteredItems = MOCK_MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (item: MenuItem) => {
    setCartItems([...cartItems, item])
  }

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index))
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-orange-600">Build Your Menu</h1>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              🛒 Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-500 text-gray-700"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white text-orange-600 border-2 border-orange-200 hover:border-orange-500'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border-l-4 border-orange-400"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                        <span className="text-2xl font-bold text-orange-500">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                      <button
                        onClick={() => addToCart(item)}
                        disabled={!item.available}
                        className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                          item.available
                            ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {item.available ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No items found matching your search.</p>
                </div>
              )}
            </div>
          </div>

          {/* Cart Sidebar */}
          {showCart && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>
                
                {cartItems.length > 0 ? (
                  <>
                    <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-orange-50 p-3 rounded-lg">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                            <p className="text-orange-600 font-bold">${item.price.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="ml-2 text-red-500 hover:text-red-700 font-bold text-lg"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t-2 border-orange-200 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-gray-800">Total:</span>
                        <span className="text-2xl font-bold text-orange-600">${totalPrice.toFixed(2)}</span>
                      </div>
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition-colors">
                        Checkout
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}