/**
 * UserMakesA — Purchase interface for coffee shop with rewards points tracking
 *
 * Features: item selection, purchase processing, points calculation, transaction history, balance display
 *
 * Ticket: SCRUM-1154 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface MenuItem {
  id: number
  name: string
  category: string
  price: number
  pointsValue: number
}

interface Transaction {
  id: number
  items: string[]
  total: number
  pointsEarned: number
  date: string
}

const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: 'Espresso', category: 'Coffee', price: 3.50, pointsValue: 35 },
  { id: 2, name: 'Cappuccino', category: 'Coffee', price: 4.75, pointsValue: 48 },
  { id: 3, name: 'Latte', category: 'Coffee', price: 5.25, pointsValue: 53 },
  { id: 4, name: 'Cold Brew', category: 'Coffee', price: 4.50, pointsValue: 45 },
  { id: 5, name: 'Mocha', category: 'Coffee', price: 5.50, pointsValue: 55 },
  { id: 6, name: 'Croissant', category: 'Pastry', price: 3.25, pointsValue: 33 },
  { id: 7, name: 'Blueberry Muffin', category: 'Pastry', price: 3.75, pointsValue: 38 },
  { id: 8, name: 'Bagel with Cream Cheese', category: 'Food', price: 4.00, pointsValue: 40 },
]

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    items: ['Latte', 'Croissant'],
    total: 8.50,
    pointsEarned: 85,
    date: '2026-08-20',
  },
  {
    id: 2,
    items: ['Espresso'],
    total: 3.50,
    pointsEarned: 35,
    date: '2026-08-21',
  },
  {
    id: 3,
    items: ['Cappuccino', 'Blueberry Muffin'],
    total: 8.50,
    pointsEarned: 85,
    date: '2026-08-22',
  },
  {
    id: 4,
    items: ['Cold Brew', 'Bagel with Cream Cheese'],
    total: 8.50,
    pointsEarned: 85,
    date: '2026-08-23',
  },
  {
    id: 5,
    items: ['Mocha', 'Croissant'],
    total: 8.75,
    pointsEarned: 88,
    date: '2026-08-24',
  },
]

export default function UserMakesA() {
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS)
  const [totalPoints, setTotalPoints] = useState<number>(378) // Sum of initial transactions
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleItemSelect = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    )
  }

  const calculateTotal = () => {
    return selectedItems.reduce((sum, itemId) => {
      const item = MENU_ITEMS.find((i) => i.id === itemId)
      return sum + (item?.price || 0)
    }, 0)
  }

  const calculatePointsEarned = () => {
    return selectedItems.reduce((sum, itemId) => {
      const item = MENU_ITEMS.find((i) => i.id === itemId)
      return sum + (item?.pointsValue || 0)
    }, 0)
  }

  const handlePurchase = () => {
    if (selectedItems.length === 0) return

    const total = calculateTotal()
    const pointsEarned = calculatePointsEarned()
    const itemNames = selectedItems.map(
      (id) => MENU_ITEMS.find((item) => item.id === id)?.name || ''
    )

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      items: itemNames,
      total,
      pointsEarned,
      date: new Date().toISOString().split('T')[0],
    }

    setTransactions([newTransaction, ...transactions])
    setTotalPoints((prev) => prev + pointsEarned)
    setSelectedItems([])
    setShowConfirmation(true)

    setTimeout(() => setShowConfirmation(false), 3000)
  }

  const total = calculateTotal()
  const pointsToEarn = calculatePointsEarned()

  return (
    <div data-testid="usermakesa" className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Coffee Shop Purchase</h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Select items to purchase and earn rewards points</p>
            <div className="text-right">
              <p className="text-sm text-gray-500">Current Rewards Balance</p>
              <p className="text-3xl font-bold text-green-600" data-testid="usermakesa-balance">
                {totalPoints} points
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Message */}
        {showConfirmation && (
          <div
            data-testid="usermakesa-confirmation"
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded animate-pulse"
          >
            <p className="font-bold">Purchase Successful!</p>
            <p>You earned {pointsToEarn} points on this purchase.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Menu Items */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Menu</h2>
            <div data-testid="usermakesa-list" className="space-y-3">
              {MENU_ITEMS.map((item) => (
                <div
                  key={item.id}
                  data-testid="usermakesa-item"
                  onClick={() => handleItemSelect(item.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedItems.includes(item.id)
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-amber-900">${item.price.toFixed(2)}</p>
                      <p className="text-xs text-green-600">+{item.pointsValue} pts</p>
                    </div>
                  </div>
                  {selectedItems.includes(item.id) && (
                    <div className="mt-2 text-sm text-amber-700 font-medium">✓ Selected</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cart & Checkout */}
          <div className="space-y-6">
            {/* Current Cart */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Your Cart</h2>
              {selectedItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No items selected</p>
              ) : (
                <div data-testid="usermakesa-cart" className="space-y-3">
                  <div className="space-y-2">
                    {selectedItems.map((itemId) => {
                      const item = MENU_ITEMS.find((i) => i.id === itemId)
                      return item ? (
                        <div
                          key={itemId}
                          className="flex justify-between items-center py-2 border-b"
                        >
                          <span className="text-gray-700">{item.name}</span>
                          <span className="font-semibold">${item.price.toFixed(2)}</span>
                        </div>
                      ) : null
                    })}
                  </div>

                  <div className="pt-4 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold text-gray-700">Total:</span>
                      <span className="text-2xl font-bold text-amber-900">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-green-600">Points to earn:</span>
                      <span className="text-lg font-bold text-green-600">
                        +{pointsToEarn} points
                      </span>
                    </div>
                  </div>

                  <button
                    data-testid="usermakesa-purchase"
                    onClick={handlePurchase}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Complete Purchase
                  </button>
                  <button
                    data-testid="usermakesa-clear"
                    onClick={() => setSelectedItems([])}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Recent Transactions</h2>
              <div data-testid="usermakesa-transactions" className="space-y-3 max-h-96 overflow-y-auto">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    data-testid="usermakesa-transaction"
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {transaction.items.join(', ')}
                        </p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-amber-900">
                          ${transaction.total.toFixed(2)}
                        </p>
                        <p className="text-sm text-green-600">
                          +{transaction.pointsEarned} pts
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
