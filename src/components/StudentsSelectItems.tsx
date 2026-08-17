/**
 * StudentsSelectItems — Students select items from the daily menu marked as available
 *
 * Features: menu browsing, item selection, quantity control, cart management, availability filtering
 *
 * Ticket: SCRUM-992 | Branch: proto/SCRUM-983
 */

import { useState } from 'react'

interface MenuItem {
  id: string
  name: string
  category: 'breakfast' | 'lunch' | 'snack' | 'drink'
  description: string
  price: number
  dietary: string[]
  available: boolean
}

interface CartItem {
  menuItem: MenuItem
  quantity: number
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Scrambled Eggs & Toast',
    category: 'breakfast',
    description: 'Fluffy scrambled eggs with whole wheat toast and butter',
    price: 4.50,
    dietary: ['vegetarian'],
    available: true
  },
  {
    id: 'm2',
    name: 'Chicken Caesar Wrap',
    category: 'lunch',
    description: 'Grilled chicken, romaine lettuce, parmesan, and caesar dressing',
    price: 6.75,
    dietary: [],
    available: true
  },
  {
    id: 'm3',
    name: 'Vegetarian Pizza Slice',
    category: 'lunch',
    description: 'Fresh tomatoes, bell peppers, mushrooms, and mozzarella',
    price: 5.25,
    dietary: ['vegetarian'],
    available: true
  },
  {
    id: 'm4',
    name: 'Fruit Salad Cup',
    category: 'snack',
    description: 'Mixed seasonal fruits with honey drizzle',
    price: 3.00,
    dietary: ['vegan', 'gluten-free'],
    available: true
  },
  {
    id: 'm5',
    name: 'Beef Burger Meal',
    category: 'lunch',
    description: 'Quarter pound beef patty with lettuce, tomato, and fries',
    price: 7.50,
    dietary: [],
    available: false
  },
  {
    id: 'm6',
    name: 'Chocolate Chip Cookies',
    category: 'snack',
    description: 'Freshly baked cookies with chocolate chips',
    price: 2.50,
    dietary: ['vegetarian'],
    available: true
  },
  {
    id: 'm7',
    name: 'Orange Juice',
    category: 'drink',
    description: 'Freshly squeezed orange juice',
    price: 2.00,
    dietary: ['vegan', 'gluten-free'],
    available: true
  },
  {
    id: 'm8',
    name: 'Grilled Cheese Sandwich',
    category: 'lunch',
    description: 'Classic grilled cheese on sourdough bread',
    price: 4.75,
    dietary: ['vegetarian'],
    available: true
  },
  {
    id: 'm9',
    name: 'Fish & Chips',
    category: 'lunch',
    description: 'Crispy battered fish with golden fries',
    price: 6.50,
    dietary: [],
    available: false
  },
  {
    id: 'm10',
    name: 'Apple Juice',
    category: 'drink',
    description: 'Fresh pressed apple juice',
    price: 2.00,
    dietary: ['vegan', 'gluten-free'],
    available: true
  }
]

export default function StudentsSelectItems() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showCart, setShowCart] = useState(false)

  // Filter to show only available items
  const availableItems = MOCK_MENU_ITEMS.filter(item => item.available)

  // Further filter by category
  const filteredItems = selectedCategory === 'all'
    ? availableItems
    : availableItems.filter(item => item.category === selectedCategory)

  const categories = ['all', 'breakfast', 'lunch', 'snack', 'drink']

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.menuItem.id === item.id)
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.menuItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { menuItem: item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId: string) => {
    const existingItem = cart.find(cartItem => cartItem.menuItem.id === itemId)
    
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem =>
        cartItem.menuItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ))
    } else {
      setCart(cart.filter(cartItem => cartItem.menuItem.id !== itemId))
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.menuItem.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  return (
    <section data-testid="studentsselectitems" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Select Your Items</h1>
              <p className="text-gray-600">Choose from today's available menu items</p>
            </div>
            <button
              data-testid="studentsselectitems-view-cart"
              onClick={() => setShowCart(!showCart)}
              className="relative bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              🛒 Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap gap-2" data-testid="studentsselectitems-category-filter">
            {categories.map(category => (
              <button
                key={category}
                data-testid={`studentsselectitems-category-${category}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Available Items Notice */}
          <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-3 rounded">
            <p className="text-sm text-green-700">
              ✓ Showing {filteredItems.length} available item{filteredItems.length !== 1 ? 's' : ''}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>

        {/* Cart View */}
        {showCart && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6" data-testid="studentsselectitems-cart">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
              <button
                data-testid="studentsselectitems-close-cart"
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-2">Add items from the menu below</p>
              </div>
            ) : (
              <>
                <div data-testid="studentsselectitems-cart-list" className="space-y-3 mb-4">
                  {cart.map(item => (
                    <div
                      key={item.menuItem.id}
                      data-testid="studentsselectitems-cart-item"
                      className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.menuItem.name}</h3>
                        <p className="text-sm text-gray-600">${item.menuItem.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          data-testid={`studentsselectitems-decrease-${item.menuItem.id}`}
                          onClick={() => removeFromCart(item.menuItem.id)}
                          className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 font-bold"
                        >
                          −
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          data-testid={`studentsselectitems-increase-${item.menuItem.id}`}
                          onClick={() => addToCart(item.menuItem)}
                          className="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 font-bold"
                        >
                          +
                        </button>
                        <span className="text-lg font-bold text-gray-800 ml-2 w-20 text-right">
                          ${(item.menuItem.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-indigo-600">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      data-testid="studentsselectitems-clear-cart"
                      onClick={clearCart}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                    >
                      Clear Cart
                    </button>
                    <button
                      data-testid="studentsselectitems-checkout"
                      className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Menu Items Grid */}
        <div data-testid="studentsselectitems-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const quantity = getItemQuantity(item.id)
            
            return (
              <div
                key={item.id}
                data-testid="studentsselectitems-item"
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <div className={`h-2 ${
                  item.category === 'breakfast' ? 'bg-yellow-400' :
                  item.category === 'lunch' ? 'bg-orange-400' :
                  item.category === 'snack' ? 'bg-pink-400' :
                  'bg-blue-400'
                }`}></div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                    <span className="text-xl font-bold text-indigo-600">${item.price.toFixed(2)}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>

                  {item.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.dietary.map(diet => (
                        <span
                          key={diet}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-sm font-semibold text-green-600">
                      ✓ Available
                    </span>
                    
                    {quantity > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          data-testid={`studentsselectitems-remove-${item.id}`}
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 font-bold text-sm"
                        >
                          −
                        </button>
                        <span className="text-lg font-semibold w-6 text-center">{quantity}</span>
                        <button
                          data-testid={`studentsselectitems-add-${item.id}`}
                          onClick={() => addToCart(item)}
                          className="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 font-bold text-sm"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        data-testid={`studentsselectitems-add-${item.id}`}
                        onClick={() => addToCart(item)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No available items in this category</p>
            <p className="text-gray-400 text-sm mt-2">Try selecting a different category</p>
          </div>
        )}
      </div>
    </section>
  )
}
