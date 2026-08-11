import React, { useState } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

interface Restaurant {
  id: string;
  name: string;
  manager: string;
  menuItems: MenuItem[];
}

export default function RestaurantUpdate() {
  return (
    <div className="p-6 rounded-lg border border-gray-200 bg-white">
      <h2 className="text-xl font-semibold text-gray-900">RestaurantUpdate</h2>
    </div>
  )
}
