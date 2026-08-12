import { useState } from 'react'

interface InventoryItem {
  id: string
  productName: string
  category: string
  beginningInventory: number
  endingInventory: number
  costOfGoodsSold: number
  turnoverRate: number
}

const mockInventoryData: InventoryItem[] = [
  {
    id: '1',
    productName: 'Pale Ale 6-Pack',
    category: 'Beer',
    beginningInventory: 15000,
    endingInventory: 12000,
    costOfGoodsSold: 54000,
    turnoverRate: 4.0
  },
  {
    id: '2',
    productName: 'IPA 12-Pack',
    category: 'Beer',
    beginningInventory: 20000,
    endingInventory: 18000,
    costOfGoodsSold: 95000,
    turnoverRate: 5.0
  },
  {
    id: '3',
    productName: 'Craft Lager Case',
    category: 'Beer',
    beginningInventory: 12000,
    endingInventory: 8000,
    costOfGoodsSold: 40000,
    turnoverRate: 4.0
  },
  {
    id: '4',
    productName: 'Stout 4-Pack',
    category: 'Beer',
    beginningInventory: 8000,
    endingInventory: 7000,
    costOfGoodsSold: 30000,
    turnoverRate: 4.0
  },
  {
    id: '5',
    productName: 'Porter 6-Pack',
    category: 'Beer',
    beginningInventory: 10000,
    endingInventory: 9000,
    costOfGoodsSold: 38000,
    turnoverRate: 4.0
  },
  {
    id: '6',
    productName: 'Wheat Beer 12-Pack',
    category: 'Beer',
    beginningInventory: 14000,
    endingInventory: 11000,
    costOfGoodsSold: 50000,
    turnoverRate: 4.0
  }
]

export default function CalculateInventory() {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>(mockInventoryData)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const calculateTurnoverRate = (beginningInventory: number, endingInventory: number, costOfGoodsSold: number): number => {
    const averageInventory = (beginningInventory + endingInventory) / 2
    if (averageInventory === 0) return 0
    return parseFloat((costOfGoodsSold / averageInventory).toFixed(2))
  }

  const recalculateAll = () => {
    const updatedData = inventoryData.map(item => ({
      ...item,
      turnoverRate: calculateTurnoverRate(item.beginningInventory, item.endingInventory, item.costOfGoodsSold)
    }))
    setInventoryData(updatedData)
  }

  const filteredData = selectedCategory === 'All' 
    ? inventoryData 
    : inventoryData.filter(item => item.category === selectedCategory)

  const categories = ['All', ...Array.from(new Set(inventoryData.map(item => item.category)))]

  const totalTurnoverRate = filteredData.length > 0
    ? (filteredData.reduce((sum, item) => sum + item.turnoverRate, 0) / filteredData.length).toFixed(2)
    : '0.00'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Inventory Turnover Calculator</h1>
          <p className="text-gray-600 mb-4">Calculate and monitor inventory turnover rates for optimal stock management</p>
          
          <div className="flex gap-4 items-center mb-6">
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <button
              onClick={recalculateAll}
              className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Recalculate All
            </button>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Average Turnover Rate</p>
                <p className="text-3xl font-bold text-indigo-600">{totalTurnoverRate}x</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Items Tracked</p>
                <p className="text-3xl font-bold text-gray-800">{filteredData.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Beginning Inventory
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ending Inventory
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    COGS
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Turnover Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map(item => {
                  const avgInventory = ((item.beginningInventory + item.endingInventory) / 2).toFixed(0)
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        ${item.beginningInventory.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        ${item.endingInventory.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        ${item.costOfGoodsSold.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm">
                          <div className="font-bold text-indigo-600">{item.turnoverRate}x</div>
                          <div className="text-xs text-gray-500">Avg: ${avgInventory}</div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Understanding Inventory Turnover Rate</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Formula:</strong> Turnover Rate = Cost of Goods Sold (COGS) ÷ Average Inventory
            </p>
            <p>
              <strong>Average Inventory:</strong> (Beginning Inventory + Ending Inventory) ÷ 2
            </p>
            <p className="pt-2">
              A higher turnover rate indicates efficient inventory management and strong sales.
              Industry benchmarks vary, but a rate between 4-6 is generally considered healthy for beverage retail.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
