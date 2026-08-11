import React, { useState } from 'react'

const MOCK_SCHEMA = [
  {
    id: 1,
    tableName: 'restaurants',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'name', type: 'VARCHAR(255)', constraint: 'NOT NULL' },
      { name: 'cuisine', type: 'VARCHAR(100)', constraint: 'NOT NULL' },
      { name: 'address', type: 'TEXT', constraint: 'NOT NULL' },
      { name: 'phone', type: 'VARCHAR(20)', constraint: '' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
    ]
  },
  {
    id: 2,
    tableName: 'menu_categories',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'restaurant_id', type: 'INT', constraint: 'NOT NULL, FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)' },
      { name: 'name', type: 'VARCHAR(100)', constraint: 'NOT NULL' },
      { name: 'description', type: 'TEXT', constraint: '' },
      { name: 'display_order', type: 'INT', constraint: 'DEFAULT 0' }
    ]
  },
  {
    id: 3,
    tableName: 'menu_items',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'category_id', type: 'INT', constraint: 'NOT NULL, FOREIGN KEY (category_id) REFERENCES menu_categories(id)' },
      { name: 'name', type: 'VARCHAR(255)', constraint: 'NOT NULL' },
      { name: 'description', type: 'TEXT', constraint: '' },
      { name: 'price', type: 'DECIMAL(10, 2)', constraint: 'NOT NULL' },
      { name: 'is_available', type: 'BOOLEAN', constraint: 'DEFAULT TRUE' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
    ]
  },
  {
    id: 4,
    tableName: 'menu_item_allergens',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'item_id', type: 'INT', constraint: 'NOT NULL, FOREIGN KEY (item_id) REFERENCES menu_items(id)' },
      { name: 'allergen', type: 'VARCHAR(100)', constraint: 'NOT NULL' }
    ]
  }
]

export default function CreateDatabaseSchema() {
  const [expandedTable, setExpandedTable] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Database Schema</h1>
          <p className="text-lg text-slate-600">Italian Restaurant Menu Page - SCRUM-577</p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">This schema defines the database structure for managing restaurant menus with categories, items, and allergen information.</p>
          </div>
        </div>

        {/* Schema Tables */}
        <div className="space-y-6">
          {MOCK_SCHEMA.map((table) => (
            <div key={table.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
              {/* Table Header */}
              <button
                onClick={() => setExpandedTable(expandedTable === table.id ? null : table.id)}
                className="w-full px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold flex items-center justify-between transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-sm font-bold">T</div>
                  <span className="text-lg">{table.tableName}</span>
                </div>
                <span className="text-xl">{expandedTable === table.id ? '−' : '+'}</span>
              </button>

              {/* Table Columns */}
              {expandedTable === table.id && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Column Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Data Type</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Constraints</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.columns.map((column, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-3">
                            <code className="bg-slate-100 px-3 py-1 rounded text-sm font-mono text-slate-900">
                              {column.name}
                            </code>
                          </td>
                          <td className="px-6 py-3">
                            <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded text-sm font-mono">
                              {column.type}
                            </span>
                          </td>
                          <td className="px-6 py-3">
                            <span className="text-slate-700 text-sm">
                              {column.constraint ? (
                                <span className="bg-amber-50 text-amber-900 px-3 py-1 rounded inline-block">
                                  {column.constraint}
                                </span>
                              ) : (
                                <span className="text-slate-400">—</span>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Relationships Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Entity Relationships</h2>
          <div className="space-y-3 text-slate-700">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p><span className="font-semibold">restaurants</span> → <span className="font-semibold">menu_categories</span>: One restaurant has many categories (1:N)</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p><span className="font-semibold">menu_categories</span> → <span className="font-semibold">menu_items</span>: One category has many items (1:N)</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p><span className="font-semibold">menu_items</span> → <span className="font-semibold">menu_item_allergens</span>: One item has many allergens (1:N)</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-600 text-sm">
          <p>Database Schema for Italian Restaurant Menu Management System</p>
          <p className="mt-2 text-slate-500">Click on table headers to expand/collapse column details</p>
        </div>
      </div>
    </div>
  )
}