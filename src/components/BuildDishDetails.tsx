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
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
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
    'Squeeze fresh lemon juice into the butter sauce',
    'Plate salmon and drizzle with lemon butter sauce',
    'Garnish with fresh herbs and serve immediately'
  ],
  tags: ['Seafood', 'Healthy', 'Grilled', 'Quick', 'Dinner']
}

export default function BuildDishDetails() {
  const [servings, setServings] = useState(2)
  const [selectedTab, setSelectedTab] = useState<'ingredients' | 'instructions'>('ingredients')
  const [isFavorite, setIsFavorite] = useState(false)

  const adjustedIngredients = MOCK_DISH.ingredients.map(ing => ({
    ...ing,
    amount: ing.amount === 'to taste' ? ing.amount : (parseFloat(ing.amount) * (servings / MOCK_DISH.servings)).toFixed(1)
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button className="text-slate-600 hover:text-slate-900 font-semibold text-lg">← Back</button>
          <h1 className="text-2xl font-bold text-slate-900">Dish Details</h1>
          <button className="text-slate-400 hover:text-slate-600">⋮</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Image Section */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <img src={MOCK_DISH.image} alt={MOCK_DISH.name} className="w-full h-96 object-cover" />
        </div>

        {/* Title and Rating */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-2">{MOCK_DISH.name}</h2>
              <p className="text-slate-600 text-lg">{MOCK_DISH.description}</p>
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`text-3xl transition-transform hover:scale-110 ${
                isFavorite ? 'text-red-500' : 'text-slate-300'
              }`}
            >
              ♥
            </button>
          </div>

          {/* Rating and Stats */}
          <div className="flex items-center gap-6 py-4 border-y border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-900">{MOCK_DISH.rating}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(MOCK_DISH.rating) ? 'text-yellow-400' : 'text-slate-300'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-slate-600">({MOCK_DISH.reviews} reviews)</span>
            </div>
            <div className="flex gap-8 text-slate-700">
              <div>
                <span className="font-semibold">⏱</span>
                <span className="ml-2">{MOCK_DISH.prepTime}</span>
              </div>
              <div>
                <span className="font-semibold">👥</span>
                <span className="ml-2">{MOCK_DISH.servings} servings</span>
              </div>
              <div>
                <span className="font-semibold">📊</span>
                <span className="ml-2">{MOCK_DISH.difficulty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-slate-600 text-sm">Price per serving</span>
              <p className="text-4xl font-bold text-slate-900">${MOCK_DISH.price}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-slate-200 text-slate-900 rounded-lg font-semibold hover:bg-slate-300 transition">
                Share
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Servings Adjuster */}
        <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
          <label className="block text-sm font-semibold text-slate-900 mb-4">Adjust Servings</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setServings(Math.max(1, servings - 1))}
              className="w-10 h-10 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold text-lg transition"
            >
              −
            </button>
            <span className="text-2xl font-bold text-slate-900 w-12 text-center">{servings}</span>
            <button
              onClick={() => setServings(servings + 1)}
              className="w-10 h-10 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold text-lg transition"
            >
              +
            </button>
            <span className="text-slate-600 ml-4">servings</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-4 border-b border-slate-200 mb-6">
            <button
              onClick={() => setSelectedTab('ingredients')}
              className={`pb-3 font-semibold transition ${
                selectedTab === 'ingredients'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setSelectedTab('instructions')}
              className={`pb-3 font-semibold transition ${
                selectedTab === 'instructions'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Instructions
            </button>
          </div>

          {/* Ingredients Tab */}
          {selectedTab === 'ingredients' && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Ingredients</h3>
              <ul className="space-y-3">
                {adjustedIngredients.map(ing => (
                  <li key={ing.id} className="flex items-center gap-3 pb-3 border-b border-slate-100 last:border-0">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 cursor-pointer" />
                    <span className="text-slate-900 flex-1">{ing.name}</span>
                    <span className="text-slate-600 font-semibold">
                      {ing.amount} {ing.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions Tab */}
          {selectedTab === 'instructions' && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Instructions</h3>
              <ol className="space-y-4">
                {MOCK_DISH.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="text-slate-700 pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {MOCK_DISH.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-full text-sm font-medium hover:bg-slate-300 cursor-pointer transition">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}