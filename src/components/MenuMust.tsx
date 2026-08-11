import React, { useState } from 'react'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

const MOCK_DATA: MenuSection[] = [
  {
    title: 'Starters',
    items: [
      {
        id: 'starter-1',
        name: 'Bruschetta',
        description: 'Toasted bread with tomatoes, garlic, and basil',
        price: 8.99
      },
      {
        id: 'starter-2',
        name: 'Calamari Fritti',
        description: 'Crispy fried squid with lemon aioli',
        price: 10.99
      },
      {
        id: 'starter-3',
        name: 'Caprese Salad',
        description: 'Fresh mozzarella, tomatoes, and basil',
        price: 9.99
      }
    ]
  },
  {
    title: 'Main',
    items: [
      {
        id: 'main-1',
        name: 'Grilled Salmon',
        description: 'Atlantic salmon with seasonal vegetables and lemon butter',
        price: 24.99
      },
      {
        id: 'main-2',
        name: 'Ribeye Steak',
        description: '12oz prime cut with garlic mashed potatoes',
        price: 32.99
      },
      {
        id: 'main-3',
        name: 'Pasta Carbonara',
        description: 'Classic Italian pasta with pancetta and creamy sauce',
        price: 18.99
      },
      {
        id: 'main-4',
        name: 'Chicken Piccata',
        description: 'Pan-seared chicken with capers and white wine sauce',
        price: 19.99
      }
    ]
  },
  {
    title: 'Desserts',
    items: [
      {
        id: 'dessert-1',
        name: 'Tiramisu',
        description: 'Classic Italian dessert with mascarpone and espresso',
        price: 7.99
      },
      {
        id: 'dessert-2',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center and vanilla ice cream',
        price: 8.99
      },
      {
        id: 'dessert-3',
        name: 'Panna Cotta',
        description: 'Silky Italian cream dessert with berry compote',
        price: 7.99
      }
    ]
  }
]

export default function MenuMust() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">Our Menu</h1>
          <p className="text-lg text-slate-600">Discover our carefully curated selection</p>
        </div>

        {/* Menu Sections */}
        <div className="space-y-12">
          {MOCK_DATA.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 sm:px-8 py-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{section.title}</h2>
              </div>

              {/* Menu Items */}
              <div className="divide-y divide-slate-200">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-6 sm:p-8 cursor-pointer transition-all duration-200 ${
                      selectedItems.includes(item.id)
                        ? 'bg-amber-50 border-l-4 border-amber-600'
                        : 'bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-600 mb-3">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span className="text-lg sm:text-xl font-bold text-amber-700">
                          ${item.price.toFixed(2)}
                        </span>
                        <div
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                            selectedItems.includes(item.id)
                              ? 'bg-amber-600 border-amber-600'
                              : 'border-slate-300 hover:border-amber-600'
                          }`}
                        >
                          {selectedItems.includes(item.id) && (
                            <span className="text-white text-sm font-bold">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 text-sm">
            {selectedItems.length > 0
              ? `You have selected ${selectedItems.length} item${selectedItems.length !== 1 ? 's' : ''}`
              : 'Click on any item to select it'}
          </p>
        </div>
      </div>
    </div>
  )
}