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
        description: 'Classic Italian pasta with eggs, cheese, and pancetta',
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
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">Our Menu</h1>
          <p className="text-lg text-gray-600">Discover our carefully curated selection</p>
        </div>

        {/* Menu Sections */}
        <div className="space-y-12">
          {MOCK_DATA.map((section) => (
            <div key={section.title} className="">
              {/* Section Title */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 pb-3 border-b-4 border-orange-500 inline-block">
                  {section.title}
                </h2>
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedItem === item.id
                        ? 'bg-orange-500 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-900 shadow-md hover:shadow-lg hover:scale-102'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <span className="text-lg font-bold ml-2">${item.price.toFixed(2)}</span>
                    </div>
                    <p className={`text-sm ${
                      selectedItem === item.id ? 'text-orange-100' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-sm">
            Click on any item to see more details
          </p>
        </div>
      </div>
    </div>
  )
}