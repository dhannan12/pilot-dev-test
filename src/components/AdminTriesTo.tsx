/**
 * AdminTriesTo — Admin interface for managing menu section items with 20-item limit enforcement
 *
 * Features: item addition, limit validation, error messaging, item removal, item counter
 *
 * Ticket: SCRUM-1158 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface MenuItem {
  id: number
  name: string
  price: number
  description: string
}

const INITIAL_MENU_ITEMS: MenuItem[] = [
  { id: 1, name: 'Espresso', price: 2.99, description: 'Rich and bold espresso shot' },
  { id: 2, name: 'Cappuccino', price: 4.49, description: 'Classic cappuccino with foam' },
  { id: 3, name: 'Latte', price: 4.99, description: 'Smooth and creamy latte' },
  { id: 4, name: 'Mocha', price: 5.49, description: 'Chocolate-infused coffee drink' },
  { id: 5, name: 'Americano', price: 3.49, description: 'Espresso with hot water' },
  { id: 6, name: 'Cold Brew', price: 4.29, description: 'Smooth cold-steeped coffee' },
  { id: 7, name: 'Macchiato', price: 3.99, description: 'Espresso with a dollop of foam' },
]

export default function AdminTriesTo() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS)
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const MAX_ITEMS = 20

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    // Validate fields
    if (!itemName.trim()) {
      setError('Item name is required')
      return
    }

    if (!itemPrice || parseFloat(itemPrice) <= 0) {
      setError('Valid price is required')
      return
    }

    if (!itemDescription.trim()) {
      setError('Item description is required')
      return
    }

    // Check item limit
    if (menuItems.length >= MAX_ITEMS) {
      setError(`Cannot add more than ${MAX_ITEMS} items to a menu section`)
      return
    }

    // Add new item
    const newItem: MenuItem = {
      id: Math.max(...menuItems.map(item => item.id), 0) + 1,
      name: itemName.trim(),
      price: parseFloat(itemPrice),
      description: itemDescription.trim(),
    }

    setMenuItems([...menuItems, newItem])
    setSuccessMessage(`"${newItem.name}" added successfully!`)
    
    // Clear form
    setItemName('')
    setItemPrice('')
    setItemDescription('')
  }

  const handleRemoveItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id))
    setError('')
    setSuccessMessage('Item removed successfully')
  }

  const itemsRemaining = MAX_ITEMS - menuItems.length

  return (
    <div data-testid="admintriesto" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Menu Section Manager
          </h1>
          <p className="text-gray-600 mb-4">
            Manage items in your menu section (Maximum: {MAX_ITEMS} items)
          </p>
          
          {/* Item Counter */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-1">Current Items</div>
              <div className="text-3xl font-bold text-gray-800">
                {menuItems.length} / {MAX_ITEMS}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-1">Remaining Slots</div>
              <div className={`text-3xl font-bold ${itemsRemaining <= 0 ? 'text-red-600' : itemsRemaining <= 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                {itemsRemaining}
              </div>
            </div>
          </div>

          {/* Add Item Form */}
          <form onSubmit={handleAddItem} className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add New Item
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="item-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  id="item-name"
                  data-testid="admintriesto-name"
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g., Caramel Frappuccino"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="item-price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  id="item-price"
                  data-testid="admintriesto-price"
                  type="number"
                  step="0.01"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  placeholder="e.g., 5.99"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="item-description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="item-description"
                data-testid="admintriesto-description"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="Brief description of the item"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              data-testid="admintriesto-submit"
              type="submit"
              disabled={menuItems.length >= MAX_ITEMS}
              className={`w-full py-2 px-4 rounded-md font-semibold transition-colors ${
                menuItems.length >= MAX_ITEMS
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {menuItems.length >= MAX_ITEMS ? 'Maximum Items Reached' : 'Add Item'}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">{error}</span>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">{successMessage}</span>
              </div>
            </div>
          )}
        </div>

        {/* Menu Items List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Current Menu Items ({menuItems.length})
          </h2>
          
          <div data-testid="admintriesto-list" className="space-y-3">
            {menuItems.map((item) => (
              <div
                key={item.id}
                data-testid="admintriesto-item"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                  <p className="text-lg font-bold text-green-600 mt-2">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  data-testid="admintriesto-remove"
                  onClick={() => handleRemoveItem(item.id)}
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {menuItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No items in this menu section yet.</p>
              <p className="text-sm mt-2">Add your first item using the form above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
