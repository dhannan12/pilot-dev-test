import React, { useState } from 'react'

const MOCK_DISH = {
  id: 1,
  name: 'Grilled Salmon with Lemon Butter',
  description: 'Fresh Atlantic salmon fillet grilled to perfection with a zesty lemon butter sauce',
  price: 24.99,
  rating: 4.8,
  reviews: 156,
  prepTime: '25 mins',
  servings: 2,
  calories: 450,
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop',
  ingredients: [
    { id: 1, name: 'Salmon Fillet', amount: '8 oz', selected: true },
    { id: 2, name: 'Lemon', amount: '1', selected: true },
    { id: 3, name: 'Butter', amount: '2 tbsp', selected: true },
    { id: 4, name: 'Garlic', amount: '2 cloves', selected: false },
    { id: 5, name: 'Fresh Dill', amount: '1 tbsp', selected: true },
    { id: 6, name: 'Sea Salt', amount: 'to taste', selected: true },
  ],
  instructions: [
    'Preheat grill to medium-high heat',
    'Season salmon with salt and pepper',
    'Grill salmon for 6-7 minutes per side',
    'Prepare lemon butter sauce in a pan',
    'Plate and drizzle with sauce',
    'Garnish with fresh dill and lemon wedges',
  ],
  tags: ['Seafood', 'Healthy', 'Gluten-Free', 'High-Protein'],
}

const MOCK_SIMILAR_DISHES = [
  { id: 2, name: 'Pan-Seared Halibut', price: 26.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop' },
  { id: 3, name: 'Baked Cod with Herbs', price: 19.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop' },
  { id: 4, name: 'Grilled Tuna Steak', price: 28.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop' },
]

export default function BuildDishDetails() {
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>(
    MOCK_DISH.ingredients.filter(i => i.selected).map(i => i.id)
  )
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients')

  const toggleIngredient = (id: number) => {
    setSelectedIngredients(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} serving(s) of ${MOCK_DISH.name} to cart!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button className="text-gray-600 hover:text-gray-900 text-2xl">←</button>
          <h1 className="text-xl font-bold text-gray-900">Dish Details</h1>
          <button className="text-gray-600 hover:text-gray-900 text-2xl">⋯</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Image Section */}
        <div className="mb-8">
          <img
            src={MOCK_DISH.image}
            alt={MOCK_DISH.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Dish Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{MOCK_DISH.name}</h2>
              <p className="text-gray-600 text-lg mb-4">{MOCK_DISH.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 mb-2">${MOCK_DISH.price}</div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="font-semibold text-gray-900">{MOCK_DISH.rating}</span>
                <span className="text-gray-500">({MOCK_DISH.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-4 gap-4 py-4 border-t border-b border-gray-200">
            <div className="text-center">
              <div className="text-gray-500 text-sm mb-1">Prep Time</div>
              <div className="font-semibold text-gray-900">{MOCK_DISH.prepTime}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 text-sm mb-1">Servings</div>
              <div className="font-semibold text-gray-900">{MOCK_DISH.servings}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 text-sm mb-1">Calories</div>
              <div className="font-semibold text-gray-900">{MOCK_DISH.calories}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 text-sm mb-1">Tags</div>
              <div className="font-semibold text-gray-900">{MOCK_DISH.tags.length}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {MOCK_DISH.tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 py-4 px-6 font-semibold text-center transition-colors ${
                activeTab === 'ingredients'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`flex-1 py-4 px-6 font-semibold text-center transition-colors ${
                activeTab === 'instructions'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Instructions
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'ingredients' && (
              <div className="space-y-3">
                {MOCK_DISH.ingredients.map(ingredient => (
                  <label key={ingredient.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(ingredient.id)}
                      onChange={() => toggleIngredient(ingredient.id)}
                      className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                    />
                    <span className="flex-1 text-gray-900 font-medium">{ingredient.name}</span>
                    <span className="text-gray-500 text-sm">{ingredient.amount}</span>
                  </label>
                ))}
              </div>
            )}

            {activeTab === 'instructions' && (
              <ol className="space-y-4">
                {MOCK_DISH.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        {/* Similar Dishes */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Similar Dishes</h3>
          <div className="grid grid-cols-3 gap-4">
            {MOCK_SIMILAR_DISHES.map(dish => (
              <div key={dish.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{dish.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">${dish.price}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium text-gray-900">{dish.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add to Cart Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 sticky bottom-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-bold"
              >
                −
              </button>
              <span className="px-6 py-2 font-semibold text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-bold"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"
            >
              Add to Cart - ${(MOCK_DISH.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}