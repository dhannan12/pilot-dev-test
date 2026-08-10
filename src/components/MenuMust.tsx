import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { menuMockData } from './MenuMust.mock';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Starters' | 'Main' | 'Desserts';
  isVegan?: boolean;
  isSpicy?: boolean;
}

interface MenuSection {
  category: 'Starters' | 'Main' | 'Desserts';
  items: MenuItem[];
}

const MenuMust: React.FC = () => {
  const groupedMenu: MenuSection[] = [
    {
      category: 'Starters',
      items: menuMockData.filter((item) => item.category === 'Starters'),
    },
    {
      category: 'Main',
      items: menuMockData.filter((item) => item.category === 'Main'),
    },
    {
      category: 'Desserts',
      items: menuMockData.filter((item) => item.category === 'Desserts'),
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Menu</h1>
        <p className="text-gray-600">Carefully curated dishes for your enjoyment</p>
      </div>

      {groupedMenu.map((section) => (
        <div key={section.category} className="space-y-4">
          <div className="border-b-2 border-gray-300 pb-3">
            <h2 className="text-2xl font-semibold text-gray-800">{section.category}</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {section.items.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900">{item.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">{item.description}</CardDescription>
                    </div>
                    <span className="text-lg font-bold text-green-600 whitespace-nowrap">${item.price.toFixed(2)}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {item.isVegan && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Vegan
                      </Badge>
                    )}
                    {item.isSpicy && (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        Spicy
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuMust;