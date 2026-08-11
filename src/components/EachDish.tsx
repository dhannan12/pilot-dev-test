import React, { useState } from 'react'

interface Ingredient {
  id: string
  name: string
  quantity: string
}

interface Dish {
  id: string
  name: string
  description: string
  ingredients: Ingredient[]
  image: string
  price: number
}

const MOCK_DISHES: Dish[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh mozzarella, basil, and tomato sauce on a crispy crust.',
    ingredients: [
      { id: '1-1', name: 'Tomato Sauce', quantity: '200ml' },
      { id: '1-2', name: 'Fresh Mozzarella', quantity: '250g' },
      { id: '1-3', name: 'Fresh Basil', quantity: '10 leaves' },
      { id: '1-4', name: 'Olive Oil', quantity: '2 tbsp' },
      { id: '1-5', name: 'Pizza Dough', quantity: '400g' }
    ],
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
    price: 12.99
  },
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan cheese, croutons, and creamy Caesar dressing.',
    ingredients: [
      { id: '2-1', name: 'Romaine Lettuce', quantity: '300g' },
      { id: '2-2', name: 'Parmesan Cheese', quantity: '100g' },
      { id: '2-3', name: 'Croutons', quantity: '150g' },
      { id: '2-4', name: 'Caesar Dressing', quantity: '150ml' },
      { id: '2-5', name: 'Black Pepper', quantity: 'to taste' }
    ],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    price: 9.99
  },
  {
    id: '3',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon fillet grilled to perfection with lemon butter and seasonal vegetables.',
    ingredients: [
      { id: '3-1', name: 'Salmon Fillet', quantity: '250g' },
      { id: '3-2', name: 'Butter', quantity: '50g' },
      { id: '3-3', name: 'Lemon', quantity: '1' },
      { id: '3-4', name: 'Garlic', quantity: '3 cloves' },
      { id: '3-5', name: 'Mixed Vegetables', quantity: '200g' }
    ],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    price: 18.99
  }
]

export default function EachDish() {
  const [expandedDishId, setExpandedDishId] = useState<string | null>(null)

  const toggleExpanded = (dishId: string) => {
    setExpandedDishId(expandedDishId === dishId ? null : dishId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Dishes</h1>
          <p className="text-lg text-gray-600">Discover our carefully crafted menu with detailed descriptions and ingredients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_DISHES.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-bold text-gray-900">{dish.name}</h2>
                  <span className="text-xl font-bold text-orange-600">${dish.price}</span>
                </div>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{dish.description}</p>

                <button
                  onClick={() => toggleExpanded(dish.id)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 mb-4"
                >
                  {expandedDishId === dish.id ? 'Hide Ingredients' : 'View Ingredients'}
                </button>

                {expandedDishId === dish.id && (
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 animate-in fade-in duration-200">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Ingredients:</h3>
                    <ul className="space-y-2">
                      {dish.ingredients.map((ingredient) => (
                        <li key={ingredient.id} className="flex justify-between text-sm text-gray-700">
                          <span className="font-medium">{ingredient.name}</span>
                          <span className="text-gray-500">{ingredient.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}