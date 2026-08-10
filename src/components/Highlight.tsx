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

  const toggleChefRecommendation = (id: string): void => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, isChefRecommendation: !item.isChefRecommendation }
          : item
      )
    );
  };

  const chefRecommendationCount = menuItems.filter(
    (item) => item.isChefRecommendation
  ).length;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Menu Management</h1>
        <p className="text-gray-600">
          {isChef
            ? 'Highlight your chef recommendations'
            : 'View chef recommendations'}
        </p>
      </div>

      {isChef && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Chef Recommendations
            </CardTitle>
            <CardDescription>
              {chefRecommendationCount} item{chefRecommendationCount !== 1 ? 's' : ''} highlighted
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <Card
            key={item.id}
            className={`transition-all duration-200 ${
              item.isChefRecommendation
                ? 'ring-2 ring-yellow-400 shadow-lg'
                : 'hover:shadow-md'
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge variant="outline" className="mt-2">
                    {item.category}
                  </Badge>
                </div>
                {item.isChefRecommendation && (
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              {isChef && (
                <Button
                  onClick={() => toggleChefRecommendation(item.id)}
                  variant={item.isChefRecommendation ? 'default' : 'outline'}
                  className="w-full gap-2"
                >
                  {item.isChefRecommendation ? (
                    <>
                      <Check className="w-4 h-4" />
                      Recommended
                    </>
                  ) : (
                    <>
                      <Star className="w-4 h-4" />
                      Recommend
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Highlight;