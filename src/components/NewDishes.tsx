import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockNewDishes } from './NewDishes.mock';

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isNew: boolean;
  category: string;
}

const NewDishes: React.FC = () => {
  const dishes: Dish[] = mockNewDishes;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">New Dishes</h1>
          <p className="text-lg text-slate-600">Check out our latest culinary creations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <Card
              key={dish.id}
              className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                dish.isNew ? 'ring-2 ring-amber-400 shadow-md' : ''
              }`}
            >
              <div className="relative h-48 bg-slate-200 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {dish.isNew && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-semibold animate-pulse">
                      NEW
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-slate-900">{dish.name}</CardTitle>
                    <CardDescription className="text-sm text-slate-500 mt-1">
                      {dish.category}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-600">${dish.price.toFixed(2)}</span>
                  {dish.isNew && (
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      Just Added
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {dishes.filter((d) => d.isNew).length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No new dishes available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewDishes;