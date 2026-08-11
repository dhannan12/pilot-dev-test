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
        description: 'Classic Italian pasta with pancetta and parmesan',
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
        description: 'Traditional Italian dessert with mascarpone and espresso',
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
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

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
          {MOCK_DATA.map((section) => (
            <div key={section.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 sm:px-8 py-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{section.title}</h2>
              </div>

              {/* Section Items */}
              <div className="divide-y divide-slate-200">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    className="px-6 sm:px-8 py-6 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-slate-600 text-sm sm:text-base">{item.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl sm:text-2xl font-bold text-amber-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedItem === item.id && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 text-sm">
            Click on any item to add it to your cart
          </p>
        </div>
      </div>
    </div>
  )
}