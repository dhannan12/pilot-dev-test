import React, { useState } from 'react'

const MOCK_SCHEMA = [
  {
    id: 1,
    tableName: 'restaurants',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'name', type: 'VARCHAR(255)', constraint: 'NOT NULL' },
      { name: 'cuisine_type', type: 'VARCHAR(100)', constraint: 'NOT NULL' },
      { name: 'location', type: 'VARCHAR(255)', constraint: 'NOT NULL' },
      { name: 'rating', type: 'DECIMAL(3,2)', constraint: '' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
    ]
  },
  {
    id: 2,
    tableName: 'menu_categories',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'restaurant_id', type: 'INT', constraint: 'FOREIGN KEY' },
      { name: 'category_name', type: 'VARCHAR(100)', constraint: 'NOT NULL' },
      { name: 'description', type: 'TEXT', constraint: '' },
      { name: 'display_order', type: 'INT', constraint: '' }
    ]
  },
  {
    id: 3,
    tableName: 'menu_items',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'category_id', type: 'INT', constraint: 'FOREIGN KEY' },
      { name: 'item_name', type: 'VARCHAR(255)', constraint: 'NOT NULL' },
      { name: 'description', type: 'TEXT', constraint: '' },
      { name: 'price', type: 'DECIMAL(10,2)', constraint: 'NOT NULL' },
      { name: 'is_vegetarian', type: 'BOOLEAN', constraint: 'DEFAULT FALSE' },
      { name: 'is_available', type: 'BOOLEAN', constraint: 'DEFAULT TRUE' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
    ]
  },
  {
    id: 4,
    tableName: 'menu_item_allergens',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'item_id', type: 'INT', constraint: 'FOREIGN KEY' },
      { name: 'allergen_name', type: 'VARCHAR(100)', constraint: 'NOT NULL' }
    ]
  }
]

interface SchemaTable {
  id: number
  tableName: string
  columns: Array<{
    name: string
    type: string
    constraint: string
  }>
}

export default function CreateDatabaseSchema() {
  const [selectedTable, setSelectedTable] = useState<number>(1)
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set([1]))

  const currentTable = MOCK_SCHEMA.find(t => t.id === selectedTable) as SchemaTable

  const toggleRowExpansion = (tableId: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(tableId)) {
      newExpanded.delete(tableId)
    } else {
      newExpanded.add(tableId)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Restaurant Menu Database Schema</h1>
          <p className="text-amber-700 text-lg">Italian Restaurant Management System - SCRUM-577</p>
        </div>

        {/* Schema Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">Database Tables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_SCHEMA.map(table => (
              <button
                key={table.id}
                onClick={() => setSelectedTable(table.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTable === table.id
                    ? 'bg-amber-500 border-amber-700 text-white shadow-md'
                    : 'bg-amber-50 border-amber-200 text-amber-900 hover:border-amber-400'
                }`}
              >
                <div className="font-semibold text-sm">{table.tableName}</div>
                <div className="text-xs mt-1 opacity-75">{table.columns.length} columns</div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Table Details */}
        {currentTable && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-semibold text-amber-900 mb-4">{currentTable.tableName}</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-amber-100 border-b-2 border-amber-300">
                    <th className="px-4 py-3 text-left text-amber-900 font-semibold">Column Name</th>
                    <th className="px-4 py-3 text-left text-amber-900 font-semibold">Data Type</th>
                    <th className="px-4 py-3 text-left text-amber-900 font-semibold">Constraints</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTable.columns.map((column, idx) => (
                    <tr key={idx} className="border-b border-amber-100 hover:bg-amber-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-sm text-amber-900">{column.name}</td>
                      <td className="px-4 py-3 font-mono text-sm text-orange-700 font-semibold">{column.type}</td>
                      <td className="px-4 py-3 text-sm text-amber-800">
                        {column.constraint ? (
                          <span className="bg-amber-100 px-2 py-1 rounded text-xs font-medium">
                            {column.constraint}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* All Tables Expandable View */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-amber-900 mb-4">Complete Schema Overview</h3>
          <div className="space-y-3">
            {MOCK_SCHEMA.map(table => (
              <div key={table.id} className="border border-amber-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleRowExpansion(table.id)}
                  className="w-full px-4 py-3 bg-amber-50 hover:bg-amber-100 transition-colors flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-amber-900">{table.tableName}</span>
                  <span className={`text-amber-700 transition-transform ${
                    expandedRows.has(table.id) ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </button>
                {expandedRows.has(table.id) && (
                  <div className="px-4 py-3 bg-white border-t border-amber-200">
                    <div className="space-y-2">
                      {table.columns.map((col, idx) => (
                        <div key={idx} className="flex items-start justify-between text-sm">
                          <div className="font-mono text-amber-900 font-medium">{col.name}</div>
                          <div className="flex gap-2">
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-mono">
                              {col.type}
                            </span>
                            {col.constraint && (
                              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">
                                {col.constraint}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-4 bg-amber-100 border-l-4 border-amber-500 rounded text-amber-900">
          <p className="text-sm font-semibold">Schema Status: Ready for Implementation</p>
          <p className="text-xs mt-1 opacity-75">Total Tables: {MOCK_SCHEMA.length} | Total Columns: {MOCK_SCHEMA.reduce((sum, t) => sum + t.columns.length, 0)}</p>
        </div>
      </div>
    </div>
  )
}