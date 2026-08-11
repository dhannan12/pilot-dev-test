import React, { useState } from 'react'

const MOCK_DATA = [
  { id: 1, name: 'Item One',   value: 'Value A', status: 'active' },
  { id: 2, name: 'Item Two',   value: 'Value B', status: 'inactive' },
  { id: 3, name: 'Item Three', value: 'Value C', status: 'active' },
]

export default function RestaurantUpdate() {
  const [selected, setSelected] = useState<number|null>(null)
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">RestaurantUpdate</h2>
      <p className="text-gray-500 text-sm mb-6">As a Restaurant Manager, update menu items</p>
      <div className="space-y-3">
        {MOCK_DATA.map(item => (
          <div key={item.id}
            onClick={() => setSelected(item.id)}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selected === item.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">{item.name}</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                item.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {item.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
