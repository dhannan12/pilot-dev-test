import React, { useState } from 'react';

interface CraftBeverage {
  id: number;
  name: string;
  type: string;
  brewery: string;
  abv: number;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
}

interface ShippingOption {
  id: string;
  method: string;
  baseDeliveryDays: number;
  pricePerMile: number;
  baseCost: number;
}

const mockBeverages: CraftBeverage[] = [
  {
    id: 1,
    name: "Hoppy IPA Supreme",
    type: "IPA",
    brewery: "Mountain Brew Co.",
    abv: 6.5,
    description: "A bold and hoppy IPA with citrus notes and a smooth finish. Perfect for hop lovers.",
    price: 12.99,
    imageUrl: "https://via.placeholder.com/200x300/FF9800/FFFFFF?text=IPA",
    rating: 4.5
  },
  {
    id: 2,
    name: "Dark Chocolate Stout",
    type: "Stout",
    brewery: "Valley Craft Brewing",
    abv: 7.2,
    description: "Rich and creamy stout with deep chocolate and coffee flavors. A dessert in a glass.",
    price: 14.99,
    imageUrl: "https://via.placeholder.com/200x300/3E2723/FFFFFF?text=Stout",
    rating: 4.8
  },
  {
    id: 3,
    name: "Golden Wheat Ale",
    type: "Wheat Ale",
    brewery: "Sunshine Brewing",
    abv: 5.0,
    description: "Light and refreshing wheat ale with subtle fruit undertones. Perfect for summer days.",
    price: 10.99,
    imageUrl: "https://via.placeholder.com/200x300/FFC107/FFFFFF?text=Wheat",
    rating: 4.3
  },
  {
    id: 4,
    name: "Barrel-Aged Porter",
    type: "Porter",
    brewery: "Oak & Barrel Brewhouse",
    abv: 8.5,
    description: "Complex porter aged in bourbon barrels with notes of vanilla, oak, and caramel.",
    price: 18.99,
    imageUrl: "https://via.placeholder.com/200x300/5D4037/FFFFFF?text=Porter",
    rating: 4.9
  },
  {
    id: 5,
    name: "Citrus Pale Ale",
    type: "Pale Ale",
    brewery: "Coastal Craft Co.",
    abv: 5.8,
    description: "Refreshing pale ale bursting with citrus flavors from fresh orange and grapefruit.",
    price: 11.99,
    imageUrl: "https://via.placeholder.com/200x300/FF5722/FFFFFF?text=PaleAle",
    rating: 4.6
  },
  {
    id: 6,
    name: "Belgian Tripel",
    type: "Tripel",
    brewery: "Heritage Brewing",
    abv: 9.0,
    description: "Traditional Belgian tripel with spicy yeast character and fruity esters.",
    price: 16.99,
    imageUrl: "https://via.placeholder.com/200x300/FDD835/FFFFFF?text=Tripel",
    rating: 4.7
  }
];

const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    method: "Standard Shipping",
    baseDeliveryDays: 5,
    pricePerMile: 0.02,
    baseCost: 5.99
  },
  {
    id: "expedited",
    method: "Expedited Shipping",
    baseDeliveryDays: 2,
    pricePerMile: 0.05,
    baseCost: 12.99
  },
  {
    id: "express",
    method: "Express Overnight",
    baseDeliveryDays: 1,
    pricePerMile: 0.10,
    baseCost: 24.99
  }
];

export default function EasilyDiscover() {
  const [selectedBeverage, setSelectedBeverage] = useState<CraftBeverage | null>(null);
  const [distance, setDistance] = useState<number>(50);
  const [selectedShipping, setSelectedShipping] = useState<string>("standard");
  const [filterType, setFilterType] = useState<string>("all");

  const calculateDeliveryTime = (shippingMethod: string, distanceMiles: number): string => {
    const shipping = shippingOptions.find(s => s.id === shippingMethod);
    if (!shipping) return "N/A";

    // Add extra days based on distance (1 day per 500 miles for standard, less for faster methods)
    const distanceFactor = shippingMethod === "standard" ? 500 : 
                          shippingMethod === "expedited" ? 1000 : 
                          1500;
    const extraDays = Math.floor(distanceMiles / distanceFactor);
    const totalDays = shipping.baseDeliveryDays + extraDays;

    return `${totalDays} business day${totalDays !== 1 ? 's' : ''}`;
  };

  const calculateShippingCost = (shippingMethod: string, distanceMiles: number): number => {
    const shipping = shippingOptions.find(s => s.id === shippingMethod);
    if (!shipping) return 0;

    return shipping.baseCost + (shipping.pricePerMile * distanceMiles);
  };

  const filteredBeverages = filterType === "all" 
    ? mockBeverages 
    : mockBeverages.filter(b => b.type === filterType);

  const uniqueTypes = Array.from(new Set(mockBeverages.map(b => b.type)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Discover Craft Beverages</h1>
          <p className="text-lg text-amber-700">Explore unique brews and calculate your delivery time</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                filterType === "all"
                  ? "bg-amber-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Beverages
            </button>
            {uniqueTypes.map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  filterType === type
                    ? "bg-amber-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Beverages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredBeverages.map(beverage => (
            <div
              key={beverage.id}
              onClick={() => setSelectedBeverage(beverage)}
              className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                selectedBeverage?.id === beverage.id ? "ring-4 ring-amber-500" : ""
              }`}
            >
              <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
                <div className="text-6xl">🍺</div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{beverage.name}</h3>
                  <span className="text-sm font-semibold text-amber-600">${beverage.price}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{beverage.brewery}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded">
                    {beverage.type}
                  </span>
                  <span className="text-xs text-gray-600">{beverage.abv}% ABV</span>
                  <span className="text-xs text-yellow-600">★ {beverage.rating}</span>
                </div>
                <p className="text-sm text-gray-700">{beverage.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Calculator */}
        {selectedBeverage && (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Delivery Estimate for {selectedBeverage.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Distance Input */}
              <div>
                <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-2">
                  Distance (miles): {distance}
                </label>
                <input
                  id="distance"
                  type="range"
                  min="10"
                  max="3000"
                  step="10"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>10 mi</span>
                  <span>3000 mi</span>
                </div>
              </div>

              {/* Shipping Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Method
                </label>
                <select
                  value={selectedShipping}
                  onChange={(e) => setSelectedShipping(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  {shippingOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.method}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Delivery Estimates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {shippingOptions.map(option => {
                const isSelected = option.id === selectedShipping;
                const deliveryTime = calculateDeliveryTime(option.id, distance);
                const shippingCost = calculateShippingCost(option.id, distance);
                const totalCost = selectedBeverage.price + shippingCost;

                return (
                  <div
                    key={option.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <h3 className="font-bold text-gray-900 mb-2">{option.method}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-700">
                        <span className="font-medium">Delivery:</span> {deliveryTime}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Shipping:</span> ${shippingCost.toFixed(2)}
                      </p>
                      <p className="text-gray-900 font-bold text-lg mt-2">
                        Total: ${totalCost.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                <span className="font-bold">Estimated Delivery:</span> {calculateDeliveryTime(selectedShipping, distance)} 
                <span className="ml-2">•</span>
                <span className="ml-2 font-bold">Total Cost:</span> $
                {(selectedBeverage.price + calculateShippingCost(selectedShipping, distance)).toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {!selectedBeverage && (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">Select a beverage above to calculate delivery time</p>
          </div>
        )}
      </div>
    </div>
  );
}
