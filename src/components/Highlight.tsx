import React, { useState } from 'react';
import { Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockMenuItems } from './Highlight.mock';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isChefRecommendation: boolean;
}

const Highlight: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [isChef] = useState<boolean>(true);

  const handleToggleRecommendation = (id: string): void => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, isChefRecommendation: !item.isChefRecommendation }
          : item
      )
    );
  };

  const recommendedItems = menuItems.filter((item) => item.isChefRecommendation);
  const nonRecommendedItems = menuItems.filter((item) => !item.isChefRecommendation);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Menu Management</h1>
        <p className="text-gray-600">Highlight your chef's recommendations</p>
      </div>

      {/* Chef Recommendations Section */}
      <Card className="border-2 border-amber-200 bg-amber-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-600" />
            <CardTitle className="text-amber-900">Chef's Recommendations</CardTitle>
            <Badge variant="secondary" className="ml-auto">
              {recommendedItems.length}
            </Badge>
          </div>
          <CardDescription className="text-amber-700">
            Items highlighted as chef's special picks
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recommendedItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No recommendations yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-4 border border-amber-200 flex justify-between items-start"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-sm font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  {isChef && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleRecommendation(item.id)}
                      className="ml-2 text-amber-600 hover:text-amber-700 hover:bg-amber-100"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Items Section */}
      <Card>
        <CardHeader>
          <CardTitle>Available Menu Items</CardTitle>
          <CardDescription>Click to add items to chef's recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          {nonRecommendedItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">All items are highlighted</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nonRecommendedItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-sm font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                    </div>
                    {isChef && (
                      <Button
                        onClick={() => handleToggleRecommendation(item.id)}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                        size="sm"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Add to Recommendations
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
              <p className="text-sm text-gray-600">Total Items</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">{recommendedItems.length}</p>
              <p className="text-sm text-gray-600">Recommendations</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {((recommendedItems.length / menuItems.length) * 100).toFixed(0)}%
              </p>
              <p className="text-sm text-gray-600">Highlighted</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Highlight;