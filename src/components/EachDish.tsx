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
      { id: '1-5', name: 'Black Pepper', quantity: 'to taste' }
    ],
    image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4f?w=400&h=300&fit=crop',
    servings: 4,
    prepTime: '20 minutes'
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Traditional Italian pizza topped with fresh mozzarella, basil, tomatoes, and olive oil on a crispy crust.',
    ingredients: [
      { id: '2-1', name: 'Pizza Dough', quantity: '500g' },
      { id: '2-2', name: 'Tomato Sauce', quantity: '200ml' },
      { id: '2-3', name: 'Fresh Mozzarella', quantity: '250g' },
      { id: '2-4', name: 'Fresh Basil', quantity: '10 leaves' },
      { id: '2-5', name: 'Olive Oil', quantity: '3 tbsp' }
    ],
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
    servings: 2,
    prepTime: '30 minutes'
  },
  {
    id: '3',
    name: 'Chicken Tikka Masala',
    description: 'Tender chicken pieces in a rich, creamy tomato-based sauce with aromatic Indian spices. Served with rice or naan.',
    ingredients: [
      { id: '3-1', name: 'Chicken Breast', quantity: '600g' },
      { id: '3-2', name: 'Yogurt', quantity: '200ml' },
      { id: '3-3', name: 'Tomato Sauce', quantity: '400ml' },
      { id: '3-4', name: 'Ginger-Garlic Paste', quantity: '2 tbsp' },
      { id: '3-5', name: 'Garam Masala', quantity: '1 tsp' },
      { id: '3-6', name: 'Cream', quantity: '100ml' }
    ],
    image: 'https://images.unsplash.com/photo-1565557623814-dea6fb1726dd?w=400&h=300&fit=crop',
    servings: 4,
    prepTime: '45 minutes'
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
          <p className="text-lg text-gray-600">Explore our carefully curated menu with detailed descriptions and ingredients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_DISHES.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{dish.name}</h2>

                <div className="flex gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold">Servings:</span> {dish.servings}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-semibold">Time:</span> {dish.prepTime}
                  </span>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{dish.description}</p>

                <button
                  onClick={() => toggleExpanded(dish.id)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 mb-4"
                >
                  {expandedDishId === dish.id ? 'Hide Ingredients' : 'Show Ingredients'}
                </button>

                {expandedDishId === dish.id && (
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 animate-in fade-in duration-200">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">Ingredients:</h3>
                    <ul className="space-y-2">
                      {dish.ingredients.map((ingredient) => (
                        <li
                          key={ingredient.id}
                          className="flex justify-between items-center text-gray-700 pb-2 border-b border-orange-100 last:border-b-0"
                        >
                          <span className="font-medium">{ingredient.name}</span>
                          <span className="text-orange-600 font-semibold">{ingredient.quantity}</span>
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