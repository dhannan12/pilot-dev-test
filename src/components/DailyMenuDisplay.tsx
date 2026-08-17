/**
 * DailyMenuDisplay — Shows the daily cafeteria menu with automatic updates before 7 AM
 *
 * Features: time-based menu display, meal categories, dietary info, price display, availability status
 *
 * Ticket: SCRUM-988 | Branch: proto/SCRUM-983
 */

import { useState, useEffect } from 'react'

interface MenuItem {
  id: string
  name: string
  category: 'breakfast' | 'lunch' | 'snack' | 'drink'
  description: string
  price: number
  dietary: string[]
  available: boolean
  servingTime: string
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Scrambled Eggs & Toast',
    category: 'breakfast',
    description: 'Fluffy scrambled eggs with whole wheat toast and butter',
    price: 4.50,
    dietary: ['vegetarian'],
    available: true,
    servingTime: '7:00 AM - 9:00 AM'
  },
  {
    id: 'm2',
    name: 'Chicken Caesar Wrap',
    category: 'lunch',
    description: 'Grilled chicken, romaine lettuce, parmesan, and caesar dressing',
    price: 6.75,
    dietary: [],
    available: true,
    servingTime: '11:30 AM - 1:30 PM'
  },
  {
    id: 'm3',
    name: 'Vegetarian Pizza Slice',
    category: 'lunch',
    description: 'Fresh tomatoes, bell peppers, mushrooms, and mozzarella',
    price: 5.25,
    dietary: ['vegetarian'],
    available: true,
    servingTime: '11:30 AM - 1:30 PM'
  },
  {
    id: 'm4',
    name: 'Fruit Salad Cup',
    category: 'snack',
    description: 'Mixed seasonal fruits with honey drizzle',
    price: 3.00,
    dietary: ['vegan', 'gluten-free'],
    available: true,
    servingTime: '9:00 AM - 3:00 PM'
  },
  {
    id: 'm5',
    name: 'Beef Burger Meal',
    category: 'lunch',
    description: 'Quarter pound beef patty with lettuce, tomato, and fries',
    price: 7.50,
    dietary: [],
    available: false,
    servingTime: '11:30 AM - 1:30 PM'
  },
  {
    id: 'm6',
    name: 'Chocolate Chip Cookies',
    category: 'snack',
    description: 'Freshly baked cookies with chocolate chips',
    price: 2.50,
    dietary: ['vegetarian'],
    available: true,
    servingTime: '9:00 AM - 3:00 PM'
  },
  {
    id: 'm7',
    name: 'Orange Juice',
    category: 'drink',
    description: 'Freshly squeezed orange juice',
    price: 2.00,
    dietary: ['vegan', 'gluten-free'],
    available: true,
    servingTime: '7:00 AM - 3:00 PM'
  },
  {
    id: 'm8',
    name: 'Grilled Cheese Sandwich',
    category: 'lunch',
    description: 'Classic grilled cheese on sourdough bread',
    price: 4.75,
    dietary: ['vegetarian'],
    available: true,
    servingTime: '11:30 AM - 1:30 PM'
  }
]

export default function DailyMenuDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const isBeforeSeven = currentTime.getHours() < 7
  const menuLastUpdated = isBeforeSeven 
    ? 'Menu updates at 7:00 AM' 
    : `Last updated: ${currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`

  const categories = ['all', 'breakfast', 'lunch', 'snack', 'drink']

  const filteredItems = selectedCategory === 'all' 
    ? MOCK_MENU_ITEMS 
    : MOCK_MENU_ITEMS.filter(item => item.category === selectedCategory)

  return (
    <section data-testid="daily-menu-display" className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Today's Menu</h1>
              <p className="text-gray-600">{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                isBeforeSeven ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                <span className="w-2 h-2 bg-current rounded-full mr-2"></span>
                {menuLastUpdated}
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap gap-2" data-testid="daily-menu-display-category-filter">
            {categories.map(category => (
              <button
                key={category}
                data-testid={`daily-menu-display-category-${category}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div data-testid="daily-menu-display-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              data-testid="daily-menu-display-item"
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
                !item.available ? 'opacity-60' : ''
              }`}
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
                  <span className="text-xl font-bold text-orange-600">${item.price.toFixed(2)}</span>
                </div>

                <p className="text-gray-600 text-sm mb-3">{item.description}</p>

                <div className="mb-3">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Serving Time:</p>
                  <p className="text-sm text-gray-700">{item.servingTime}</p>
                </div>

                {item.dietary.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
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
                  <span className={`text-sm font-semibold ${
                    item.available ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.available ? '✓ Available' : '✗ Sold Out'}
                  </span>
                  <button
                    data-testid={`daily-menu-display-order-${item.id}`}
                    disabled={!item.available}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      item.available
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {item.available ? 'Order' : 'Unavailable'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No items available in this category</p>
          </div>
        )}

        {/* Update Notice for Pre-7AM */}
        {isBeforeSeven && (
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  The menu will be updated at 7:00 AM. Check back after that time for today's offerings.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
