/**
 * UserMakesA — Coffee shop purchase interface with rewards points tracking
 *
 * Features: product selection, cart management, rewards calculation, purchase completion, points balance display
 *
 * Ticket: SCRUM-1154 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
  pointsEarned: number
}

interface CartItem extends Product {
  quantity: number
}

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Espresso', price: 3.50, pointsEarned: 35 },
  { id: 2, name: 'Latte', price: 4.75, pointsEarned: 48 },
  { id: 3, name: 'Cappuccino', price: 4.50, pointsEarned: 45 },
  { id: 4, name: 'Americano', price: 3.25, pointsEarned: 33 },
  { id: 5, name: 'Mocha', price: 5.25, pointsEarned: 53 },
  { id: 6, name: 'Cold Brew', price: 4.00, pointsEarned: 40 },
  { id: 7, name: 'Macchiato', price: 4.25, pointsEarned: 43 }
]

export default function UserMakesA() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [rewardsPoints, setRewardsPoints] = useState(250)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [lastEarnedPoints, setLastEarnedPoints] = useState(0)

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: number) => {
    const existingItem = cart.find(item => item.id === productId)
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ))
    } else {
      setCart(cart.filter(item => item.id !== productId))
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const calculateTotalPoints = () => {
    return cart.reduce((sum, item) => sum + (item.pointsEarned * item.quantity), 0)
  }

  const completePurchase = () => {
    const pointsEarned = calculateTotalPoints()
    setLastEarnedPoints(pointsEarned)
    setRewardsPoints(rewardsPoints + pointsEarned)
    setShowConfirmation(true)
    setCart([])
    setTimeout(() => setShowConfirmation(false), 5000)
  }

  const totalAmount = calculateTotal()
  const totalPoints = calculateTotalPoints()

  return (
    <div data-testid="usermakesa" className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Coffee Shop</h1>
          <div className="flex items-center gap-4">
            <div className="bg-amber-600 text-white px-6 py-3 rounded-lg shadow-md">
              <span className="text-sm font-medium">Your Rewards Points</span>
              <p data-testid="usermakesa-points-balance" className="text-2xl font-bold">{rewardsPoints}</p>
            </div>
          </div>
        </header>

        {showConfirmation && (
          <div data-testid="usermakesa-confirmation" className="mb-6 bg-green-100 border-2 border-green-500 text-green-800 p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-1">Purchase Successful! 🎉</h3>
            <p>You earned <strong>{lastEarnedPoints}</strong> rewards points!</p>
            <p>New balance: <strong>{rewardsPoints}</strong> points</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Menu</h2>
            <div data-testid="usermakesa-list" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_PRODUCTS.map(product => (
                <div 
                  key={product.id}
                  data-testid="usermakesa-item"
                  className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow border border-amber-200"
                >
                  <h3 className="text-lg font-bold text-amber-900 mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-amber-700">${product.price.toFixed(2)}</span>
                    <span className="text-sm bg-amber-100 text-amber-700 px-2 py-1 rounded">
                      +{product.pointsEarned} pts
                    </span>
                  </div>
                  <button
                    data-testid="usermakesa-add"
                    onClick={() => addToCart(product)}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Cart</h2>
            <div className="bg-white rounded-lg shadow-md p-5 border border-amber-200 sticky top-8">
              {cart.length === 0 ? (
                <p data-testid="usermakesa-empty" className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div data-testid="usermakesa-cart" className="space-y-3 mb-4">
                    {cart.map(item => (
                      <div key={item.id} data-testid="usermakesa-cart-item" className="flex justify-between items-start border-b border-gray-200 pb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-amber-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            ${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-amber-600">+{item.pointsEarned * item.quantity} points</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            data-testid="usermakesa-decrease"
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded flex items-center justify-center font-bold transition-colors"
                            aria-label="Remove one"
                          >
                            −
                          </button>
                          <button
                            data-testid="usermakesa-increase"
                            onClick={() => addToCart(item)}
                            className="bg-green-500 hover:bg-green-600 text-white w-7 h-7 rounded flex items-center justify-center font-bold transition-colors"
                            aria-label="Add one"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-amber-300 pt-4 space-y-2 mb-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-amber-900">Subtotal:</span>
                      <span data-testid="usermakesa-total" className="font-bold text-amber-700">${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-amber-700">Points to Earn:</span>
                      <span data-testid="usermakesa-points-earn" className="font-bold text-green-600">+{totalPoints}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      data-testid="usermakesa-submit"
                      onClick={completePurchase}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors shadow-md"
                    >
                      Complete Purchase
                    </button>
                    <button
                      data-testid="usermakesa-clear"
                      onClick={clearCart}
                      className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded transition-colors"
                    >
                      Clear Cart
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
