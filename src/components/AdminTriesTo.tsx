/**
 * AdminTriesTo — Admin menu section management with 20-item limit enforcement
 *
 * Features: item addition form, real-time validation, item limit warning, item removal, count display
 *
 * Ticket: SCRUM-1158 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Espresso', description: 'Rich and bold coffee shot', price: 3.50 },
  { id: '2', name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 4.50 },
  { id: '3', name: 'Latte', description: 'Smooth espresso with steamed milk', price: 4.75 },
  { id: '4', name: 'Americano', description: 'Espresso with hot water', price: 3.75 },
  { id: '5', name: 'Mocha', description: 'Espresso with chocolate and steamed milk', price: 5.25 },
]

const MAX_ITEMS = 20

export default function AdminTriesTo() {
  const [items, setItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (items.length >= MAX_ITEMS) {
      setError(`Cannot add more than ${MAX_ITEMS} items to a menu section.`)
      return
    }

    if (!name.trim() || !description.trim() || !price) {
      setError('All fields are required.')
      return
    }

    const priceNum = parseFloat(price)
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Price must be a valid positive number.')
      return
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      price: priceNum,
    }

    setItems([...items, newItem])
    setName('')
    setDescription('')
    setPrice('')
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
    setError('')
  }

  const isLimitReached = items.length >= MAX_ITEMS

  return (
    <div data-testid="admintriesto" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Menu Section Management</h1>
          <p className="text-gray-600 mb-4">
            Add and manage items in this menu section (Maximum: {MAX_ITEMS} items)
          </p>
          <div className={`text-lg font-semibold ${isLimitReached ? 'text-red-600' : 'text-gray-700'}`}>
            Current items: {items.length} / {MAX_ITEMS}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Item</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {isLimitReached && (
            <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
              Warning: Maximum item limit reached. Remove items to add new ones.
            </div>
          )}

          <form onSubmit={handleAddItem} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                id="name"
                type="text"
                data-testid="admintriesto-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter item name"
                disabled={isLimitReached}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                data-testid="admintriesto-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter item description"
                rows={3}
                disabled={isLimitReached}
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                data-testid="admintriesto-price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                disabled={isLimitReached}
              />
            </div>

            <button
              type="submit"
              data-testid="admintriesto-add"
              disabled={isLimitReached}
              className={`w-full py-3 px-6 rounded-md font-semibold transition-colors ${
                isLimitReached
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLimitReached ? 'Limit Reached' : 'Add Item'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Menu Items</h2>
          <ul data-testid="admintriesto-list" className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                data-testid="admintriesto-item"
                className="flex items-start justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-lg font-bold text-green-600 mt-1">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  data-testid="admintriesto-delete"
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          {items.length === 0 && (
            <p className="text-gray-500 text-center py-8">No items in this section yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
