import React from 'react';
import { Star, ChefHat } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockChefRecommendations } from './Highlight.mock';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isChefRecommendation: boolean;
  category: string;
}

const Highlight: React.FC = () => {
  const recommendations: MenuItem[] = mockChefRecommendations;

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <ChefHat className="w-8 h-8 text-orange-600" />
          Chef's Recommendations
        </h1>
        <p className="text-gray-600">Handpicked dishes curated by our executive chef</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <Card
            key={item.id}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
              item.isChefRecommendation
                ? 'border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-white'
                : 'border border-gray-200'
            }`}
          >
            {item.isChefRecommendation && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-600 to-orange-500 text-white px-4 py-2 rounded-bl-lg flex items-center gap-1 shadow-md">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">Chef Pick</span>
              </div>
            )}

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-xl text-gray-900">{item.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    {item.category}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                {item.isChefRecommendation && (
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 hover:bg-orange-100"
                  >
                    Recommended
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recommendations.filter((item) => item.isChefRecommendation).length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No chef recommendations available</p>
        </div>
      )}
    </div>
  );
};

export default Highlight;