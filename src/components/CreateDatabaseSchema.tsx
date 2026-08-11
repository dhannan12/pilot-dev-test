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
      { name: 'rating', type: 'DECIMAL(3,2)', constraint: 'DEFAULT 0' },
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
      { name: 'description', type: 'TEXT', constraint: 'NULL' },
      { name: 'display_order', type: 'INT', constraint: 'DEFAULT 0' }
    ]
  },
  {
    id: 3,
    tableName: 'menu_items',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'category_id', type: 'INT', constraint: 'FOREIGN KEY' },
      { name: 'item_name', type: 'VARCHAR(255)', constraint: 'NOT NULL' },
      { name: 'description', type: 'TEXT', constraint: 'NULL' },
      { name: 'price', type: 'DECIMAL(10,2)', constraint: 'NOT NULL' },
      { name: 'is_vegetarian', type: 'BOOLEAN', constraint: 'DEFAULT FALSE' },
      { name: 'is_available', type: 'BOOLEAN', constraint: 'DEFAULT TRUE' },
      { name: 'image_url', type: 'VARCHAR(500)', constraint: 'NULL' }
    ]
  },
  {
    id: 4,
    tableName: 'menu_allergens',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'item_id', type: 'INT', constraint: 'FOREIGN KEY' },
      { name: 'allergen_name', type: 'VARCHAR(100)', constraint: 'NOT NULL' },
      { name: 'severity', type: 'ENUM("low","medium","high")', constraint: 'NOT NULL' }
    ]
  }
]

export default function CreateDatabaseSchema() {
  const [expandedTable, setExpandedTable] = useState<number | null>(0)
  const [copiedCode, setCopiedCode] = useState(false)

  const generateSQL = () => {
    let sql = ''
    MOCK_SCHEMA.forEach(table => {
      sql += `CREATE TABLE ${table.tableName} (\n`
      sql += table.columns.map(col => `  ${col.name} ${col.type} ${col.constraint}`).join(',\n')
      sql += '\n);\n\n'
    })
    return sql
  }

  const handleCopySQL = () => {
    navigator.clipboard.writeText(generateSQL())
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Restaurant Menu Database Schema</h1>
          <p className="text-lg text-gray-600">Italian Restaurant Menu Management System</p>
          <p className="text-sm text-gray-500 mt-2">SCRUM-577: Database Schema Design</p>
        </div>

        {/* SQL Export Button */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">SQL Schema Export</h2>
            <button
              onClick={handleCopySQL}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                copiedCode
                  ? 'bg-green-500 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {copiedCode ? '✓ Copied!' : 'Copy SQL'}
            </button>
          </div>
          <pre className="mt-4 bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm font-mono max-h-64 overflow-y-auto">
            {generateSQL()}
          </pre>
        </div>

        {/* Schema Tables */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Database Tables</h2>
          {MOCK_SCHEMA.map(table => (
            <div key={table.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setExpandedTable(expandedTable === table.id ? null : table.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{expandedTable === table.id ? '▼' : '▶'}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{table.tableName}</h3>
                  <span className="text-sm text-gray-500">({table.columns.length} columns)</span>
                </div>
              </button>

              {expandedTable === table.id && (
                <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-300 bg-gray-100">
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Column Name</th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Data Type</th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Constraint</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.columns.map((col, idx) => (
                          <tr key={idx} className="border-b border-gray-200 hover:bg-white transition-colors">
                            <td className="py-3 px-3 font-mono text-gray-900">{col.name}</td>
                            <td className="py-3 px-3 font-mono text-blue-600">{col.type}</td>
                            <td className="py-3 px-3 font-mono text-purple-600">{col.constraint}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Schema Relationships */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Table Relationships</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-orange-500 font-bold mt-1">→</span>
              <p><span className="font-semibold">restaurants</span> (1) ← → (Many) <span className="font-semibold">menu_categories</span></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500 font-bold mt-1">→</span>
              <p><span className="font-semibold">menu_categories</span> (1) ← → (Many) <span className="font-semibold">menu_items</span></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500 font-bold mt-1">→</span>
              <p><span className="font-semibold">menu_items</span> (1) ← → (Many) <span className="font-semibold">menu_allergens</span></p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">✓ Features</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Multi-restaurant support</li>
              <li>• Organized menu categories</li>
              <li>• Detailed menu items with pricing</li>
              <li>• Allergen tracking</li>
              <li>• Availability management</li>
              <li>• Vegetarian indicators</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📋 Specifications</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• 4 main tables</li>
              <li>• Foreign key relationships</li>
              <li>• Timestamp tracking</li>
              <li>• Decimal precision for pricing</li>
              <li>• Boolean flags for attributes</li>
              <li>• Enum for allergen severity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}