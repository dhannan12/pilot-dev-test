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
      { id: '1-2', name: 'Eggs', quantity: '4 large' },
      { id: '1-3', name: 'Pancetta', quantity: '200g' },
      { id: '1-4', name: 'Parmesan Cheese', quantity: '100g' },
      { id: '1-5', name: 'Black Pepper', quantity: '1 tsp' },
      { id: '1-6', name: 'Salt', quantity: 'to taste' }
    ],
    image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=400&h=300&fit=crop',
    servings: 4,
    prepTime: '20 minutes'
  },
  {
    id: '2',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon fillet grilled to perfection with a light lemon butter sauce. Rich in omega-3 and incredibly flavorful.',
    ingredients: [
      { id: '2-1', name: 'Salmon Fillets', quantity: '4 pieces (150g each)' },
      { id: '2-2', name: 'Lemon', quantity: '2' },
      { id: '2-3', name: 'Butter', quantity: '50g' },
      { id: '2-4', name: 'Garlic', quantity: '3 cloves' },
      { id: '2-5', name: 'Olive Oil', quantity: '2 tbsp' },
      { id: '2-6', name: 'Fresh Dill', quantity: '1 bunch' }
    ],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    servings: 4,
    prepTime: '25 minutes'
  },
  {
    id: '3',
    name: 'Vegetable Stir Fry',
    description: 'A vibrant mix of fresh vegetables tossed in a savory soy-ginger sauce. Quick, healthy, and perfect for weeknight dinners.',
    ingredients: [
      { id: '3-1', name: 'Broccoli', quantity: '300g' },
      { id: '3-2', name: 'Bell Peppers', quantity: '2 large' },
      { id: '3-3', name: 'Carrots', quantity: '2 medium' },
      { id: '3-4', name: 'Soy Sauce', quantity: '3 tbsp' },
      { id: '3-5', name: 'Ginger', quantity: '1 tbsp (minced)' },
      { id: '3-6', name: 'Sesame Oil', quantity: '1 tbsp' }
    ],
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop',
    servings: 3,
    prepTime: '15 minutes'
  }
]

export default function EachDish() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(MOCK_DISHES[0])
  const [expandedIngredients, setExpandedIngredients] = useState(false)

  const toggleIngredients = () => {
    setExpandedIngredients(!expandedIngredients)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Dishes</h1>
          <p className="text-gray-600">Explore our carefully curated menu with detailed descriptions and ingredients</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dish List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-orange-500 text-white p-4">
                <h2 className="text-xl font-bold">Menu</h2>
              </div>
              <div className="divide-y">
                {MOCK_DISHES.map((dish) => (
                  <button
                    key={dish.id}
                    onClick={() => {
                      setSelectedDish(dish)
                      setExpandedIngredients(false)
                    }}
                    className={`w-full text-left p-4 transition-all duration-200 ${
                      selectedDish?.id === dish.id
                        ? 'bg-orange-100 border-l-4 border-orange-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-800">{dish.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{dish.servings} servings</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dish Details */}
          <div className="lg:col-span-2">
            {selectedDish && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Image */}
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={selectedDish.image}
                    alt={selectedDish.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedDish.prepTime}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedDish.name}</h2>
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <span className="text-orange-500">👥</span>
                      {selectedDish.servings} servings
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-orange-500">⏱️</span>
                      {selectedDish.prepTime}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedDish.description}</p>
                  </div>

                  {/* Ingredients */}
                  <div className="border-t pt-6">
                    <button
                      onClick={toggleIngredients}
                      className="flex items-center justify-between w-full mb-4 focus:outline-none"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">Ingredients</h3>
                      <span className={`text-orange-500 text-xl transition-transform duration-200 ${
                        expandedIngredients ? 'rotate-180' : ''
                      }`}>
                        ▼
                      </span>
                    </button>

                    {expandedIngredients && (
                      <div className="bg-orange-50 rounded-lg p-4 animate-in fade-in duration-200">
                        <ul className="space-y-3">
                          {selectedDish.ingredients.map((ingredient) => (
                            <li
                              key={ingredient.id}
                              className="flex items-center justify-between text-gray-700"
                            >
                              <span className="font-medium">{ingredient.name}</span>
                              <span className="text-gray-500 text-sm bg-white px-3 py-1 rounded">
                                {ingredient.quantity}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}