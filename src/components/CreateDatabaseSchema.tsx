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
      { name: 'is_available', type: 'BOOLEAN', constraint: 'DEFAULT TRUE' },
      { name: 'image_url', type: 'VARCHAR(500)', constraint: 'NULL' },
      { name: 'allergens', type: 'JSON', constraint: 'NULL' }
    ]
  },
  {
    id: 4,
    tableName: 'menu_reviews',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'item_id', type: 'INT', constraint: 'FOREIGN KEY' },
      { name: 'user_id', type: 'INT', constraint: 'FOREIGN KEY' },
      { name: 'rating', type: 'INT', constraint: 'CHECK (rating >= 1 AND rating <= 5)' },
      { name: 'comment', type: 'TEXT', constraint: 'NULL' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
    ]
  }
]

export default function CreateDatabaseSchema() {
  const [expandedTable, setExpandedTable] = useState<number | null>(0)
  const [copiedCode, setCopiedCode] = useState(false)

  const generateSQL = () => {
    return MOCK_SCHEMA.map(table => {
      const columnDefs = table.columns
        .map(col => `  ${col.name} ${col.type} ${col.constraint}`)
        .join(',\n')
      return `CREATE TABLE ${table.tableName} (\n${columnDefs}\n);`
    }).join('\n\n')
  }

  const handleCopySQL = () => {
    navigator.clipboard.writeText(generateSQL())
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Restaurant Menu Database Schema</h1>
          <p className="text-slate-400 text-lg">Italian Restaurant Menu Management System</p>
          <p className="text-slate-500 text-sm mt-2">SCRUM-577: Database Schema Design</p>
        </div>

        {/* SQL Export Section */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Generated SQL</h2>
            <button
              onClick={handleCopySQL}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              {copiedCode ? '✓ Copied!' : 'Copy SQL'}
            </button>
          </div>
          <pre className="bg-slate-900 p-4 rounded border border-slate-700 overflow-x-auto text-slate-300 text-xs leading-relaxed">
            <code>{generateSQL()}</code>
          </pre>
        </div>

        {/* Schema Tables */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Database Tables</h2>
          {MOCK_SCHEMA.map((table) => (
            <div key={table.id} className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
              <button
                onClick={() => setExpandedTable(expandedTable === table.id ? null : table.id)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-slate-700 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-blue-400">📊</span>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">{table.tableName}</h3>
                    <p className="text-slate-400 text-sm">{table.columns.length} columns</p>
                  </div>
                </div>
                <span className={`text-2xl text-slate-400 transition-transform duration-200 ${expandedTable === table.id ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {expandedTable === table.id && (
                <div className="border-t border-slate-700 bg-slate-900 p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 text-slate-300 font-semibold">Column Name</th>
                          <th className="text-left py-3 px-4 text-slate-300 font-semibold">Data Type</th>
                          <th className="text-left py-3 px-4 text-slate-300 font-semibold">Constraint</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.columns.map((column, idx) => (
                          <tr key={idx} className="border-b border-slate-700 hover:bg-slate-800 transition-colors">
                            <td className="py-3 px-4 text-slate-200 font-mono">{column.name}</td>
                            <td className="py-3 px-4 text-blue-400 font-mono">{column.type}</td>
                            <td className="py-3 px-4 text-slate-400 text-xs">
                              <span className="bg-slate-700 px-2 py-1 rounded">{column.constraint}</span>
                            </td>
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

        {/* Schema Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">📋 Tables</h3>
            <p className="text-slate-400">{MOCK_SCHEMA.length} main tables</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">🔗 Relationships</h3>
            <p className="text-slate-400">Foreign key constraints</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">🍝 Purpose</h3>
            <p className="text-slate-400">Italian menu management</p>
          </div>
        </div>
      </div>
    </div>
  )
}