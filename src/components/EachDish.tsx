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
    image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=400&h=300&fit=crop',
    servings: 4,
    prepTime: '20 minutes',
    ingredients: [
      { id: '1-1', name: 'Spaghetti', quantity: '400g' },
      { id: '1-2', name: 'Eggs', quantity: '4 large' },
      { id: '1-3', name: 'Pancetta', quantity: '200g' },
      { id: '1-4', name: 'Parmesan Cheese', quantity: '100g' },
      { id: '1-5', name: 'Black Pepper', quantity: 'to taste' },
      { id: '1-6', name: 'Salt', quantity: 'to taste' }
    ]
  },
  {
    id: '2',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon fillet grilled to perfection with a light lemon and herb glaze. Rich in omega-3 fatty acids and incredibly flavorful.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    servings: 2,
    prepTime: '25 minutes',
    ingredients: [
      { id: '2-1', name: 'Salmon Fillets', quantity: '2 pieces (200g each)' },
      { id: '2-2', name: 'Lemon', quantity: '1 whole' },
      { id: '2-3', name: 'Olive Oil', quantity: '3 tbsp' },
      { id: '2-4', name: 'Fresh Dill', quantity: '2 tbsp' },
      { id: '2-5', name: 'Garlic', quantity: '2 cloves' },
      { id: '2-6', name: 'Salt & Pepper', quantity: 'to taste' }
    ]
  },
  {
    id: '3',
    name: 'Vegetable Stir Fry',
    description: 'A vibrant mix of fresh vegetables tossed in a savory soy-ginger sauce. Quick, healthy, and perfect for a weeknight dinner.',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop',
    servings: 3,
    prepTime: '15 minutes',
    ingredients: [
      { id: '3-1', name: 'Broccoli', quantity: '2 cups' },
      { id: '3-2', name: 'Bell Peppers', quantity: '2 large' },
      { id: '3-3', name: 'Carrots', quantity: '2 medium' },
      { id: '3-4', name: 'Soy Sauce', quantity: '3 tbsp' },
      { id: '3-5', name: 'Fresh Ginger', quantity: '1 tbsp' },
      { id: '3-6', name: 'Sesame Oil', quantity: '2 tbsp' },
      { id: '3-7', name: 'Garlic', quantity: '3 cloves' }
    ]
  }
]

export default function EachDish() {
  const [selectedDishId, setSelectedDishId] = useState<string>('1')
  const selectedDish = MOCK_DISHES.find(dish => dish.id === selectedDishId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Our Dishes</h1>
          <p className="text-lg text-gray-600">Explore our carefully curated menu with detailed descriptions and ingredients</p>
        </div>

        {/* Dish Selector */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {MOCK_DISHES.map(dish => (
            <button
              key={dish.id}
              onClick={() => setSelectedDishId(dish.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedDishId === dish.id
                  ? 'bg-orange-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300 hover:shadow-md'
              }`}
            >
              {dish.name}
            </button>
          ))}
        </div>

        {/* Dish Details */}
        {selectedDish && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image Section */}
              <div className="flex flex-col justify-center">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
                <div className="mt-6 flex gap-8 text-center">
                  <div className="flex-1 bg-orange-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-medium">Servings</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedDish.servings}</p>
                  </div>
                  <div className="flex-1 bg-amber-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-medium">Prep Time</p>
                    <p className="text-2xl font-bold text-amber-600">{selectedDish.prepTime}</p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-between">
                {/* Title and Description */}
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{selectedDish.name}</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                    {selectedDish.description}
                  </p>
                </div>

                {/* Ingredients Section */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="inline-block w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center mr-3 text-lg">✓</span>
                    Ingredients
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedDish.ingredients.map(ingredient => (
                      <div
                        key={ingredient.id}
                        className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                      >
                        <div className="w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">•</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{ingredient.name}</p>
                          <p className="text-sm text-gray-600">{ingredient.quantity}</p>
                        </div>
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