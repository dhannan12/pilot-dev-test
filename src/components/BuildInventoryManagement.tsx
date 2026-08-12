import { useState } from 'react'

interface InventoryItem {
  id: string
  name: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  supplier: string
  lastUpdated: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'INV-001',
    name: 'Pale Ale Malt',
    category: 'Grains',
    currentStock: 450,
    minStock: 100,
    maxStock: 1000,
    unit: 'lbs',
    supplier: 'Briess Malt & Ingredients',
    lastUpdated: '2026-08-10',
    status: 'In Stock'
  },
  {
    id: 'INV-002',
    name: 'Cascade Hops',
    category: 'Hops',
    currentStock: 15,
    minStock: 20,
    maxStock: 100,
    unit: 'lbs',
    supplier: 'Yakima Chief Hops',
    lastUpdated: '2026-08-11',
    status: 'Low Stock'
  },
  {
    id: 'INV-003',
    name: 'US-05 Yeast',
    category: 'Yeast',
    currentStock: 0,
    minStock: 10,
    maxStock: 50,
    unit: 'packets',
    supplier: 'Fermentis',
    lastUpdated: '2026-08-09',
    status: 'Out of Stock'
  },
  {
    id: 'INV-004',
    name: 'Wheat Malt',
    category: 'Grains',
    currentStock: 320,
    minStock: 80,
    maxStock: 800,
    unit: 'lbs',
    supplier: 'Briess Malt & Ingredients',
    lastUpdated: '2026-08-12',
    status: 'In Stock'
  },
  {
    id: 'INV-005',
    name: 'Citra Hops',
    category: 'Hops',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unit: 'lbs',
    supplier: 'Yakima Chief Hops',
    lastUpdated: '2026-08-11',
    status: 'In Stock'
  },
  {
    id: 'INV-006',
    name: 'Belgian Wit Yeast',
    category: 'Yeast',
    currentStock: 25,
    minStock: 10,
    maxStock: 50,
    unit: 'packets',
    supplier: 'White Labs',
    lastUpdated: '2026-08-10',
    status: 'In Stock'
  },
  {
    id: 'INV-007',
    name: 'Munich Malt',
    category: 'Grains',
    currentStock: 180,
    minStock: 100,
    maxStock: 600,
    unit: 'lbs',
    supplier: 'Weyermann',
    lastUpdated: '2026-08-08',
    status: 'In Stock'
  },
  {
    id: 'INV-008',
    name: 'Amarillo Hops',
    category: 'Hops',
    currentStock: 8,
    minStock: 20,
    maxStock: 100,
    unit: 'lbs',
    supplier: 'Yakima Chief Hops',
    lastUpdated: '2026-08-12',
    status: 'Low Stock'
  }
]

export default function BuildInventoryManagement() {
  const [inventory] = useState<InventoryItem[]>(MOCK_INVENTORY)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<'name' | 'stock' | 'status'>('name')

  const categories = ['All', ...Array.from(new Set(inventory.map(item => item.category)))]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStockPercentage = (item: InventoryItem) => {
    return Math.min(100, (item.currentStock / item.maxStock) * 100)
  }

  const filteredInventory = inventory
    .filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'stock':
          return b.currentStock - a.currentStock
        case 'status':
          const statusOrder = { 'Out of Stock': 0, 'Low Stock': 1, 'In Stock': 2 }
          return statusOrder[a.status] - statusOrder[b.status]
        default:
          return 0
      }
    })

  const totalItems = inventory.length
  const lowStockItems = inventory.filter(item => item.status === 'Low Stock').length
  const outOfStockItems = inventory.filter(item => item.status === 'Out of Stock').length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your brewing ingredients and supplies</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalItems}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{lowStockItems}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{outOfStockItems}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'stock' | 'status')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name">Name</option>
                <option value="stock">Stock Level</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{item.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-900">
                            {item.currentStock} / {item.maxStock} {item.unit}
                          </span>
                          <span className="text-xs text-gray-500">
                            {Math.round(getStockPercentage(item))}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              item.status === 'Out of Stock' ? 'bg-red-500' :
                              item.status === 'Low Stock' ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${getStockPercentage(item)}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500">
                          Min: {item.minStock} {item.unit}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{item.supplier}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Edit
                        </button>
                        <button className="text-green-600 hover:text-green-800 font-medium">
                          Restock
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInventory.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No items found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredInventory.length} of {totalItems} items
        </div>
      </div>
    </div>
  )
}
