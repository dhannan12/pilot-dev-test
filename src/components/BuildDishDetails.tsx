import React, { useState } from 'react'

const MOCK_DISH = {
  id: 1,
  name: 'Grilled Salmon with Lemon Butter',
  description: 'Fresh Atlantic salmon fillet grilled to perfection with a zesty lemon butter sauce',
  price: 24.99,
  prepTime: '15 mins',
  servings: 2,
  difficulty: 'Medium',
  rating: 4.8,
  reviews: 127,
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop',
  ingredients: [
    { id: 1, name: 'Salmon Fillet', amount: '2', unit: 'pieces' },
    { id: 2, name: 'Lemon', amount: '1', unit: 'whole' },
    { id: 3, name: 'Butter', amount: '4', unit: 'tbsp' },
    { id: 4, name: 'Garlic', amount: '3', unit: 'cloves' },
    { id: 5, name: 'Olive Oil', amount: '2', unit: 'tbsp' },
    { id: 6, name: 'Salt & Pepper', amount: 'to taste', unit: '' }
  ],
  instructions: [
    'Preheat grill to medium-high heat',
    'Pat salmon dry and season with salt and pepper',
    'Brush grill grates with oil to prevent sticking',
    'Grill salmon for 4-5 minutes per side until cooked through',
    'Prepare lemon butter sauce by melting butter with minced garlic',
    'Drizzle sauce over grilled salmon and serve immediately'
  ],
  tags: ['Seafood', 'Healthy', 'Quick', 'Gluten-Free']
}

const MOCK_REVIEWS = [
  { id: 1, author: 'Sarah M.', rating: 5, text: 'Absolutely delicious! The salmon was perfectly cooked.' },
  { id: 2, author: 'John D.', rating: 4, text: 'Great recipe, easy to follow. Highly recommend!' },
  { id: 3, author: 'Emma L.', rating: 5, text: 'Restaurant quality at home. My family loved it!' }
]

export default function BuildDishDetails() {
  const [servings, setServings] = useState(2)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'reviews'>('ingredients')

  const handleServingsChange = (delta: number) => {
    const newServings = Math.max(1, servings + delta)
    setServings(newServings)
  }

  const scaledIngredients = MOCK_DISH.ingredients.map(ing => ({
    ...ing,
    amount: ing.unit ? (parseFloat(ing.amount) * (servings / MOCK_DISH.servings)).toFixed(1) : ing.amount
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button className="text-gray-600 hover:text-gray-900 text-2xl">←</button>
          <h1 className="text-xl font-bold text-gray-900">Dish Details</h1>
          <button className="text-gray-600 hover:text-gray-900 text-2xl">⋮</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Image Section */}
        <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-200 h-80">
          <img
            src={MOCK_DISH.image}
            alt={MOCK_DISH.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <span className="text-2xl">{isFavorite ? '❤️' : '🤍'}</span>
          </button>
        </div>

        {/* Title and Rating */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{MOCK_DISH.name}</h2>
          <p className="text-gray-600 mb-4">{MOCK_DISH.description}</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="font-semibold text-gray-900">{MOCK_DISH.rating}</span>
              <span className="text-gray-500">({MOCK_DISH.reviews} reviews)</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{MOCK_DISH.prepTime}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{MOCK_DISH.difficulty}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {MOCK_DISH.tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Price and Servings */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm">Price per serving</p>
              <p className="text-3xl font-bold text-gray-900">${MOCK_DISH.price}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-sm mb-2">Servings</p>
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                <button
                  onClick={() => handleServingsChange(-1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold text-gray-900">{servings}</span>
                <button
                  onClick={() => handleServingsChange(1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
            Add to Cart
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {(['ingredients', 'instructions', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-4 font-semibold text-center transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'ingredients' && (
              <div className="space-y-3">
                {scaledIngredients.map(ingredient => (
                  <div key={ingredient.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700">{ingredient.name}</span>
                    <span className="font-semibold text-gray-900">
                      {ingredient.amount} {ingredient.unit}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'instructions' && (
              <ol className="space-y-4">
                {MOCK_DISH.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 pt-1">{instruction}</span>
                  </li>
                ))}
              </ol>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {MOCK_REVIEWS.map(review => (
                  <div key={review.id} className="pb-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{review.author}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}