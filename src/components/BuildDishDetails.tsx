import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, ShoppingCart, Clock, Flame } from 'lucide-react';
import { mockDishDetails, mockIngredients, mockNutrition } from './BuildDishDetails.mock';

interface DishDetailsProps {
  dishId?: string;
}

const BuildDishDetails: React.FC<DishDetailsProps> = ({ dishId = '1' }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const dish = mockDishDetails[0];
  const ingredients = mockIngredients;
  const nutrition = mockNutrition;

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const toggleIngredient = (ingredientId: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const totalPrice = (dish.price * quantity).toFixed(2);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-80">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{dish.name}</h1>
            <p className="text-gray-600 mt-2">{dish.description}</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {dish.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 border-y">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Prep Time</p>
                <p className="font-semibold">{dish.prepTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Calories</p>
                <p className="font-semibold">{dish.calories}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Difficulty</p>
              <p className="font-semibold text-green-600">{dish.difficulty}</p>
            </div>
          </div>

          {/* Quantity & Price */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">${totalPrice}</span>
              <span className="text-sm text-gray-600">per order</span>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="ingredients" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
        </TabsList>

        {/* Ingredients Tab */}
        <TabsContent value="ingredients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <CardDescription>Select ingredients to customize</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleIngredient(ingredient.id)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(ingredient.id)}
                      onChange={() => {}}
                      className="w-4 h-4 rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{ingredient.name}</p>
                      <p className="text-sm text-gray-600">{ingredient.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {ingredient.optional && <Badge variant="outline">Optional</Badge>}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nutrition Tab */}
        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nutritional Information</CardTitle>
              <CardDescription>Per serving</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {nutrition.map((item) => (
                  <div key={item.id} className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.unit}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Instructions Tab */}
        <TabsContent value="instructions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cooking Instructions</CardTitle>
              <CardDescription>Step-by-step guide</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {dish.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-gray-900">{instruction}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuildDishDetails;