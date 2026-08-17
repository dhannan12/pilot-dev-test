/**
 * StudentsAccessThe — Student pre-order form access page shown after login
 *
 * Features: Login status display, pre-order form access, user welcome message, available menu items display, order submission
 *
 * Ticket: SCRUM-984 | Branch: proto/SCRUM-983
 */

import { useState } from 'react'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  available: boolean
}

interface Student {
  id: string
  name: string
  grade: string
  studentId: string
}

const MOCK_STUDENT: Student = {
  id: 'stu001',
  name: 'Emma Johnson',
  grade: '10',
  studentId: 'S2024001'
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: 'item001',
    name: 'Chicken Caesar Wrap',
    description: 'Grilled chicken, romaine lettuce, parmesan, caesar dressing',
    price: 6.50,
    category: 'Lunch',
    available: true
  },
  {
    id: 'item002',
    name: 'Margherita Pizza Slice',
    description: 'Fresh mozzarella, tomato sauce, basil',
    price: 4.00,
    category: 'Lunch',
    available: true
  },
  {
    id: 'item003',
    name: 'Garden Salad Bowl',
    description: 'Mixed greens, cherry tomatoes, cucumbers, vinaigrette',
    price: 5.50,
    category: 'Lunch',
    available: true
  },
  {
    id: 'item004',
    name: 'Turkey & Cheese Sandwich',
    description: 'Sliced turkey, cheddar cheese, lettuce, tomato on whole wheat',
    price: 5.00,
    category: 'Lunch',
    available: true
  },
  {
    id: 'item005',
    name: 'Pasta Primavera',
    description: 'Penne pasta with seasonal vegetables and light cream sauce',
    price: 6.00,
    category: 'Lunch',
    available: true
  },
  {
    id: 'item006',
    name: 'Apple Juice',
    description: '100% pure apple juice',
    price: 2.00,
    category: 'Beverage',
    available: true
  },
  {
    id: 'item007',
    name: 'Chocolate Chip Cookie',
    description: 'Freshly baked cookie with chocolate chips',
    price: 1.50,
    category: 'Dessert',
    available: true
  }
]

export default function StudentsAccessThe() {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({})
  const [deliveryDate, setDeliveryDate] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => {
      const current = prev[itemId] || 0
      if (current === 0) {
        return { ...prev, [itemId]: 1 }
      }
      const newItems = { ...prev }
      delete newItems[itemId]
      return newItems
    })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      const newItems = { ...selectedItems }
      delete newItems[itemId]
      setSelectedItems(newItems)
    } else {
      setSelectedItems(prev => ({ ...prev, [itemId]: quantity }))
    }
  }

  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((total, [itemId, quantity]) => {
      const item = MOCK_MENU_ITEMS.find(i => i.id === itemId)
      return total + (item?.price || 0) * quantity
    }, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOrderSubmitted(true)
  }

  if (orderSubmitted) {
    return (
      <div data-testid="studentsaccessthe" className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Submitted Successfully!</h2>
            <p className="text-gray-600 mb-4">
              Your pre-order has been received and will be ready for pickup on {deliveryDate}.
            </p>
            <p className="text-lg font-semibold text-gray-900 mb-6">
              Total: ${calculateTotal().toFixed(2)}
            </p>
            <button
              data-testid="studentsaccessthe-new-order"
              onClick={() => {
                setOrderSubmitted(false)
                setSelectedItems({})
                setDeliveryDate('')
                setSpecialInstructions('')
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Place Another Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="studentsaccessthe" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Student Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">School Canteen Pre-Order</h1>
              <p className="text-gray-600">Welcome back, {MOCK_STUDENT.name}!</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Student ID: {MOCK_STUDENT.studentId}</p>
              <p className="text-sm text-gray-600">Grade: {MOCK_STUDENT.grade}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Menu Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Menu Items</h2>
                
                <div data-testid="studentsaccessthe-list" className="space-y-4">
                  {MOCK_MENU_ITEMS.map(item => (
                    <div
                      key={item.id}
                      data-testid="studentsaccessthe-item"
                      className={`border rounded-lg p-4 transition ${
                        selectedItems[item.id] ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <p className="text-lg font-bold text-blue-600">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {selectedItems[item.id] ? (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                data-testid="studentsaccessthe-decrease"
                                onClick={() => updateQuantity(item.id, selectedItems[item.id] - 1)}
                                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-semibold">{selectedItems[item.id]}</span>
                              <button
                                type="button"
                                data-testid="studentsaccessthe-increase"
                                onClick={() => updateQuantity(item.id, selectedItems[item.id] + 1)}
                                className="w-8 h-8 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              data-testid="studentsaccessthe-add"
                              onClick={() => toggleItem(item.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                              Add to Order
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary and Details Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>

                {Object.keys(selectedItems).length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No items selected</p>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      {Object.entries(selectedItems).map(([itemId, quantity]) => {
                        const item = MOCK_MENU_ITEMS.find(i => i.id === itemId)
                        if (!item) return null
                        return (
                          <div key={itemId} className="flex justify-between text-sm">
                            <span className="text-gray-700">
                              {quantity}x {item.name}
                            </span>
                            <span className="font-semibold text-gray-900">
                              ${(item.price * quantity).toFixed(2)}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="border-t pt-3 mb-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-blue-600">${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-4 mb-4">
                  <div>
                    <label htmlFor="delivery-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Date *
                    </label>
                    <input
                      id="delivery-date"
                      type="date"
                      data-testid="studentsaccessthe-date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="special-instructions" className="block text-sm font-medium text-gray-700 mb-1">
                      Special Instructions
                    </label>
                    <textarea
                      id="special-instructions"
                      data-testid="studentsaccessthe-instructions"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      rows={3}
                      placeholder="Allergies, preferences, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  data-testid="studentsaccessthe-submit"
                  disabled={Object.keys(selectedItems).length === 0 || !deliveryDate}
                  className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Submit Pre-Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
