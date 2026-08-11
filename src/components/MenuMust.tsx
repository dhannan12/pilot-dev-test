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
        description: 'Toasted bread with tomatoes and garlic',
        price: 8.99
      },
      {
        id: 'starter-2',
        name: 'Calamari Fritti',
        description: 'Crispy fried squid with marinara sauce',
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
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with eggs and pancetta',
        price: 16.99
      },
      {
        id: 'main-2',
        name: 'Grilled Salmon',
        description: 'Fresh salmon fillet with lemon butter sauce',
        price: 22.99
      },
      {
        id: 'main-3',
        name: 'Risotto Mushroom',
        description: 'Creamy arborio rice with wild mushrooms',
        price: 18.99
      },
      {
        id: 'main-4',
        name: 'Beef Tenderloin',
        description: 'Prime cut with roasted vegetables',
        price: 28.99
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
        name: 'Panna Cotta',
        description: 'Silky smooth vanilla cream with berry compote',
        price: 8.99
      },
      {
        id: 'dessert-3',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center',
        price: 9.99
      }
    ]
  }
]

export default function MenuMust() {
  const [expandedSection, setExpandedSection] = useState<string | null>('Starters')

  const toggleSection = (sectionTitle: string) => {
    setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">Our Menu</h1>
          <p className="text-lg text-slate-600">Discover our carefully curated selection</p>
        </div>

        {/* Menu Sections */}
        <div className="space-y-6">
          {MOCK_DATA.map((section) => (
            <div key={section.title} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              >
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                <span className={`text-white text-2xl transition-transform duration-300 ${expandedSection === section.title ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Section Items */}
              {expandedSection === section.title && (
                <div className="divide-y divide-slate-200">
                  {section.items.map((item) => (
                    <div key={item.id} className="px-6 py-5 hover:bg-slate-50 transition-colors duration-150">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                        <span className="text-lg font-bold text-blue-600 ml-4 flex-shrink-0">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-slate-600 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 text-sm">All prices are in USD. Please inform us of any dietary restrictions.</p>
        </div>
      </div>
    </div>
  )
}