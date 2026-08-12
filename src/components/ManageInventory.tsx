import { useState } from 'react'

interface InventoryItem {
  id: number
  name: string
  category: string
  sku: string
  quantity: number
  reorderLevel: number
  price: number
  supplier: string
  lastUpdated: string
}

interface User {
  id: number
  name: string
  role: 'supplier' | 'customer' | 'admin'
}

const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 1,
    name: 'IPA Craft Beer - 6 Pack',
    category: 'Beer',
    sku: 'BEV-IPA-001',
    quantity: 150,
    reorderLevel: 50,
    price: 14.99,
    supplier: 'Mountain Brew Co.',
    lastUpdated: '2026-08-10',
  },
  {
    id: 2,
    name: 'Organic Red Wine - 750ml',
    category: 'Wine',
    sku: 'BEV-WINE-002',
    quantity: 35,
    reorderLevel: 40,
    price: 24.99,
    supplier: 'Valley Vineyards',
    lastUpdated: '2026-08-09',
  },
  {
    id: 3,
    name: 'Whiskey Barrel Aged Stout',
    category: 'Beer',
    sku: 'BEV-STOUT-003',
    quantity: 80,
    reorderLevel: 30,
    price: 18.99,
    supplier: 'Mountain Brew Co.',
    lastUpdated: '2026-08-11',
  },
  {
    id: 4,
    name: 'Sparkling Rosé - 750ml',
    category: 'Wine',
    sku: 'BEV-ROSE-004',
    quantity: 20,
    reorderLevel: 25,
    price: 22.99,
    supplier: 'Valley Vineyards',
    lastUpdated: '2026-08-08',
  },
  {
    id: 5,
    name: 'Citrus Pale Ale - 4 Pack',
    category: 'Beer',
    sku: 'BEV-PALE-005',
    quantity: 120,
    reorderLevel: 60,
    price: 11.99,
    supplier: 'Coastal Brewing',
    lastUpdated: '2026-08-12',
  },
  {
    id: 6,
    name: 'Premium Vodka - 1L',
    category: 'Spirits',
    sku: 'BEV-VODKA-006',
    quantity: 45,
    reorderLevel: 20,
    price: 32.99,
    supplier: 'Elite Spirits Ltd.',
    lastUpdated: '2026-08-07',
  },
  {
    id: 7,
    name: 'Chardonnay - 750ml',
    category: 'Wine',
    sku: 'BEV-CHARD-007',
    quantity: 65,
    reorderLevel: 30,
    price: 19.99,
    supplier: 'Valley Vineyards',
    lastUpdated: '2026-08-11',
  },
]

const MOCK_CURRENT_USER: User = {
  id: 1,
  name: 'John Supplier',
  role: 'supplier',
}

export default function ManageInventory() {
  const [currentUser] = useState<User>(MOCK_CURRENT_USER)
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<InventoryItem>>({})
  const [userRole, setUserRole] = useState<'supplier' | 'customer' | 'admin'>(
    currentUser.role
  )

  const hasSupplierAccess = userRole === 'supplier' || userRole === 'admin'

  const handleEdit = (item: InventoryItem) => {
    if (!hasSupplierAccess) return
    setEditingId(item.id)
    setEditForm(item)
  }

  const handleSave = () => {
    if (!hasSupplierAccess || editingId === null) return
    setInventory((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? { ...item, ...editForm, lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      )
    )
    setEditingId(null)
    setEditForm({})
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleInputChange = (field: keyof InventoryItem, value: string | number) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  const isLowStock = (item: InventoryItem) => item.quantity <= item.reorderLevel

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
              <p className="text-gray-600 mt-1">
                Manage your craft beverage inventory
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Current User</div>
              <div className="font-semibold text-gray-900">{currentUser.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600">Role:</span>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as User['role'])}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="supplier">Supplier</option>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Access Control Message */}
        {!hasSupplierAccess && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold text-red-900">Access Denied</span>
            </div>
            <p className="text-red-700 mt-1">
              Only users with supplier role can manage inventory. You are currently logged
              in as: <span className="font-semibold">{userRole}</span>
            </p>
          </div>
        )}

        {/* Inventory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">Total Items</div>
            <div className="text-2xl font-bold text-gray-900">{inventory.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">Total Stock</div>
            <div className="text-2xl font-bold text-gray-900">
              {inventory.reduce((sum, item) => sum + item.quantity, 0)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">Low Stock Items</div>
            <div className="text-2xl font-bold text-red-600">
              {inventory.filter(isLowStock).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">Total Value</div>
            <div className="text-2xl font-bold text-gray-900">
              ${inventory.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Reorder
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Updated
                  </th>
                  {hasSupplierAccess && (
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {inventory.map((item) => (
                  <tr
                    key={item.id}
                    className={`${isLowStock(item) ? 'bg-red-50' : 'hover:bg-gray-50'}`}
                  >
                    {editingId === item.id ? (
                      <>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editForm.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editForm.sku || ''}
                            onChange={(e) => handleInputChange('sku', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editForm.category || ''}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={editForm.quantity || 0}
                            onChange={(e) =>
                              handleInputChange('quantity', parseInt(e.target.value) || 0)
                            }
                            className="border border-gray-300 rounded px-2 py-1 w-full text-sm text-right"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={editForm.reorderLevel || 0}
                            onChange={(e) =>
                              handleInputChange('reorderLevel', parseInt(e.target.value) || 0)
                            }
                            className="border border-gray-300 rounded px-2 py-1 w-full text-sm text-right"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            step="0.01"
                            value={editForm.price || 0}
                            onChange={(e) =>
                              handleInputChange('price', parseFloat(e.target.value) || 0)
                            }
                            className="border border-gray-300 rounded px-2 py-1 w-full text-sm text-right"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editForm.supplier || ''}
                            onChange={(e) => handleInputChange('supplier', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {item.lastUpdated}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={handleSave}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600">{item.sku}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div
                            className={`text-sm font-semibold ${
                              isLowStock(item) ? 'text-red-600' : 'text-gray-900'
                            }`}
                          >
                            {item.quantity}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="text-sm text-gray-600">{item.reorderLevel}</div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600">{item.supplier}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600">{item.lastUpdated}</div>
                        </td>
                        {hasSupplierAccess && (
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleEdit(item)}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                            >
                              Edit
                            </button>
                          </td>
                        )}
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-50 border border-red-200 rounded"></div>
            <span className="text-gray-600">Low Stock (at or below reorder level)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
