import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockDishes } from './EachDish.mock';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

interface Dish {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  category: string;
  prepTime: string;
}

const EachDish: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Our Dishes</h1>
          <p className="text-lg text-slate-600">Explore our carefully curated menu with detailed descriptions and ingredients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDishes.map((dish: Dish) => (
            <Card key={dish.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 pb-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-xl text-slate-900">{dish.name}</CardTitle>
                  <Badge variant="secondary" className="whitespace-nowrap">
                    {dish.category}
                  </Badge>
                </div>
                <CardDescription className="text-slate-600">
                  ⏱️ {dish.prepTime}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Description</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Ingredients</h3>
                  <ul className="space-y-2">
                    {dish.ingredients.map((ingredient: Ingredient) => (
                      <li
                        key={ingredient.id}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                        <span>
                          <span className="font-medium text-slate-700">{ingredient.name}</span>
                          <span className="text-slate-500"> - {ingredient.quantity}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EachDish;