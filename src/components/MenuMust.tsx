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
        description: 'Classic Italian pasta with eggs, bacon, and parmesan',
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
        description: 'Prime cut with roasted vegetables and red wine reduction',
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
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Restaurant Menu</h1>
          <p className="text-lg text-gray-600">Discover our carefully curated selection</p>
        </div>

        {/* Menu Sections */}
        <div className="space-y-12">
          {MOCK_DATA.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">{section.title}</h2>
              </div>

              {/* Menu Items */}
              <div className="divide-y divide-gray-200">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItemSelection(item.id)}
                    className={`p-6 cursor-pointer transition-all duration-200 ${
                      selectedItems.includes(item.id)
                        ? 'bg-orange-50 border-l-4 border-orange-500'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                      <div className="ml-4 flex items-center gap-4">
                        <span className="text-2xl font-bold text-orange-600 whitespace-nowrap">
                          ${item.price.toFixed(2)}
                        </span>
                        <div
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                            selectedItems.includes(item.id)
                              ? 'bg-orange-500 border-orange-500'
                              : 'border-gray-300 hover:border-orange-500'
                          }`}
                        >
                          {selectedItems.includes(item.id) && (
                            <span className="text-white font-bold">✓</span>
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
          <p className="text-gray-600 text-sm">
            {selectedItems.length > 0
              ? `You have selected ${selectedItems.length} item${selectedItems.length !== 1 ? 's' : ''}`
              : 'Click on any item to add to your selection'}
          </p>
        </div>
      </div>
    </div>
  )
}