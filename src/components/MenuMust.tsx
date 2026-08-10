import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { menuSections } from './MenuMust.mock';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  allergens?: string[];
}

interface MenuSection {
  id: string;
  title: string;
  description: string;
  items: MenuItem[];
}

const MenuMust: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Our Menu</h1>
        <p className="text-slate-600">Carefully curated dishes for your dining experience</p>
      </div>

      <div className="space-y-8">
        {menuSections.map((section: MenuSection) => (
          <section key={section.id} className="">
            <div className="mb-4 border-b-2 border-slate-300 pb-3">
              <h2 className="text-2xl font-semibold text-slate-800">{section.title}</h2>
              <p className="text-sm text-slate-600 mt-1">{section.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              {section.items.map((item: MenuItem) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200 border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-slate-900">{item.name}</CardTitle>
                        <CardDescription className="text-slate-600 mt-1">
                          {item.description}
                        </CardDescription>
                      </div>
                      <span className="text-xl font-bold text-emerald-600 whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </CardHeader>
                  {item.allergens && item.allergens.length > 0 && (
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {item.allergens.map((allergen: string) => (
                          <Badge key={allergen} variant="secondary" className="text-xs">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
        <p className="text-sm text-blue-900">
          ℹ️ All prices are in USD. Please inform us of any dietary restrictions.
        </p>
      </div>
    </div>
  );
};

export default MenuMust;