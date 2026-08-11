import React, { useState } from 'react'

const MOCK_DISH = {
  id: 1,
  name: 'Grilled Salmon with Lemon Butter',
  description: 'Fresh Atlantic salmon fillet grilled to perfection with a zesty lemon butter sauce',
  price: 24.99,
  prepTime: '25 mins',
  servings: 2,
  difficulty: 'Medium',
  rating: 4.8,
  reviews: 156,
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop',
  ingredients: [
    { id: 1, name: 'Salmon Fillet', amount: '2', unit: 'pieces' },
    { id: 2, name: 'Butter', amount: '4', unit: 'tbsp' },
    { id: 3, name: 'Lemon', amount: '1', unit: 'whole' },
    { id: 4, name: 'Garlic', amount: '3', unit: 'cloves' },
    { id: 5, name: 'Olive Oil', amount: '2', unit: 'tbsp' },
    { id: 6, name: 'Salt & Pepper', amount: 'to taste', unit: '' }
  ],
  instructions: [
    'Preheat grill to medium-high heat (400°F)',
    'Pat salmon dry and brush with olive oil',
    'Season with salt, pepper, and minced garlic',
    'Grill salmon for 5-7 minutes per side until cooked through',
    'Prepare lemon butter sauce by melting butter with fresh lemon juice',
    'Drizzle sauce over grilled salmon and serve immediately'
  ],
  tags: ['Seafood', 'Healthy', 'Grilled', 'Quick', 'Dinner']
}

export default function BuildDishDetails() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'ingredients' | 'instructions'>('overview')
  const [servingSize, setServingSize] = useState(2)

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button className="text-slate-600 hover:text-slate-900 font-medium mb-4 flex items-center gap-2">
            <span>←</span> Back to Dishes
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
            <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-md">
              <span className="text-2xl font-bold text-slate-900">${MOCK_DISH.price}</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Title and Rating */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-slate-900 mb-3">{MOCK_DISH.name}</h1>
              <p className="text-slate-600 text-lg mb-4">{MOCK_DISH.description}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  {renderStars(MOCK_DISH.rating)}
                  <span className="text-slate-700 font-semibold">{MOCK_DISH.rating}</span>
                  <span className="text-slate-500">({MOCK_DISH.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-slate-500 text-sm font-medium">Prep Time</p>
                <p className="text-slate-900 font-bold text-lg">{MOCK_DISH.prepTime}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Servings</p>
                <p className="text-slate-900 font-bold text-lg">{MOCK_DISH.servings}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Difficulty</p>
                <p className="text-slate-900 font-bold text-lg">{MOCK_DISH.difficulty}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Servings Size</p>
                <select
                  value={servingSize}
                  onChange={(e) => setServingSize(Number(e.target.value))}
                  className="text-slate-900 font-bold text-lg border border-slate-300 rounded px-2 py-1"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                  <option value={6}>6</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8 flex flex-wrap gap-2">
              {MOCK_DISH.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 mb-6">
              <div className="flex gap-8">
                {(['overview', 'ingredients', 'instructions'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`py-4 font-semibold capitalize border-b-2 transition-colors ${
                      selectedTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div>
              {selectedTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    This exquisite grilled salmon dish combines fresh, high-quality ingredients with simple yet elegant preparation techniques. Perfect for a special dinner or a healthy weeknight meal.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    The lemon butter sauce adds a bright, rich flavor that complements the delicate taste of the salmon. Serve with your favorite sides like roasted vegetables or rice.
                  </p>
                </div>
              )}

              {selectedTab === 'ingredients' && (
                <div className="space-y-3">
                  {MOCK_DISH.ingredients.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <span className="text-slate-900 font-medium">{ingredient.name}</span>
                      <span className="text-slate-600">
                        {ingredient.amount} {ingredient.unit}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'instructions' && (
                <div className="space-y-4">
                  {MOCK_DISH.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <p className="text-slate-700 pt-1">{instruction}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Add to Favorites
              </button>
              <button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors">
                Share Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}