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
    'Season salmon with salt, pepper, and minced garlic',
    'Brush grill grates with olive oil',
    'Grill salmon for 4-5 minutes per side',
    'Prepare lemon butter sauce in a small pan',
    'Plate salmon and drizzle with lemon butter sauce',
    'Garnish with fresh lemon slices and serve'
  ],
  tags: ['Seafood', 'Healthy', 'Gluten-Free', 'High-Protein']
}

export default function BuildDishDetails() {
  const [selectedServings, setSelectedServings] = useState(2)
  const [expandedSection, setExpandedSection] = useState<string | null>('ingredients')

  const servingOptions = [1, 2, 3, 4, 6]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button className="text-slate-600 hover:text-slate-900 font-medium mb-4 flex items-center gap-2">
            <span>←</span> Back to Recipes
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="relative h-96 bg-slate-200 overflow-hidden">
            <img
              src={MOCK_DISH.image}
              alt={MOCK_DISH.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2">
              <span className="text-yellow-500 font-bold">★</span>
              <span className="font-semibold text-slate-900">{MOCK_DISH.rating}</span>
              <span className="text-slate-500 text-sm">({MOCK_DISH.reviews})</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Title and Description */}
            <h1 className="text-4xl font-bold text-slate-900 mb-3">{MOCK_DISH.name}</h1>
            <p className="text-lg text-slate-600 mb-6">{MOCK_DISH.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {MOCK_DISH.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-slate-200">
              <div className="text-center">
                <div className="text-slate-500 text-sm mb-1">Prep Time</div>
                <div className="text-xl font-bold text-slate-900">{MOCK_DISH.prepTime}</div>
              </div>
              <div className="text-center">
                <div className="text-slate-500 text-sm mb-1">Servings</div>
                <div className="text-xl font-bold text-slate-900">{MOCK_DISH.servings}</div>
              </div>
              <div className="text-center">
                <div className="text-slate-500 text-sm mb-1">Difficulty</div>
                <div className="text-xl font-bold text-slate-900">{MOCK_DISH.difficulty}</div>
              </div>
              <div className="text-center">
                <div className="text-slate-500 text-sm mb-1">Price</div>
                <div className="text-xl font-bold text-green-600">${MOCK_DISH.price}</div>
              </div>
            </div>

            {/* Servings Selector */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Servings</h3>
              <div className="flex gap-3">
                {servingOptions.map((serving) => (
                  <button
                    key={serving}
                    onClick={() => setSelectedServings(serving)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedServings === serving
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {serving}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="mb-6 border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === 'ingredients' ? null : 'ingredients')}
                className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-semibold text-slate-900 transition-colors"
              >
                <span>Ingredients ({MOCK_DISH.ingredients.length})</span>
                <span className={`text-2xl transition-transform ${expandedSection === 'ingredients' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {expandedSection === 'ingredients' && (
                <div className="p-6 bg-white">
                  <ul className="space-y-3">
                    {MOCK_DISH.ingredients.map((ingredient) => (
                      <li key={ingredient.id} className="flex items-center justify-between text-slate-700">
                        <span className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="w-5 h-5 rounded border-slate-300 text-blue-600 cursor-pointer"
                          />
                          <span>{ingredient.name}</span>
                        </span>
                        <span className="text-slate-500 font-medium">
                          {ingredient.amount} {ingredient.unit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Instructions Section */}
            <div className="mb-6 border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === 'instructions' ? null : 'instructions')}
                className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-semibold text-slate-900 transition-colors"
              >
                <span>Instructions ({MOCK_DISH.instructions.length} steps)</span>
                <span className={`text-2xl transition-transform ${expandedSection === 'instructions' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {expandedSection === 'instructions' && (
                <div className="p-6 bg-white">
                  <ol className="space-y-4">
                    {MOCK_DISH.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <p className="text-slate-700 pt-1">{instruction}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-8">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md">
                Add to Meal Plan
              </button>
              <button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors">
                Save Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}