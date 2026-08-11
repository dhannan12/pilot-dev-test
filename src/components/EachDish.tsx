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
  servings: number
  prepTime: string
}

const MOCK_DISHES: Dish[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper. Creamy, savory, and absolutely delicious.',
    ingredients: [
      { id: '1-1', name: 'Spaghetti', quantity: '400g' },
      { id: '1-2', name: 'Eggs', quantity: '4' },
      { id: '1-3', name: 'Pancetta', quantity: '200g' },
      { id: '1-4', name: 'Parmesan Cheese', quantity: '100g' },
      { id: '1-5', name: 'Black Pepper', quantity: 'to taste' },
      { id: '1-6', name: 'Salt', quantity: 'to taste' }
    ],
    image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=400&h=300&fit=crop',
    servings: 4,
    prepTime: '20 minutes'
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'A simple yet elegant pizza topped with fresh mozzarella, basil, tomato sauce, and olive oil. The perfect balance of flavors.',
    ingredients: [
      { id: '2-1', name: 'Pizza Dough', quantity: '500g' },
      { id: '2-2', name: 'Tomato Sauce', quantity: '200ml' },
      { id: '2-3', name: 'Fresh Mozzarella', quantity: '250g' },
      { id: '2-4', name: 'Fresh Basil', quantity: '10 leaves' },
      { id: '2-5', name: 'Olive Oil', quantity: '3 tbsp' },
      { id: '2-6', name: 'Salt & Pepper', quantity: 'to taste' }
    ],
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
    servings: 2,
    prepTime: '30 minutes'
  },
  {
    id: '3',
    name: 'Chicken Tikka Masala',
    description: 'Tender chicken pieces marinated in yogurt and spices, cooked in a creamy tomato-based sauce. A beloved Indian favorite.',
    ingredients: [
      { id: '3-1', name: 'Chicken Breast', quantity: '600g' },
      { id: '3-2', name: 'Yogurt', quantity: '200ml' },
      { id: '3-3', name: 'Tomato Sauce', quantity: '400ml' },
      { id: '3-4', name: 'Ginger-Garlic Paste', quantity: '2 tbsp' },
      { id: '3-5', name: 'Garam Masala', quantity: '1 tsp' },
      { id: '3-6', name: 'Cream', quantity: '100ml' },
      { id: '3-7', name: 'Cilantro', quantity: 'for garnish' }
    ],
    image: 'https://images.unsplash.com/photo-1565557623814-550f382fe5b7?w=400&h=300&fit=crop',
    servings: 4,
    prepTime: '45 minutes'
  }
]

export default function EachDish() {
  const [selectedDishId, setSelectedDishId] = useState<string>('1')
  const selectedDish = MOCK_DISHES.find(dish => dish.id === selectedDishId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Dishes</h1>
          <p className="text-gray-600">Select a dish to view its description and ingredients</p>
        </div>

        {/* Dish Selection Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {MOCK_DISHES.map(dish => (
            <button
              key={dish.id}
              onClick={() => setSelectedDishId(dish.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedDishId === dish.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300'
              }`}
            >
              {dish.name}
            </button>
          ))}
        </div>

        {/* Dish Details */}
        {selectedDish && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Image Section */}
              <div className="flex flex-col justify-center">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
                <div className="mt-6 flex gap-8 text-center">
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm font-medium">SERVINGS</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedDish.servings}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm font-medium">PREP TIME</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedDish.prepTime}</p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-start">
                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedDish.name}</h2>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {selectedDish.description}
                  </p>
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Ingredients</h3>
                  <div className="space-y-3">
                    {selectedDish.ingredients.map(ingredient => (
                      <div
                        key={ingredient.id}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100 hover:border-orange-300 transition-colors"
                      >
                        <span className="text-gray-700 font-medium">{ingredient.name}</span>
                        <span className="text-orange-600 font-semibold bg-white px-3 py-1 rounded-full text-sm">
                          {ingredient.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}